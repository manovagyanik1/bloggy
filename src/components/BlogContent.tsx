import React, { useState, useCallback, useEffect } from 'react';
import { Settings, RefreshCw } from 'lucide-react';
import { ImageDialog } from './ImageDialog';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
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
  onRegenerateSection?: (context: {
    preceding: string;
    selected: string;
    succeeding: string;
    additionalPrompt: string;
  }) => Promise<string>;
  onEditorReady?: (editor: any) => void;
}

interface RegenerateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRegenerate: (additionalPrompt: string) => void;
  selectedText: string;
  isRegenerating: boolean;
}

function RegenerateDialog({ isOpen, onClose, onRegenerate, selectedText, isRegenerating }: RegenerateDialogProps) {
  const [additionalPrompt, setAdditionalPrompt] = useState('');
  const theme = getTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/75 transition-opacity">
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div 
            className="relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-gray-700"
            style={{ backgroundColor: theme.colors.background }}
          >
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-base font-semibold leading-6" style={{ color: theme.colors.text }}>
                  Regenerate Content
                </h3>
                <div className="mt-2">
                  <p className="text-sm mb-4" style={{ color: theme.colors.secondary }}>
                    Selected text to regenerate:
                  </p>
                  <div className="bg-gray-800 p-3 rounded-md mb-4">
                    <p className="text-sm" style={{ color: theme.colors.text }}>{selectedText}</p>
                  </div>
                  <textarea
                    value={additionalPrompt}
                    onChange={(e) => setAdditionalPrompt(e.target.value)}
                    placeholder="Add any specific instructions for regeneration (optional)"
                    className="w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => {
                  onRegenerate(additionalPrompt);
                  onClose();
                }}
                disabled={isRegenerating}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto disabled:opacity-50"
              >
                {isRegenerating ? (
                  <>
                    <Settings className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Regenerating...
                  </>
                ) : (
                  'Regenerate'
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FloatingButtonProps {
  onRegenerate: () => void;
  position: { x: number; y: number } | null;
}

function FloatingButton({ onRegenerate, position }: FloatingButtonProps) {
  const theme = getTheme();
  
  if (!position) return null;

  return (
    <div
      className="absolute z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateY(-100%)',
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRegenerate();
        }}
        className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ 
          backgroundColor: theme.colors.primary,
          color: theme.colors.background 
        }}
      >
        <RefreshCw className="h-4 w-4 mr-1" />
        Regenerate
      </button>
    </div>
  );
}

export function BlogContent({ content, onGenerateMore, isLoading, onContentChange, onRegenerateSection, onEditorReady }: BlogContentProps) {
  const [imageDialog, setImageDialog] = useState<{
    isOpen: boolean;
    description: string;
    element: HTMLImageElement | null;
  }>({
    isOpen: false,
    description: '',
    element: null
  });
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [regenerateDialog, setRegenerateDialog] = useState<{
    isOpen: boolean;
    selectedText: string;
    range: Range | null;
  }>({
    isOpen: false,
    selectedText: '',
    range: null,
  });

  const [regenerationState, setRegenerationState] = useState<{
    isLoading: boolean;
    error: string | null;
  }>({
    isLoading: false,
    error: null,
  });

  const theme = getTheme();

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
            },
            style: `color: ${theme.colors.text};`
          }
        },
        paragraph: {
          HTMLAttributes: {
            class: theme.fonts.body,
            style: `color: ${theme.colors.text};`
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
        placeholder: 'Start editing the generated content...',
        emptyEditorClass: 'text-gray-400',
      })
    ],
    content,
    editorProps: {
      attributes: {
        class: `prose prose-lg max-w-none focus:outline-none`,
        style: `
          background-color: ${theme.colors.background};
          --tw-prose-body: ${theme.colors.text};
          --tw-prose-headings: ${theme.colors.text};
          color: ${theme.colors.text};
        `
      }
    },
    onUpdate: ({ editor }) => {
      onContentChange?.(editor.getHTML());
    },
    onCreate: ({ editor }) => {
      onEditorReady?.(editor);
    },
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

  const handleSelection = useCallback(() => {
    if (!editor) {
      return;
    }

    const selection = window.getSelection();

    if (!selection || selection.isCollapsed) {
      setButtonPosition(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();

    if (selectedText) {
      const editorElement = editor.view.dom;
      const editorRect = editorElement.getBoundingClientRect();
      const selectionRect = range.getBoundingClientRect();

      const x = selectionRect.right - editorRect.left;
      const y = selectionRect.top - editorRect.top;

      setButtonPosition({
        x: x + 10,
        y: y
      });

      setRegenerateDialog(prev => ({
        ...prev,
        selectedText,
        range
      }));
    }
  }, [editor]);

  const handleRegenerate = useCallback(async (additionalPrompt: string) => {
    if (regenerateDialog.range && editor && onRegenerateSection) {
      try {
        setRegenerationState({ isLoading: true, error: null });
        
        const range = regenerateDialog.range;
        
        // Get the parent nodes for context
        const startNode = range.startContainer.parentNode;
        const endNode = range.endContainer.parentNode;
        
        // Get preceding and succeeding content from the same level
        const context = {
          preceding: startNode?.previousSibling?.textContent || '',
          selected: regenerateDialog.selectedText,
          succeeding: endNode?.nextSibling?.textContent || '',
          additionalPrompt
        };

        const newContent = await onRegenerateSection(context);

        // Store current selection state
        const from = editor.state.selection.from;
        const to = editor.state.selection.to;

        // Replace content at the current selection
        editor
          .chain()
          .focus()
          .deleteRange({ from, to }) // First delete the selected content
          .insertContent(newContent) // Then insert the new content
          .run();

        setRegenerationState({ isLoading: false, error: null });
        setButtonPosition(null);
        setRegenerateDialog(prev => ({ ...prev, isOpen: false }));
      } catch (error) {
        setRegenerationState({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Failed to regenerate content'
        });
      }
    }
  }, [regenerateDialog.range, editor, regenerateDialog.selectedText, onRegenerateSection]);

  useEffect(() => {
    if (regenerationState.error) {
      const timer = setTimeout(() => {
        setRegenerationState(prev => ({ ...prev, error: null }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [regenerationState.error]);

  useEffect(() => {
    const handleMouseUp = () => {
      handleSelection();
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleSelection]);

  return (
    <div className="mt-8">
      <div className="shadow-xl rounded-lg relative border border-gray-700" 
           style={{ backgroundColor: theme.colors.background }}>
        <div className="px-4 py-5 sm:p-6">
          <h2 className={`text-lg font-medium mb-4 ${theme.fonts.heading}`} 
              style={{ color: theme.colors.text }}>
            Generated Blog Content
          </h2>
          <div className="relative">
            <div onClick={handleImageClick} className="relative"
                 style={{ backgroundColor: theme.colors.background }}>
              {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                  <div className="flex gap-1 p-1 rounded-lg shadow-lg border border-gray-700"
                       style={{ backgroundColor: theme.colors.background }}>
                    <button
                      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                      className={`p-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                      style={{ color: theme.colors.text }}
                    >
                      H1
                    </button>
                    <button
                      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`p-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                      style={{ color: theme.colors.text }}
                    >
                      H2
                    </button>
                    <button
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`p-1 rounded ${editor.isActive('bold') ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                      style={{ color: theme.colors.text }}
                    >
                      B
                    </button>
                    <button
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={`p-1 rounded ${editor.isActive('italic') ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                      style={{ color: theme.colors.text }}
                    >
                      I
                    </button>
                    <button
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                      style={{ color: theme.colors.text }}
                    >
                      •
                    </button>
                    <button
                      onClick={() => editor.chain().focus().toggleOrderedList().run()}
                      className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                      style={{ color: theme.colors.text }}
                    >
                      1.
                    </button>
                  </div>
                </BubbleMenu>
              )}
              <EditorContent editor={editor} />
              <FloatingButton
                onRegenerate={() => setRegenerateDialog(prev => ({ ...prev, isOpen: true }))}
                position={buttonPosition}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={onGenerateMore}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
              style={{ 
                backgroundColor: theme.colors.primary,
                color: theme.colors.background 
              }}
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

        {regenerationState.error && (
          <div className="absolute top-0 right-0 m-4 p-4 bg-red-900/50 border border-red-700 rounded-md">
            <p className="text-sm text-red-300">{regenerationState.error}</p>
          </div>
        )}

        <RegenerateDialog
          isOpen={regenerateDialog.isOpen}
          onClose={() => setRegenerateDialog(prev => ({ ...prev, isOpen: false }))}
          onRegenerate={handleRegenerate}
          selectedText={regenerateDialog.selectedText}
          isRegenerating={regenerationState.isLoading}
        />
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