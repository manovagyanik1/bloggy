import React, { useState } from 'react';
import { BlogForm, BlogFormData } from './components/BlogForm';
import { generateBlogHTML, generateMoreContent } from './lib/blog/generator';
import { BlogContent } from './components/BlogContent';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData | null>(null);

  const handleSubmit = async (data: BlogFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      setFormData(data);
      
      const content = await generateBlogHTML({
        title: data.title,
        seoKeywords: data.seoKeywords,
        ignoreSections: data.ignoreSections,
        generateSections: data.generateSections,
        apiProvider: data.apiProvider,
        customPrompt: data.customPrompt,
        themeName: data.themeName,
      });
      
      setGeneratedContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the blog');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMore = async () => {
    if (!generatedContent || !formData) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const additionalContent = await generateMoreContent(
        generatedContent,
        {
          title: formData.title,
          seoKeywords: formData.seoKeywords,
          ignoreSections: formData.ignoreSections,
          generateSections: formData.generateSections,
          apiProvider: formData.apiProvider,
          customPrompt: formData.customPrompt,
          themeName: formData.themeName,
        }
      );
      
      const cleanContent = additionalContent.replace(/<div[^>]*>([\s\S]*)<\/div>/i, '$1').trim();
      
      setGeneratedContent(prev => prev?.replace(/<\/div>\s*$/, cleanContent + '</div>'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating more content');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            AI Blog Generator
          </h1>
          
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <BlogForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
                hasContent={!!generatedContent}
              />
            </div>
          </div>

          {error && (
            <div className="mt-8 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {generatedContent && !error && (
            <BlogContent 
              content={generatedContent}
              onGenerateMore={handleGenerateMore}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;