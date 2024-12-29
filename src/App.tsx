import React, { useState } from 'react';
import { BlogForm, BlogFormData } from './components/BlogForm';
import { generateBlogHTML, generateMoreContent, regenerateSection } from './lib/blog/generator';
import { BlogContent } from './components/BlogContent';
import { Editor } from '@tiptap/react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData | null>(null);
  const [editedContent, setEditedContent] = useState<string | null>(null);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);

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

  const handleContentChange = (newContent: string) => {
    setEditedContent(newContent);
  };

  const handleGenerateMore = async () => {
    if (!generatedContent || !formData || !editorInstance) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const additionalContent = await generateMoreContent(
        editedContent || generatedContent,
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

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = additionalContent;
      const cleanContent = tempDiv.innerHTML
        .replace(/<div[^>]*>([\s\S]*)<\/div>/i, '$1')
        .trim();

      // Move to the end and insert content
      editorInstance
        .chain()
        .focus()
        // Move to end of document
        .command(({ commands }) => {
          commands.setTextSelection(editorInstance.state.doc.content.size);
          return true;
        })
        // Add two line breaks for spacing
        .insertContent('<br><br>')
        // Insert the new content
        .insertContent(cleanContent)
        .run();

      // Update state to reflect changes
      setEditedContent(editorInstance.getHTML());

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating more content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateSection = async (context: {
    preceding: string;
    selected: string;
    succeeding: string;
    additionalPrompt: string;
  }) => {
    if (!formData) return '';
    
    return regenerateSection({
      ...context,
      apiProvider: formData.apiProvider
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-indigo-400 text-center mb-8">
            AI Blog Generator
          </h1>
          
          <div className="bg-gray-800 shadow-xl shadow-indigo-500/10 sm:rounded-lg border border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <BlogForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
                hasContent={!!generatedContent}
              />
            </div>
          </div>

          {error && (
            <div className="mt-8 rounded-md bg-red-900/50 border border-red-700 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-400">Error</h3>
                  <div className="mt-2 text-sm text-red-300">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {generatedContent && !error && (
            <div className="mt-8">
              <BlogContent 
                content={editedContent || generatedContent}
                onGenerateMore={handleGenerateMore}
                isLoading={isLoading}
                onContentChange={handleContentChange}
                onRegenerateSection={handleRegenerateSection}
                onEditorReady={setEditorInstance}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;