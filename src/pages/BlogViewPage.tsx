import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogView } from '../components/BlogView';
import { BlogPost } from '../lib/types/blog';
import { Project } from '../lib/types/project';
import { getProjectBySlug } from '../lib/services/project';
import { API_ROUTES } from '../lib/util/constants';
import { message } from 'antd';

export function BlogViewPage() {
  const { id, projectSlug } = useParams<{ id: string, projectSlug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectSlug) {
      loadProjectAndBlog();
    }
  }, [projectSlug, id]);

  const loadProjectAndBlog = async () => {
    try {
      setIsLoading(true);
      
      // Load project first
      const projectData = await getProjectBySlug(projectSlug!);
      setProject(projectData);

      // Then load blog
      const response = await fetch(API_ROUTES.GET_BLOG_BY_ID(id!));
      if (!response.ok) throw new Error('Blog not found');
      const blogData = await response.json();
      setBlog(blogData);
    } catch (error) {
      console.error('Error loading:', error);
      message.error('Failed to load content');
      navigate(`/projects/${projectSlug}/blogs`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!blog || !project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogView 
        blog={blog} 
        project={project}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
} 