import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogView } from '../components/BlogView';
import { BlogPost } from '../lib/types/blog';
import { API_ROUTES } from '../lib/util/constants';
import { message } from 'antd';

export function BlogViewPage() {
  const { id, projectSlug } = useParams<{ id: string, projectSlug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!id) {
        navigate(`/projects/${projectSlug}/blogs`);
        return;
      }

      try {
        const response = await fetch(
          API_ROUTES.GET_BLOG_BY_ID(id)
        );

        if (!response.ok) {
          throw new Error('Blog not found');
        }

        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        message.error('Failed to load blog post');
        navigate(`/projects/${projectSlug}/blogs`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlog();
  }, [id, navigate]);

  if (!blog && !isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {blog && <BlogView blog={blog} isLoading={isLoading} />}
    </div>
  );
} 