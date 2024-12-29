import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ImageDialog } from './ImageDialog';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { getTheme } from '../lib/themes';

interface BlogContentProps {
  content: string;
  onGenerateMore: () => void;
  isLoading: boolean;
  onContentChange?: (html: string) => void;
}

export function BlogContent({ content, onGenerateMore, isLoading, onContentChange }: BlogContentProps) {
  const [imageDialog, setImageDialog] = useState<{
    isOpen: boolean;
    description: string;
    element: HTMLImageElement | null;
  }>({
    isOpen: false,
    description: '',
    element: null
  });

  const theme = getTheme(); // Get current theme

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: ({ level }) => {
              switch (level) {
                case 1:
                  return theme.fonts.heading;
                case 2:
                case 3:
                  return theme.fonts.subheading;
                default:
                  return '';
              }
            }
          }
        },
        paragraph: {
          HTMLAttributes: {
            class: theme.fonts.body
          }
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: theme.layout.imageSpacing
        }
      }),
      Typography,
      Placeholder.configure({
        placeholder: 'Start editing the generated content...'
      })
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none'
      }
    },
    onUpdate: ({ editor }) => {
      onContentChange?.(editor.getHTML());
    }
  });

  const handleImageClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const img = target.closest('img');
    if (img?.getAttribute('bloggy-description')) {
      setImageDialog({
        isOpen: true,
        description: img.getAttribute('bloggy-description') || '',
        element: img
      });
    }
  };

  const handleImageUpload = (file: File) => {
    if (imageDialog.element) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && editor) {
          editor.chain().focus()
            .setImage({ 
              src: e.target.result as string,
              alt: imageDialog.description 
            })
            .run();
        }
      };
      reader.readAsDataURL(file);
    }
    setImageDialog(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="mt-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Blog Content</h2>
          <div onClick={handleImageClick}>
            <EditorContent editor={editor} />
          </div>
          <div className="mt-6">
            <button
              onClick={onGenerateMore}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Settings className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Generating...
                </>
              ) : (
                'Generate More Content'
              )}
            </button>
          </div>
        </div>
      </div>

      <ImageDialog
        isOpen={imageDialog.isOpen}
        onClose={() => setImageDialog(prev => ({ ...prev, isOpen: false }))}
        description={imageDialog.description}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}