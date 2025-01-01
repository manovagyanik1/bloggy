export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string;
  bio: string | null;
  website: string | null;
  company: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserProfileInput {
  full_name?: string;
  bio?: string;
  website?: string;
  company?: string;
  location?: string;
} 