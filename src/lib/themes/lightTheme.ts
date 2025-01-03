import { BlogTheme } from '../types/theme';

export const lightTheme: BlogTheme = {
  name: 'light',
  colors: {
    primary: '#3b82f6', // blue-500
    secondary: '#60a5fa', // blue-400
    background: '#ffffff', // white
    text: '#111827', // gray-900
  },
  fonts: {
    heading: 'font-sans text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight',
    subheading: 'font-sans text-3xl font-semibold text-gray-800 mb-6 leading-relaxed',
    body: 'font-sans text-lg text-gray-600 leading-relaxed tracking-wide',
    caption: 'font-sans text-sm text-gray-500 tracking-wider uppercase',
    elements: {
      h1: 'font-sans text-4xl font-bold text-gray-900 mb-8 leading-tight tracking-tight',
      h2: 'font-sans text-3xl font-bold text-gray-800 mb-6 leading-snug',
      h3: 'font-sans text-2xl font-semibold text-gray-800 mb-5 leading-snug',
      h4: 'font-sans text-xl font-semibold text-gray-800 mb-4',
      h5: 'font-sans text-lg font-medium text-gray-800 mb-3',
      h6: 'font-sans text-base font-medium text-gray-800 mb-3',
      p: 'font-sans text-lg text-gray-600 mb-6 leading-relaxed tracking-wide',
      ul: 'list-disc list-inside space-y-3 mb-8 text-gray-600 ml-4',
      ol: 'list-decimal list-inside space-y-3 mb-8 text-gray-600 ml-4',
      li: 'text-gray-600 ml-2 leading-relaxed',
      blockquote: 'border-l-4 border-blue-500 pl-6 py-2 italic text-gray-500 mb-8 text-xl',
      table: 'w-full border-collapse mb-8 bg-gray-50 rounded-lg overflow-hidden',
      th: 'border border-gray-200 px-6 py-3 bg-gray-100 text-gray-700 font-semibold text-left',
      td: 'border border-gray-200 px-6 py-4 text-gray-600',
      pre: 'bg-gray-50 rounded-lg p-6 mb-6 overflow-x-auto text-sm',
      code: 'font-mono text-sm bg-gray-100 rounded px-2 py-1 text-gray-600',
      a: 'text-blue-500 hover:text-blue-600 underline decoration-2 underline-offset-2 transition-colors duration-200',
      img: 'max-w-full h-auto rounded-xl mb-8 shadow-lg',
      hr: 'border-gray-200 my-12',
    },
  },
  layout: {
    container: 'w-full min-h-screen bg-white',
    sectionSpacing: 'py-12 space-y-8',
    imageSpacing: 'my-8 space-y-4',
  },
};
