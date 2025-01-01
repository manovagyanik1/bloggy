import React, { useEffect, useState } from 'react';
import { CreateBlogPost } from '../components/CreateBlogPost';
import { Navigate, useParams } from 'react-router-dom';
import { BlogPost } from '../lib/types/blog';
import { Spin } from 'antd';
import { getBlogById } from '../lib/services/blog';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../lib/hooks/useProject';

export function UpdateBlogPage() {
  const { id, projectSlug } = useParams();
  const { user } = useAuth();
  const { project, isLoading: projectLoading, error: projectError } = useProject(projectSlug);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && user && project) {
      fetchBlog();
    }
  }, [id, user, project]);

  const fetchBlog = async () => {
    try {
      const data = await getBlogById(id!);
      
      // Verify ownership
      if (data.projects?.user_id !== user?.id) {
        throw new Error('Unauthorized: You do not own this blog post');
      }
      
      setBlog(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!projectSlug || !id) {
    return <Navigate to="/projects" replace />;
  }

  if (projectLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (projectError || error || !project || !blog) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{projectError || error || 'Blog post not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <CreateBlogPost 
        initial_blog={blog}
        is_editing={true}
        projectId={project.id}
      />
    </div>
  );
} 