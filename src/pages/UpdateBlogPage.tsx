import React, { useEffect, useState } from 'react';
import { CreateBlogPost } from '../components/CreateBlogPost';
import { Navigate, useParams } from 'react-router-dom';
import { BlogPost } from '../lib/types/blog';
import { Spin } from 'antd';
import { API_ROUTES } from '../lib/util/constants';

export function UpdateBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(API_ROUTES.GET_BLOG_BY_ID(id!));
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error || 'Blog post not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <CreateBlogPost 
        initial_blog={blog}
        is_editing={true}
      />
    </div>
  );
} 