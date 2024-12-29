import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';

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
  apiProvider: "openai" | "claude";
  customPrompt: string;
  themeName: string;
}

export function BlogForm({ onSubmit, isLoading, hasContent }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "10 best websites to hire remote developers",
    seoKeywords: [],
    ignoreSections: [],
    generateSections: [],
    apiProvider: "openai",
    customPrompt: "",
    themeName: "modern",
  });

  const [keyword, setKeyword] = useState("");
  const [section, setSection] = useState("");
  const [ignoreSection, setIgnoreSection] = useState("");
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
        seoKeywords: [...prev.seoKeywords, keyword]
      }));
      setKeyword("");
    }
  };

  const addSection = () => {
    if (section && !formData.generateSections.includes(section)) {
      setFormData(prev => ({
        ...prev,
        generateSections: [...prev.generateSections, section]
      }));
      setSection("");
    }
  };

  const addIgnoreSection = () => {
    if (ignoreSection && !formData.ignoreSections.includes(ignoreSection)) {
      setFormData(prev => ({
        ...prev,
        ignoreSections: [...prev.ignoreSections, ignoreSection]
      }));
      setIgnoreSection("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Blog Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SEO Keywords</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={addKeyword}
              className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.seoKeywords.map((kw, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
              >
                {kw}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    seoKeywords: prev.seoKeywords.filter((_, i) => i !== index)
                  }))}
                  className="ml-2 inline-flex items-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Generate Sections</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.generateSections.map((sec, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
              >
                {sec}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    generateSections: prev.generateSections.filter((_, i) => i !== index)
                  }))}
                  className="ml-2 inline-flex items-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ignore Sections</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              value={ignoreSection}
              onChange={(e) => setIgnoreSection(e.target.value)}
              className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={addIgnoreSection}
              className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.ignoreSections.map((sec, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800"
              >
                {sec}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    ignoreSections: prev.ignoreSections.filter((_, i) => i !== index)
                  }))}
                  className="ml-2 inline-flex items-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">API Provider</label>
          <select
            value={formData.apiProvider}
            onChange={(e) => setFormData(prev => ({ ...prev, apiProvider: e.target.value as "openai" | "claude" }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="openai">OpenAI</option>
            <option value="claude">Claude</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Custom Prompt (Optional)</label>
          <textarea
            value={formData.customPrompt}
            onChange={(e) => setFormData(prev => ({ ...prev, customPrompt: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Settings className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Generating...
              </>
            ) : hasContent ? (
              'Regenerate Blog'
            ) : (
              'Generate Blog'
            )}
          </button>
        </div>
      </form>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Settings className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Regenerate Blog Content
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to regenerate the blog content? This will replace your current content with new generated content.
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
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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