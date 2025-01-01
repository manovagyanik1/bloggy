import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { getProjectBySlug } from '../services/project';
import { toast } from 'react-hot-toast';

export function useProject(projectSlug: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectSlug) {
      loadProject();
    }
  }, [projectSlug]);

  const loadProject = async () => {
    try {
      const projectData = await getProjectBySlug(projectSlug!);
      setProject(projectData);
    } catch (error) {
      console.error('Error loading project:', error);
      const message = error instanceof Error ? error.message : 'Failed to load project';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { project, isLoading, error };
} 