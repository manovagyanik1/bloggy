import React from 'react';
import { CreateBlogPost } from '../components/CreateBlogPost';
import { useParams, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useProject } from '../lib/hooks/useProject';

export function CreateBlogPage() {
  const { projectSlug } = useParams();
  const { project, isLoading, error } = useProject(projectSlug);

  if (!projectSlug) {
    return <Navigate to="/projects" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error || 'Project not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <CreateBlogPost projectSlug={project.slug} />
    </div>
  );
} 