import React, { useEffect, useState } from 'react';
import { ProjectForm } from '../components/ProjectForm';
import { CreateProjectInput, Project } from '../lib/types/project';
import { createProject, getProjectBySlug, updateProject } from '../lib/services/project';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';

interface CreateProjectPageProps {
  mode?: 'create' | 'edit';
}

export function CreateProjectPage({ mode = 'create' }: CreateProjectPageProps) {
  const navigate = useNavigate();
  const { projectSlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && projectSlug) {
      loadProject();
    }
  }, [mode, projectSlug]);

  const loadProject = async () => {
    try {
      setIsLoading(true);
      const data = await getProjectBySlug(projectSlug!);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load project';
      setError(errorMessage);
      message.error(errorMessage);
      navigate('/projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: CreateProjectInput) => {
    try {
      setIsLoading(true);
      if (mode === 'edit' && project) {
        await updateProject(project.id, values);
        message.success('Project updated successfully');
        navigate(`/projects/${values.slug}/blogs`);
      } else {
        const newProject = await createProject(values);
        message.success('Project created successfully');
        navigate(`/projects/${newProject.slug}/blogs`);
      }
    } catch (error) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} project:`, error);
      message.error(`Failed to ${mode === 'edit' ? 'update' : 'create'} project`);
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === 'edit' && isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (mode === 'edit' && error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'edit'
              ? 'Update your project settings'
              : 'Set up a new blog project with custom settings'}
          </p>
        </div>

        <div className="mt-8">
          <ProjectForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            initialValues={
              project
                ? {
                    name: project.name,
                    slug: project.slug,
                    url: project.url,
                    theme: project.theme,
                    description: project.description,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
