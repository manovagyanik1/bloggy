import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../lib/services/project';
import { Project } from '../lib/types/project';
import { toast } from 'react-hot-toast';

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="text-center">
        <h3 className="mt-2 text-sm font-semibold text-gray-300">No projects</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
        <div className="mt-6">
          <Link
            to="/projects/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Project
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <div
          key={project.id}
          className="relative rounded-lg border border-gray-700 bg-gray-800 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-600"
        >
          <div className="flex-1 min-w-0">
            <Link to={`/projects/${project.slug}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-white">{project.name}</p>
              <p className="text-sm text-gray-400 truncate">{project.description}</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 