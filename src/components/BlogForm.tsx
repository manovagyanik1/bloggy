import React, { useState, KeyboardEvent } from 'react';
import { Settings, Plus, X } from 'lucide-react';

interface BlogFormProps {
  onSubmit: (data: BlogFormData) => void;
  isLoading: boolean;
  hasContent?: boolean;
}

export interface BlogFormData {
  title: string;
  seoKeywords: string[];
  ignoreSections: string[];
  generateSections: string[];
  apiProvider: 'openai' | 'claude';
  customPrompt: string;
  themeName: string;
}

// Create a reusable TagInput component
interface TagInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  placeholder?: string;
  tags: string[];
  onRemove: (index: number) => void;
}

function TagInput({ label, value, onChange, onAdd, placeholder, tags, onRemove }: TagInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-indigo-300">{label}</label>
      <div className="mt-1 flex space-x-2">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="block w-full rounded-md border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder || `Add ${label.toLowerCase()} and press Enter`}
        />
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-transparent shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 disabled:opacity-50"
        >
          <Plus className="h-5 w-5 text-white" />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-700"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="ml-1.5 inline-flex items-center justify-center text-indigo-400 hover:text-indigo-300"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export function BlogForm({ onSubmit, isLoading, hasContent }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: 'What makes clipy so powerful',
    seoKeywords: [],
    ignoreSections: [],
    generateSections: [],
    apiProvider: 'openai',
    customPrompt: '',
    themeName: 'modern',
  });

  const [keyword, setKeyword] = useState('');
  const [section, setSection] = useState('');
  const [ignoreSection, setIgnoreSection] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasContent) {
      setShowConfirmDialog(true);
    } else {
      onSubmit(formData);
    }
  };

  const handleConfirmRegenerate = () => {
    setShowConfirmDialog(false);
    onSubmit(formData);
  };

  const addKeyword = () => {
    if (keyword && !formData.seoKeywords.includes(keyword)) {
      setFormData(prev => ({
        ...prev,
        seoKeywords: [...prev.seoKeywords, keyword],
      }));
      setKeyword('');
    }
  };

  const addSection = () => {
    if (section && !formData.generateSections.includes(section)) {
      setFormData(prev => ({
        ...prev,
        generateSections: [...prev.generateSections, section],
      }));
      setSection('');
    }
  };

  const addIgnoreSection = () => {
    if (ignoreSection && !formData.ignoreSections.includes(ignoreSection)) {
      setFormData(prev => ({
        ...prev,
        ignoreSections: [...prev.ignoreSections, ignoreSection],
      }));
      setIgnoreSection('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-indigo-300">
            Blog Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="block w-full rounded-md border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <TagInput
          label="SEO Keywords"
          value={keyword}
          onChange={setKeyword}
          onAdd={addKeyword}
          tags={formData.seoKeywords}
          onRemove={index =>
            setFormData(prev => ({
              ...prev,
              seoKeywords: prev.seoKeywords.filter((_, i) => i !== index),
            }))
          }
        />

        <TagInput
          label="Generate Sections"
          value={section}
          onChange={setSection}
          onAdd={addSection}
          tags={formData.generateSections}
          onRemove={index =>
            setFormData(prev => ({
              ...prev,
              generateSections: prev.generateSections.filter((_, i) => i !== index),
            }))
          }
        />

        <TagInput
          label="Ignore Sections"
          value={ignoreSection}
          onChange={setIgnoreSection}
          onAdd={addIgnoreSection}
          tags={formData.ignoreSections}
          onRemove={index =>
            setFormData(prev => ({
              ...prev,
              ignoreSections: prev.ignoreSections.filter((_, i) => i !== index),
            }))
          }
        />

        <div>
          <label htmlFor="apiProvider" className="block text-sm font-medium text-indigo-300">
            AI Provider
          </label>
          <select
            id="apiProvider"
            name="apiProvider"
            value={formData.apiProvider}
            onChange={e =>
              setFormData(prev => ({ ...prev, apiProvider: e.target.value as 'openai' | 'claude' }))
            }
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="openai">OpenAI</option>
            <option value="claude">Claude</option>
          </select>
        </div>

        <div>
          <label htmlFor="customPrompt" className="block text-sm font-medium text-indigo-300">
            Custom Instructions (Optional)
          </label>
          <div className="mt-1">
            <textarea
              id="customPrompt"
              name="customPrompt"
              rows={3}
              value={formData.customPrompt}
              onChange={e => setFormData(prev => ({ ...prev, customPrompt: e.target.value }))}
              className="block w-full rounded-md border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Settings className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Generating...
              </>
            ) : (
              'Generate Blog'
            )}
          </button>
        </div>
      </form>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-gray-700">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                    <Settings className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-100">
                      Regenerate Blog Content
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300">
                        Are you sure you want to regenerate the blog content? This will replace your
                        current content with new generated content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleConfirmRegenerate}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Regenerate
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmDialog(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-600 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
