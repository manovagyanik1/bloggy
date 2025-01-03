import { useEffect, useState } from 'react';
import { ProjectList } from '../components/ProjectList';
import { Project } from '../lib/types/project';
import { getProjects, deleteProject } from '../lib/services/project';
import { message } from 'antd';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (err: unknown) {
      message.error(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      message.success('Project deleted successfully');
      loadProjects(); // Reload the list
    } catch (err: unknown) {
      message.error(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectList projects={projects} onDelete={handleDelete} isLoading={isLoading} />
    </div>
  );
}
