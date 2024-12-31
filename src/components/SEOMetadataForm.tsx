import React from 'react';
import { getTheme } from '../lib/themes';

export interface SEOMetadata {
  seo_title: string;
  meta_description: string;
  slug: string;
  primary_keyword: string;
  keywords: string[];
  social_title: string;
  social_description: string;
  reading_time: string;
  category: string;
  canonical_url?: string;
}

const defaultMetadata: SEOMetadata = {
  seo_title: '',
  meta_description: '',
  slug: '',
  primary_keyword: '',
  keywords: [],
  social_title: '',
  social_description: '',
  reading_time: '',
  category: '',
};

interface SEOMetadataFormProps {
  metadata: SEOMetadata;
  onChange: (metadata: SEOMetadata) => void;
}

export function SEOMetadataForm({ metadata, onChange }: SEOMetadataFormProps) {
  const theme = getTheme();
  
  // Ensure we have valid metadata by merging with defaults
  const validMetadata = {
    ...defaultMetadata,
    ...metadata,
    // Ensure arrays are initialized
    keywords: metadata.keywords || [],
  };

  return (
    <div className="space-y-6 mt-8 p-6 rounded-lg border border-gray-700" 
         style={{ backgroundColor: theme.colors.background }}>
      <h3 className={`text-lg font-medium ${theme.fonts.heading}`} 
          style={{ color: theme.colors.text }}>
        SEO Metadata
      </h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            SEO Title
            <span className="text-xs ml-1" style={{ color: theme.colors.secondary }}>
              ({validMetadata.seo_title.length}/60)
            </span>
          </label>
          <input
            type="text"
            value={validMetadata.seo_title}
            onChange={(e) => onChange({ ...validMetadata, seo_title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            maxLength={60}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            URL Slug
          </label>
          <input
            type="text"
            value={validMetadata.slug}
            onChange={(e) => onChange({ ...validMetadata, slug: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Meta Description
            <span className="text-xs ml-1" style={{ color: theme.colors.secondary }}>
              ({validMetadata.meta_description.length}/160)
            </span>
          </label>
          <textarea
            value={metadata.meta_description}
            onChange={(e) => onChange({ ...validMetadata, meta_description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            maxLength={160}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Primary Keyword
          </label>
          <input
            type="text"
            value={validMetadata.primary_keyword}
            onChange={(e) => onChange({ ...validMetadata, primary_keyword: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Keywords
          </label>
          <div className="mt-1 flex flex-wrap gap-2">
            {validMetadata.keywords.map((keyword, index) => (
              <div 
                key={index}
                className="flex items-center bg-gray-700 rounded-md px-2 py-1"
              >
                <span className="text-sm" style={{ color: theme.colors.text }}>{keyword}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newKeywords = [...validMetadata.keywords];
                    newKeywords.splice(index, 1);
                    onChange({ ...validMetadata, keywords: newKeywords });
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-300"
                >
                  ×
                </button>
              </div>
            ))}
            <input
              type="text"
              placeholder="Add keyword and press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  e.preventDefault();
                  onChange({
                    ...validMetadata,
                    keywords: [...validMetadata.keywords, e.currentTarget.value]
                  });
                  e.currentTarget.value = '';
                }
              }}
              className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Social Media Title
          </label>
          <input
            type="text"
            value={validMetadata.social_title}
            onChange={(e) => onChange({ ...validMetadata, social_title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Reading Time
          </label>
          <input
            type="text"
            value={validMetadata.reading_time}
            onChange={(e) => onChange({ ...validMetadata, reading_time: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Meta Description
            <span className="text-xs ml-1" style={{ color: theme.colors.secondary }}>
              ({validMetadata.meta_description.length}/160)
            </span>
          </label>
          <textarea
            value={validMetadata.meta_description}
            onChange={(e) => onChange({ ...validMetadata, meta_description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            maxLength={160}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Social Media Description
          </label>
          <textarea
            value={validMetadata.social_description}
            onChange={(e) => onChange({ ...validMetadata, social_description: e.target.value })}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Category
          </label>
          <input
            type="text"
            value={validMetadata.category}
            onChange={(e) => onChange({ ...validMetadata, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Canonical URL
            <span className="text-xs ml-1" style={{ color: theme.colors.secondary }}>
              (optional)
            </span>
          </label>
          <input
            type="url"
            value={validMetadata.canonical_url || ''}
            onChange={(e) => onChange({ ...validMetadata, canonical_url: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
} 