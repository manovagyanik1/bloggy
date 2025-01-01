export interface Project {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  theme: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  name: string;
  slug: string;
  theme: string;
  description?: string;
} 