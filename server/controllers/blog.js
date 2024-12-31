import { supabase } from '../lib/supabase.js';

export async function getBlogsByProject(req, res) {
  try {
    const { projectId } = req.params;

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.json(data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch blog posts' 
    });
  }
}

export async function getBlogBySlug(req, res) {
  try {
    const { projectId, slug } = req.params;

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('project_id', projectId)
      .eq('seo_metadata->slug', slug)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ 
        error: 'Blog post not found' 
      });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch blog post' 
    });
  }
} 