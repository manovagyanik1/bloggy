import { SEOMetadata } from '../../components/SEOMetadataForm';
import { supabase } from '../supabase';
import { BlogPost } from '../types/blog';

export async function saveBlogPost(
  content: string, 
  metadata: SEOMetadata, 
  projectId: string
): Promise<BlogPost> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error('Not authenticated');

  const slug = metadata.slug || metadata.title.toLowerCase().replace(/\s+/g, '-');

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{
      content,
      seo_metadata: metadata,
      project_id: projectId,
      author_id: user.id,
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBlogPost(
  id: string,
  content: string,
  metadata: SEOMetadata,
  projectId: string
): Promise<BlogPost> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error('Not authenticated');

  const slug = metadata.slug || metadata.title.toLowerCase().replace(/\s+/g, '-');

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      content,
      seo_metadata: metadata,
      slug,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('project_id', projectId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getBlogsByProject(projectId: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getBlogById(id: string): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      projects (
        id,
        user_id
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBlogPost(blogId: string): Promise<void> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error('Not authenticated');

  // First verify ownership through project
  const { data: blog, error: blogError } = await supabase
    .from('blog_posts')
    .select(`
      id,
      projects (
        id,
        user_id
      )
    `)
    .eq('id', blogId)
    .single();

  if (blogError || !blog) {
    throw new Error('Blog post not found');
  }

  if (blog.projects.user_id !== user.id) {
    throw new Error('Unauthorized: You do not own this blog post');
  }

  // Then delete the blog post
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', blogId);

  if (error) throw error;
} 