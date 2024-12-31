import { SEOMetadata } from "../../components/SEOMetadataForm";

export interface BlogPost {
  id: string;
  project_id: string;
  project_name: string;
  content: string;
  seo_metadata: SEOMetadata;
  created_at: string;
  updated_at: string;
} 