import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Typography from '@tiptap/extension-typography';
import { BlogPost } from '../lib/types/blog';
import { Spin, Alert, message } from 'antd';
import { formatDate } from '../lib/util/date';
import { CalendarOutlined, UserOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Project } from '../lib/types/project';

interface BlogViewProps {
  blog: BlogPost;
  project: Project;
  isLoading?: boolean;
  error?: string | null;
}

export function BlogView({ blog, project, isLoading = false, error = null }: BlogViewProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Typography,
    ],
    content: blog.content,
    editable: false,
  });

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  const { seo_metadata, content, created_at, updated_at } = blog;

  const shareUrl = `${project.url}/${blog.slug}`;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {seo_metadata.seo_title}  
        </h1>
        
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <span className="flex items-center gap-1">
            <CalendarOutlined />
            {formatDate(created_at)}
          </span>
        </div>

        {seo_metadata.meta_description && (
          <p className="mt-4 text-xl text-gray-600">
            {seo_metadata.meta_description}
          </p>
        )}

        {seo_metadata.keywords?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {seo_metadata.keywords.map((keyword, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <EditorContent editor={editor} />
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Share this post</h2>
            <div className="mt-2 flex gap-4">
              <button 
                onClick={() => window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(seo_metadata.seo_title)}&url=${encodeURIComponent(shareUrl)}`,
                  '_blank'
                )}
                className="text-gray-600 hover:text-gray-900"
              >
                Twitter
              </button>
              <button 
                onClick={() => window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                  '_blank'
                )}
                className="text-gray-600 hover:text-gray-900"
              >
                LinkedIn
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Last updated: {formatDate(updated_at)}
          </div>
        </div>
      </footer>
    </article>
  );
} 