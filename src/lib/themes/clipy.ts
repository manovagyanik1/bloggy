import { BlogTheme } from '../types/theme';

export const clipyTheme: BlogTheme = {
  name: 'clipy',
  colors: {
    primary: '#3b82f6',    // blue-500
    secondary: '#60a5fa',   // blue-400
    background: '#111827',  // gray-900
    text: '#ffffff',
  },
  fonts: {
    heading: 'font-sans text-4xl font-bold text-white mb-6',
    subheading: 'font-sans text-2xl font-semibold text-white mb-4',
    body: 'font-sans text-base text-gray-300 leading-relaxed',
    caption: 'font-sans text-sm text-gray-400',
    // Element-specific styles
    elements: {
      h1: 'font-sans text-4xl font-bold text-white mb-6',
      h2: 'font-sans text-3xl font-semibold text-white mb-5',
      h3: 'font-sans text-2xl font-semibold text-white mb-4',
      h4: 'font-sans text-xl font-semibold text-white mb-3',
      h5: 'font-sans text-lg font-medium text-white mb-2',
      h6: 'font-sans text-base font-medium text-white mb-2',
      p: 'font-sans text-base text-gray-300 mb-4 leading-relaxed',
      ul: 'list-disc list-inside space-y-2 mb-4 text-gray-300',
      ol: 'list-decimal list-inside space-y-2 mb-4 text-gray-300',
      li: 'text-gray-300 ml-4',
      blockquote: 'border-l-4 border-blue-500 pl-4 italic text-gray-400 mb-4',
      table: 'w-full border-collapse mb-4',
      th: 'border border-gray-700 px-4 py-2 bg-gray-800 text-white font-semibold',
      td: 'border border-gray-700 px-4 py-2 text-gray-300',
      pre: 'bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto',
      code: 'font-mono text-sm bg-gray-800 rounded px-1 py-0.5 text-gray-300',
      a: 'text-blue-400 hover:text-blue-300 underline',
      img: 'max-w-full h-auto rounded-lg mb-4',
      hr: 'border-gray-700 my-8'
    }
  },
  layout: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900',
    sectionSpacing: 'py-24',
    imageSpacing: 'my-6',
  },
};