import { BlogTheme } from '../types/theme';
import { defaultTheme } from './default';
import { modernTheme } from './modern';

export const themes: Record<string, BlogTheme> = {
  default: defaultTheme,
  modern: modernTheme,
};

export function getTheme(name: string = 'default'): BlogTheme {
  return themes[name] || defaultTheme;
}