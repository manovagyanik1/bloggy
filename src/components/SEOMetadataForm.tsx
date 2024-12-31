import React from 'react';
import { getTheme } from '../lib/themes';

export interface SEOMetadata {
  seo_title: string;
  meta_description: string;
  slug: string;
  primary_keyword: string;
  secondary_keywords: string[];
  social_title: string;
  social_description: string;
  reading_time: string;
  category: string;
  canonical_url?: string;
}

interface SEOMetadataFormProps {
  metadata: SEOMetadata;
  onChange: (metadata: SEOMetadata) => void;
}

export function SEOMetadataForm({ metadata, onChange }: SEOMetadataFormProps) {
  const theme = getTheme();

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
                ({metadata.seo_title.length}/60)
            </span>
          </label>
          <input
            type="text"
            value={metadata.seo_title}
            onChange={(e) => onChange({ ...metadata, seo_title: e.target.value })}
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
            value={metadata.slug}
            onChange={(e) => onChange({ ...metadata, slug: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Meta Description
            <span className="text-xs ml-1" style={{ color: theme.colors.secondary }}>
              ({metadata.meta_description.length}/160)
            </span>
          </label>
          <textarea
            value={metadata.meta_description}
            onChange={(e) => onChange({ ...metadata, meta_description: e.target.value })}
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
            value={metadata.primary_keyword}
            onChange={(e) => onChange({ ...metadata, primary_keyword: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Secondary Keywords
          </label>
          <div className="mt-1 flex flex-wrap gap-2">
            {metadata.secondary_keywords.map((keyword, index) => (
              <div 
                key={index}
                className="flex items-center bg-gray-700 rounded-md px-2 py-1"
              >
                <span className="text-sm" style={{ color: theme.colors.text }}>{keyword}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newKeywords = [...metadata.secondary_keywords];
                    newKeywords.splice(index, 1);
                    onChange({ ...metadata, secondary_keywords: newKeywords });
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
                    ...metadata,
                    secondary_keywords: [...metadata.secondary_keywords, e.currentTarget.value]
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
            value={metadata.social_title}
            onChange={(e) => onChange({ ...metadata, social_title: e.target.value })}
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
            value={metadata.reading_time}
            onChange={(e) => onChange({ ...metadata, reading_time: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Social Media Description
          </label>
          <textarea
            value={metadata.social_description}
            onChange={(e) => onChange({ ...metadata, social_description: e.target.value })}
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
            value={metadata.category}
            onChange={(e) => onChange({ ...metadata, category: e.target.value })}
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
            value={metadata.canonical_url || ''}
            onChange={(e) => onChange({ ...metadata, canonical_url: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
} 