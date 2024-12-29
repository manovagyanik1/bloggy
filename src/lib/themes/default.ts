import { BlogTheme } from '../types/theme';

export const defaultTheme: BlogTheme = {
  name: "default",
  colors: {
    primary: "#1a202c",
    secondary: "#2d3748",
    background: "#f7fafc",
    text: "#2d3748",
  },
  fonts: {
    heading: "font-sans text-3xl font-bold text-gray-900",
    subheading: "font-sans text-xl font-semibold text-gray-800",
    body: "font-sans text-base text-gray-700 leading-relaxed",
    caption: "font-sans text-sm text-gray-500",
  },
  layout: {
    container: "max-w-4xl mx-auto px-4",
    sectionSpacing: "my-8",
    imageSpacing: "my-4",
  },
};