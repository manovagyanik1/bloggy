import { BlogTheme } from '../types/theme';

export const darkTheme: BlogTheme = {
  name: 'dark',
  colors: {
    primary: '#3b82f6', // blue-500
    secondary: '#60a5fa', // blue-400
    background: '#111827', // gray-900
    text: '#ffffff',
  },
  fonts: {
    heading: 'font-sans text-5xl font-bold text-white mb-8 leading-tight tracking-tight',
    subheading: 'font-sans text-3xl font-semibold text-white mb-6 leading-relaxed',
    body: 'font-sans text-lg text-gray-300 leading-relaxed tracking-wide',
    caption: 'font-sans text-sm text-gray-400 tracking-wider uppercase',
    elements: {
      h1: 'font-sans text-4xl font-bold text-white mb-8 leading-tight tracking-tight',
      h2: 'font-sans text-3xl font-bold text-white mb-6 leading-snug',
      h3: 'font-sans text-2xl font-semibold text-white mb-5 leading-snug',
      h4: 'font-sans text-xl font-semibold text-white mb-4',
      h5: 'font-sans text-lg font-medium text-white mb-3',
      h6: 'font-sans text-base font-medium text-white mb-3',
      p: 'font-sans text-lg text-gray-300 mb-6 leading-relaxed tracking-wide',
      ul: 'list-disc list-inside space-y-3 mb-8 text-gray-300 ml-4',
      ol: 'list-decimal list-inside space-y-3 mb-8 text-gray-300 ml-4',
      li: 'text-gray-300 ml-2 leading-relaxed',
      blockquote: 'border-l-4 border-blue-500 pl-6 py-2 italic text-gray-400 mb-8 text-xl',
      table: 'w-full border-collapse mb-8 bg-gray-800/50 rounded-lg overflow-hidden',
      th: 'border border-gray-700 px-6 py-3 bg-gray-800 text-white font-semibold text-left',
      td: 'border border-gray-700 px-6 py-4 text-gray-300',
      pre: 'bg-gray-800 rounded-lg p-6 mb-6 overflow-x-auto text-sm',
      code: 'font-mono text-sm bg-gray-800/70 rounded px-2 py-1 text-gray-300',
      a: 'text-blue-400 hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors duration-200',
      img: 'max-w-full h-auto rounded-xl mb-8 shadow-lg',
      hr: 'border-gray-700 my-12',
    },
  },
  layout: {
    container: 'w-full min-h-screen bg-gray-900',
    sectionSpacing: 'py-12 space-y-8',
    imageSpacing: 'my-8 space-y-4',
  },
};
