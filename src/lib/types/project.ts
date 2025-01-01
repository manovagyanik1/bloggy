import { BlogTheme } from './theme';

export interface Project {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  url: string;
  theme: BlogTheme;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  name: string;
  slug: string;
  url: string;
  theme?: BlogTheme;
  description?: string;
} 