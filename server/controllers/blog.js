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

// Helper function to generate sitemap XML
function generateSitemapXML(blogs, project) {
  const urlElements = blogs.map(blog => `
    <url>
      <loc>${project.url}/${blog.slug}</loc>
      <lastmod>${new Date(blog.updated_at).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlElements}
    </urlset>`;
}

export async function getBlogsByProject(req, res) {
  try {
    const { projectId } = req.params;
    const { user } = req;

    // Verify project ownership
    // await verifyProjectOwnership(projectId, user.id);

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
      .select('*')  
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!blog) {
      return res.status(404).json({ 
        error: 'Blog post not found' 
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

export async function getBlogBySlug(req, res) {
  try {
    const { projectId, slug } = req.params;

    // Get blog by project_id and slug
    const { data: blog, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('project_id', projectId)
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!blog) {
      return res.status(404).json({ 
        error: 'Blog post not found' 
      });
    }

    return res.json(blog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return res.status(500).json({ 
      error: error.message 
    });
  }
}

export async function getProjectSitemap(req, res) {
  try {
    const { projectId } = req.params;
    console.log('Generating sitemap for project:', projectId);

    // First get project details
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('name, slug, url')
      .eq('id', projectId)
      .single();

    if (projectError || !project) {
      console.error('Project not found:', projectError);
      return res.status(404).json({ 
        error: 'Project not found' 
      });
    }

    // Then get all blogs for the project
    const { data: blogs, error } = await supabase
      .from('blog_posts')
      .select(`
        slug,
        updated_at
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ 
        error: 'No blogs found for this project' 
      });
    }

    // Generate sitemap XML using project details
    const sitemap = generateSitemapXML(blogs, project);
    console.log('Generated sitemap for', blogs.length, 'blogs');

    // Set content type to XML
    res.header('Content-Type', 'application/xml');
    return res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return res.status(500).json({ 
      error: error.message 
    });
  }
}

export async function getBlogWithProjectInfoBySlug(req, res) {
  try {
    const { projectId, slug } = req.params;

    // First get the blog post
    const { data: blog, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('project_id', projectId)
      .eq('slug', slug)
      .single();

    if (blogError) throw blogError;
    if (!blog) {
      return res.status(404).json({ 
        error: 'Blog post not found' 
      });
    }

    // Then get the project info
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (projectError) throw projectError;
    if (!project) {
      return res.status(404).json({ 
        error: 'Project not found' 
      });
    }

    // Return both blog and project info
    return res.json({
      blog: blog,
      project: project
    });

  } catch (error) {
    console.error('Error fetching blog with project info:', error);
    return res.status(500).json({ 
      error: error.message 
    });
  }
} 