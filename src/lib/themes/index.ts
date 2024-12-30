import { BlogTheme } from '../types/theme';
import { defaultTheme } from './default';
import { modernTheme } from './modern';
import { clipyTheme } from './clipy';

export const themes: Record<string, BlogTheme> = {
  default: defaultTheme,
  modern: modernTheme,
  clipy: clipyTheme,
};

export function getTheme(name: string = 'default'): BlogTheme {
  return themes[name] || defaultTheme;
}