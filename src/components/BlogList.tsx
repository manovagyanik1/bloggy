import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { getBlogsByProject } from '../lib/services/blog';
import { getProjectBySlug } from '../lib/services/project';
import { BlogPost } from '../lib/types/blog';
import { Project } from '../lib/types/project';
import { toast } from 'react-hot-toast';
import { Spin } from 'antd';
import { Col, Empty, Row } from 'antd';
import { BlogCard } from './BlogCard';

export function BlogList() {
  const { projectSlug } = useParams();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectSlug) {
      loadProjectAndBlogs();
    }
  }, [projectSlug]);

  const loadProjectAndBlogs = async () => {
    try {
      // First get project details
      const projectData = await getProjectBySlug(projectSlug!);
      setProject(projectData);

      // Then get blogs using project ID
      const blogsData = await getBlogsByProject(projectData.id);
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error loading project and blogs:', error);
      const message = error instanceof Error ? error.message : 'Failed to load blogs';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!projectSlug) {
    return <Navigate to="/projects" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-400 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]">
        <Empty 
          description={
            <span className="text-gray-400">
              No blogs found for {project?.name}
            </span>
          }
        />
        <div className="mt-6">
          <Link
            to={`/projects/${projectSlug}/blogs/create`}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">
        {project?.name} - Blog Posts
      </h1>
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