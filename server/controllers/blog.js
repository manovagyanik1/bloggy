import { supabase } from '../lib/supabase.js';

export async function getBlogsByProject(req, res) {
  try {
    const { project_id } = req.params;

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('project_id', project_id)
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

export async function getBlogById(req, res) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
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