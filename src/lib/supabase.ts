import { createClient } from '@supabase/supabase-js';
import { SEOMetadata } from '../components/SEOMetadataForm';
import { PROJECT } from './util/constants';

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

export async function saveBlogPost(content: string, seo_metadata: SEOMetadata) {
  const project_id = PROJECT.id;
  const project_name = PROJECT.name;

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([
      {
        id: crypto.randomUUID(),
        project_id,
        project_name,
        content,
        seo_metadata,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data as BlogPost;
}

export async function updateBlogPost(id: string, content: string, seo_metadata: SEOMetadata) {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      content,
      seo_metadata,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as BlogPost;
} 