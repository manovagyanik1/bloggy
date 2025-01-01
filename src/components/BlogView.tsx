import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Typography from '@tiptap/extension-typography';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import { BlogPost } from '../lib/types/blog';
import { Project } from '../lib/types/project';
import { Spin, Alert } from 'antd';
import { formatDate } from '../lib/util/date';
import { Level } from '@tiptap/extension-heading'

interface BlogViewProps {
  blog: BlogPost;
  project: Project;
  isLoading?: boolean;
  error?: string | null;
}

export function BlogView({ blog, project, isLoading = false, error = null }: BlogViewProps) {
  project.theme = {
    name: 'clipy',
    colors: {
      primary: '#3b82f6',    // blue-500
      secondary: '#60a5fa',   // blue-400
      background: '#111827',  // gray-900
      text: '#ffffff',
    },
    fonts: {
      heading: 'font-sans text-5xl font-bold text-white mb-8 leading-tight tracking-tight',
      subheading: 'font-sans text-3xl font-semibold text-white mb-6 leading-relaxed',
      body: 'font-sans text-lg text-gray-300 leading-relaxed tracking-wide',
      caption: 'font-sans text-sm text-gray-400 tracking-wider uppercase',
      elements: {
        h1: 'font-sans text-4xl font-bold text-white mb-8 leading-tight tracking-tight',
        h2: 'font-sans text-3xl font-bold text-white mb-6 leading-snug',
        h3: 'font-sans text-2xl font-semibold text-white mb-5 leading-snug',
        h4: 'font-sans text-xl font-semibold text-white mb-4',
        h5: 'font-sans text-lg font-medium text-white mb-3',
        h6: 'font-sans text-base font-medium text-white mb-3',
        p: 'font-sans text-lg text-gray-300 mb-6 leading-relaxed tracking-wide',
        ul: 'list-disc list-inside space-y-3 mb-8 text-gray-300 ml-4',
        ol: 'list-decimal list-inside space-y-3 mb-8 text-gray-300 ml-4',
        li: 'text-gray-300 ml-2 leading-relaxed',
        blockquote: 'border-l-4 border-blue-500 pl-6 py-2 italic text-gray-400 mb-8 text-xl',
        table: 'w-full border-collapse mb-8 bg-gray-800/50 rounded-lg overflow-hidden',
        th: 'border border-gray-700 px-6 py-3 bg-gray-800 text-white font-semibold text-left',
        td: 'border border-gray-700 px-6 py-4 text-gray-300',
        pre: 'bg-gray-800 rounded-lg p-6 mb-6 overflow-x-auto text-sm',
        code: 'font-mono text-sm bg-gray-800/70 rounded px-2 py-1 text-gray-300',
        a: 'text-blue-400 hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors duration-200',
        img: 'max-w-full h-auto rounded-xl mb-8 shadow-lg',
        hr: 'border-gray-700 my-12'
      }
    },
    layout: {
      container: 'max-w-4xl mx-auto px-6 sm:px-8 py-12 bg-gray-900 min-h-screen',
      sectionSpacing: 'py-12 space-y-8',
      imageSpacing: 'my-8 space-y-4'
    }
  };
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        paragraph: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
      }),
      Heading.extend({
        levels: [1, 2, 3, 4, 5, 6],
        renderHTML({ node, HTMLAttributes }) {
          const level = node.attrs.level as Level
          const classes = {
            1: project.theme.fonts.elements.h1,
            2: project.theme.fonts.elements.h2,
            3: project.theme.fonts.elements.h3,
            4: project.theme.fonts.elements.h4,
            5: project.theme.fonts.elements.h5,
            6: project.theme.fonts.elements.h6,
          }
          return [`h${level}`, { ...HTMLAttributes, class: classes[level] }, 0]
        }
      }),      
      Paragraph.configure({
        HTMLAttributes: {
          class: project.theme.fonts.elements.p
        }
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: project.theme.fonts.elements.ul
        }
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: project.theme.fonts.elements.ol
        }
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: project.theme.fonts.elements.li
        }
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: project.theme.fonts.elements.blockquote
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: project.theme.fonts.elements.img
        }
      }),
      Typography,
    ],
    content: blog.content,
    editable: false,
    editorProps: {
      attributes: {
        class: project.theme.fonts.body,
      },
    }
  });

  if (error) {
    return (
      <div className={project.theme.layout.container}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center ${project.theme.layout.container}`}>
        <Spin size="large" />
      </div>
    );
  }

  const { seo_metadata, created_at, updated_at } = blog;
  const shareUrl = `${project.url}/${blog.slug}`;

  return (
    <article 
      className={project.theme.layout.container}
      style={{ backgroundColor: project.theme.colors.background }}
    >
      <header className={project.theme.layout.sectionSpacing}>
        <h1 
          className={project.theme.fonts.heading}
          style={{ color: project.theme.colors.text }}
        >
          {seo_metadata.seo_title}
        </h1>
        
        <div 
          className={project.theme.fonts.caption}
          style={{ color: project.theme.colors.secondary }}
        >
          {formatDate(created_at)}
        </div>

        {seo_metadata.meta_description && (
          <p 
            className={project.theme.fonts.subheading}
            style={{ color: project.theme.colors.text }}
          >
            {seo_metadata.meta_description}
          </p>
        )}

        {seo_metadata.keywords?.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            {seo_metadata.keywords.map((keyword, index) => (
              <span 
                key={index}
                className="px-3 py-1.5 rounded-full text-sm font-medium inline-block"
                style={{ 
                  color: project.theme.colors.text,
                  backgroundColor: `${project.theme.colors.primary}30`,
                  border: `1px solid ${project.theme.colors.primary}`,
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </header>

      <div 
        className={project.theme.fonts.body}
        style={{ color: project.theme.colors.text }}
      >
        <EditorContent editor={editor} />
      </div>

      <footer 
        className={project.theme.layout.sectionSpacing}
        style={{ borderTopColor: project.theme.colors.secondary }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 
              className={project.theme.fonts.subheading}
              style={{ color: project.theme.colors.text }}
            >
              Share this post
            </h2>
            <div className={`flex gap-4 ${project.theme.layout.imageSpacing}`}>
              <button 
                onClick={() => window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(seo_metadata.seo_title)}&url=${encodeURIComponent(shareUrl)}`,
                  '_blank'
                )}
                className={project.theme.fonts.body}
                style={{ 
                  color: project.theme.colors.secondary,
                  '&:hover': { color: project.theme.colors.primary }
                }}
              >
                Twitter
              </button>
              <button 
                onClick={() => window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                  '_blank'
                )}
                className={project.theme.fonts.body}
                style={{ 
                  color: project.theme.colors.secondary,
                  '&:hover': { color: project.theme.colors.primary }
                }}
              >
                LinkedIn
              </button>
            </div>
          </div>
          
          <div 
            className={project.theme.fonts.caption}
            style={{ color: project.theme.colors.secondary }}
          >
            Last updated: {formatDate(updated_at)}
          </div>
        </div>
      </footer>
    </article>
  );
} 