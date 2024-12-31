import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Empty, message } from 'antd';
import { BlogCard } from './BlogCard';
import { PROJECT, API_ROUTES } from '../lib/util/constants';
import { BlogPost } from '../lib/types/blog';

export function BlogList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(API_ROUTES.GET_PROJECT_BLOGS(PROJECT.id));
        if (!response.ok) throw new Error('Failed to fetch blogs');
        
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        message.error('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Empty description="No blogs found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Blog Posts</h1>
      <Row gutter={[24, 24]}>
        {blogs.map((blog) => (
          <Col xs={24} sm={12} md={8} lg={6} key={blog.id}>
            <BlogCard 
              blog={blog}
              onClick={() => {
                // Handle blog click - you can add navigation here
                console.log('Blog clicked:', blog.seo_metadata.slug);
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
} 