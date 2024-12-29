import { BlogTheme } from '../types/theme';

export const modernTheme: BlogTheme = {
  name: "modern",
  colors: {
    primary: "#2563eb",
    secondary: "#3b82f6",
    background: "#ffffff",
    text: "#1f2937",
  },
  fonts: {
    heading: "font-sans text-4xl font-extrabold text-gray-900 tracking-tight",
    subheading: "font-sans text-2xl font-bold text-gray-800",
    body: "font-sans text-lg text-gray-700 leading-relaxed",
    caption: "font-sans text-base text-gray-500",
  },
  layout: {
    container: "max-w-5xl mx-auto px-6",
    sectionSpacing: "my-12",
    imageSpacing: "my-6",
  },
};