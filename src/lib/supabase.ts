import { createClient } from '@supabase/supabase-js';
import { SEOMetadata } from '../components/SEOMetadataForm';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
  id: string;
  project_id: string;
  project_name: string;
  content: string;
  seo_metadata: SEOMetadata;
  created_at: string;
  updated_at: string;
}

export async function saveBlogPost(content: string, seoMetadata: SEOMetadata) {
  const projectId = '4fc7eb1b-edbb-4a2f-b406-c53264e9f5fd'; // Hardcoded for now
  const projectName = 'clipy'; // Hardcoded for now

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([
      {
        id: crypto.randomUUID(),
        project_id: projectId,
        project_name: projectName,
        content,
        seo_metadata: seoMetadata,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
} 