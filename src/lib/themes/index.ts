import { BlogTheme } from '../types/theme';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export const themes: Record<string, BlogTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

export function getTheme(name: string = 'clipy'): BlogTheme {
  return themes[name] || darkTheme;
}
