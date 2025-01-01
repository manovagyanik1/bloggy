import React, { useState, useEffect } from 'react';
import { BlogForm, BlogFormData } from './BlogForm';
import { generateBlogHTML, generateMoreContent, regenerateSection } from '../lib/blog/generator';
import { BlogContent } from './BlogContent';
import { Editor } from '@tiptap/react';
import { SEOMetadata, SEOMetadataForm } from './SEOMetadataForm';
import { finalizeBlog } from '../lib/blog/generator';
import { Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { BlogPost } from '../lib/types/blog';
import { saveBlogPost } from '../lib/services/blog';
import { updateBlogPost } from '../lib/services/blog';

interface CreateBlogPostProps {
  initial_blog?: BlogPost;
  is_editing?: boolean;
  projectId: string;
}

export function CreateBlogPost({ 
  initial_blog, 
  is_editing = false,
  projectId 
}: CreateBlogPostProps) {
  const location = useLocation();
  const editData = location.state?.blogData;
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData | null>(null);
  const [editedContent, setEditedContent] = useState<string | null>(null);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const [seoMetadata, setSeoMetadata] = useState<SEOMetadata | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);

  useEffect(() => {
    if (initial_blog) {
      setGeneratedContent(initial_blog.content);
      setSeoMetadata(initial_blog.seo_metadata);
    }
  }, [initial_blog]);

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      if (editData.content) {
        setGeneratedContent(editData.content);
      }
      if (editData.seoMetadata && Object.keys(editData.seoMetadata).length > 0) {
        setSeoMetadata(editData.seoMetadata);
      }
    }
  }, [editData]);

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

      editorInstance
        .chain()
        .focus()
        .command(({ commands }) => {
          commands.setTextSelection(editorInstance.state.doc.content.size);
          return true;
        })
        .insertContent('<br><br>')
        .insertContent(cleanContent)
        .run();

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

  const handleFinalize = async () => {
    if (!editorInstance) return;
    
    try {
      setIsLoading(true);
      const metadata = await finalizeBlog(editorInstance.getHTML());
      setSeoMetadata(metadata);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate SEO metadata');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeploy = async () => {
    if (!editorInstance || !seoMetadata) return;
    
    try {
      setIsDeploying(true);
      setDeployError(null);
      
      const content = editorInstance.getHTML();
      
      if (editData?.id) {
        await updateBlogPost(editData.id, content, seoMetadata, projectId);
        alert('Blog post updated successfully!');
      } else {
        await saveBlogPost(content, seoMetadata, projectId);
        alert('Blog post deployed successfully!');
      }
    } catch (error) {
      setDeployError(error instanceof Error ? error.message : 'Failed to deploy blog post');
    } finally {
      setIsDeploying(false);
    }
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
                onFinalize={handleFinalize}
              />
              {seoMetadata && (
                <>
                  <SEOMetadataForm
                    metadata={seoMetadata}
                    onChange={setSeoMetadata}
                  />
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleDeploy}
                      disabled={isDeploying}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      {isDeploying ? (
                        <>
                          <Settings className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Deploying...
                        </>
                      ) : (
                        'Deploy Blog Post'
                      )}
                    </button>
                  </div>
                </>
              )}
              {deployError && (
                <div className="mt-4 rounded-md bg-red-900/50 border border-red-700 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-400">Error</h3>
                      <div className="mt-2 text-sm text-red-300">
                        <p>{deployError}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 