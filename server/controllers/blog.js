import { supabase } from '../lib/supabase.js';

// Helper function to verify project ownership
async function verifyProjectOwnership(projectId, userId) {
  const { data, error } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    throw new Error('Unauthorized: You do not own this project');
  }
}

export async function getBlogsByProject(req, res) {
  try {
    const { projectId } = req.params;
    const { user } = req;

    // Verify project ownership
    await verifyProjectOwnership(projectId, user.id);

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return res.json(data);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(error.message.includes('Unauthorized') ? 403 : 500).json({ 
      error: error.message 
    });
  }
}

export async function getBlogById(req, res) {
  try {
    const { id } = req.params;
    const { user } = req;

    // Get blog with its project info
    const { data: blog, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        projects:project_id (
          id,
          user_id
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!blog) {
      return res.status(404).json({ 
        error: 'Blog post not found' 
      });
    }

    // Verify ownership
    if (blog.projects.user_id !== user.id) {
      return res.status(403).json({
        error: 'Unauthorized: You do not own this blog post'
      });
    }

    return res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return res.status(error.message.includes('Unauthorized') ? 403 : 500).json({ 
      error: error.message 
    });
  }
}

export async function saveBlogPost(req, res) {
  try {
    const { content, metadata, projectId } = req.body;
    const { user } = req;

    // Verify project ownership
    await verifyProjectOwnership(projectId, user.id);

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        content,
        seo_metadata: metadata,
        project_id: projectId,
        author_id: user.id
      }])
      .select()
      .single();

    if (error) throw error;
    return res.json(data);
  } catch (error) {
    console.error('Error saving blog:', error);
    return res.status(error.message.includes('Unauthorized') ? 403 : 500).json({ 
      error: error.message 
    });
  }
}

export async function updateBlogPost(req, res) {
  try {
    const { id } = req.params;
    const { content, metadata, projectId } = req.body;
    const { user } = req;

    // Verify project ownership
    await verifyProjectOwnership(projectId, user.id);

    // Verify blog ownership through project
    const { data: blog, error: blogError } = await supabase
      .from('blog_posts')
      .select(`
        id,
        projects:project_id (
          id,
          user_id
        )
      `)
      .eq('id', id)
      .single();

    if (blogError || !blog) {
      throw new Error('Blog post not found');
    }

    if (blog.projects.user_id !== user.id) {
      throw new Error('Unauthorized: You do not own this blog post');
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        content,
        seo_metadata: metadata,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return res.json(data);
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(error.message.includes('Unauthorized') ? 403 : 500).json({ 
      error: error.message 
    });
  }
}

export async function deleteBlogPost(req, res) {
  try {
    const { id } = req.params;
    const { user } = req;

    // Verify blog ownership through project
    const { data: blog, error: blogError } = await supabase
      .from('blog_posts')
      .select(`
        id,
        projects:project_id (
          id,
          user_id
        )
      `)
      .eq('id', id)
      .single();

    if (blogError || !blog) {
      throw new Error('Blog post not found');
    }

    if (blog.projects.user_id !== user.id) {
      throw new Error('Unauthorized: You do not own this blog post');
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return res.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return res.status(error.message.includes('Unauthorized') ? 403 : 500).json({ 
      error: error.message 
    });
  }
} 