import { SEOMetadata } from "../../components/SEOMetadataForm";

export interface BlogPost {
  id: string;
  projectId: string;
  projectName: string;
  content: string;
  seoMetadata: SEOMetadata;
  createdAt: string;
  updatedAt: string;
} 