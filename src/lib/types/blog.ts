import { SEOMetadata } from '../../components/SEOMetadataForm';

export interface BlogPost {
  id: string;
  project_id: string;
  author_id: string;
  content: string;
  slug: string;
  seo_metadata: SEOMetadata;
  created_at: string;
  updated_at: string;
  projects?: {
    id: string;
    user_id: string;
  };
} 