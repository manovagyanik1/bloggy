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
    heading: 'font-sans text-4xl font-bold text-white',
    subheading: 'font-sans text-2xl font-semibold text-white',
    body: 'font-sans text-base text-gray-300',
    caption: 'font-sans text-sm text-gray-400',
  },
  layout: {
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    sectionSpacing: 'py-24',
    imageSpacing: 'my-6',
  },
};

export type Theme = typeof clipyTheme; 