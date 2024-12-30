import React from 'react';
import { getTheme } from '../lib/themes';

export interface SEOMetadata {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  socialTitle: string;
  socialDescription: string;
  readingTime: string;
  category: string;
  canonicalUrl?: string;
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
              ({metadata.seoTitle.length}/60)
            </span>
          </label>
          <input
            type="text"
            value={metadata.seoTitle}
            onChange={(e) => onChange({ ...metadata, seoTitle: e.target.value })}
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
              ({metadata.metaDescription.length}/160)
            </span>
          </label>
          <textarea
            value={metadata.metaDescription}
            onChange={(e) => onChange({ ...metadata, metaDescription: e.target.value })}
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
            value={metadata.primaryKeyword}
            onChange={(e) => onChange({ ...metadata, primaryKeyword: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Secondary Keywords
          </label>
          <div className="mt-1 flex flex-wrap gap-2">
            {metadata.secondaryKeywords.map((keyword, index) => (
              <div 
                key={index}
                className="flex items-center bg-gray-700 rounded-md px-2 py-1"
              >
                <span className="text-sm" style={{ color: theme.colors.text }}>{keyword}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newKeywords = [...metadata.secondaryKeywords];
                    newKeywords.splice(index, 1);
                    onChange({ ...metadata, secondaryKeywords: newKeywords });
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
                    secondaryKeywords: [...metadata.secondaryKeywords, e.currentTarget.value]
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
            value={metadata.socialTitle}
            onChange={(e) => onChange({ ...metadata, socialTitle: e.target.value })}
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
            value={metadata.readingTime}
            onChange={(e) => onChange({ ...metadata, readingTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
            Social Media Description
          </label>
          <textarea
            value={metadata.socialDescription}
            onChange={(e) => onChange({ ...metadata, socialDescription: e.target.value })}
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
            value={metadata.canonicalUrl || ''}
            onChange={(e) => onChange({ ...metadata, canonicalUrl: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
} 