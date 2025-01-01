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
import { Spin, Alert, message } from 'antd';
import { formatDate } from '../lib/util/date';
import { Level } from '@tiptap/extension-heading'
import { 
  TwitterOutlined, 
  LinkedinOutlined, 
  FacebookOutlined, 
  WhatsAppOutlined,
  CopyOutlined
} from '@ant-design/icons';

interface BlogViewProps {
  blog: BlogPost;
  project: Project;
  isLoading?: boolean;
  error?: string | null;
}

export function BlogView({ blog, project, isLoading = false, error = null }: BlogViewProps) {
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
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
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
              <div className="flex items-center gap-6 mt-4">
                <button 
                  onClick={() => window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(seo_metadata.seo_title)}&url=${encodeURIComponent(shareUrl)}`,
                    '_blank'
                  )}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110"
                  style={{ backgroundColor: project.theme.colors.primary }}
                >
                  <TwitterOutlined className="text-xl" style={{ color: '#fff' }} />
                </button>
                <button 
                  onClick={() => window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                    '_blank'
                  )}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110"
                  style={{ backgroundColor: project.theme.colors.primary }}
                >
                  <LinkedinOutlined className="text-xl" style={{ color: '#fff' }} />
                </button>
                <button 
                  onClick={() => window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    '_blank'
                  )}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110"
                  style={{ backgroundColor: project.theme.colors.primary }}
                >
                  <FacebookOutlined className="text-xl" style={{ color: '#fff' }} />
                </button>
                <button 
                  onClick={() => window.open(
                    `https://wa.me/?text=${encodeURIComponent(`${seo_metadata.seo_title} ${shareUrl}`)}`,
                    '_blank'
                  )}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110"
                  style={{ backgroundColor: project.theme.colors.primary }}
                >
                  <WhatsAppOutlined className="text-xl" style={{ color: '#fff' }} />
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    message.success('Link copied to clipboard!');
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110"
                  style={{ backgroundColor: project.theme.colors.primary }}
                >
                  <CopyOutlined className="text-xl" style={{ color: '#fff' }} />
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
      </div>
    </article>
  );
} 