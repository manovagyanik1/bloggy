import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createProject, updateProject, getProjectBySlug } from '../lib/services/project';
import { toast } from 'react-hot-toast';
import { Project } from '../lib/types/project';

const THEMES = ['default', 'dark', 'light', 'modern', 'minimal'];

interface ProjectFormProps {
  mode?: 'create' | 'edit';
}

export function ProjectForm({ mode = 'create' }: ProjectFormProps) {
  const navigate = useNavigate();
  const { projectSlug } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (mode === 'edit' && projectSlug) {
      loadProject();
    }
  }, [mode, projectSlug]);

  const loadProject = async () => {
    try {
      const data = await getProjectBySlug(projectSlug!);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
      navigate('/projects');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const projectData = {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
        theme: formData.get('theme') as string,
        description: formData.get('description') as string
      };

      if (mode === 'edit' && project) {
        await updateProject(project.id, projectData);
        toast.success('Project updated successfully!');
      } else {
        const newProject = await createProject(projectData);
        toast.success('Project created successfully!');
        navigate(`/projects/${newProject.slug}/settings`);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(`Failed to ${mode} project`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mode === 'edit') return; // Don't auto-generate slug in edit mode
    
    const name = e.target.value;
    const slugInput = e.currentTarget.form?.querySelector<HTMLInputElement>('[name="slug"]');
    if (slugInput) {
      slugInput.value = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            required
            onChange={handleNameChange}
            defaultValue={project?.name}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            placeholder="My Awesome Project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Project Slug
          </label>
          <input
            type="text"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            defaultValue={project?.slug}
            readOnly={mode === 'edit'}
            className={`mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white ${
              mode === 'edit' ? 'opacity-50' : ''
            }`}
            placeholder="my-awesome-project"
          />
          <p className="mt-1 text-sm text-gray-500">
            URL-friendly name (lowercase letters, numbers, and hyphens only)
            {mode === 'edit' && " - Cannot be changed"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Theme
          </label>
          <select
            name="theme"
            defaultValue={project?.theme || 'default'}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
          >
            {THEMES.map(theme => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={project?.description || ''}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            placeholder="Describe your project..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? 
              (mode === 'edit' ? 'Saving...' : 'Creating...') : 
              (mode === 'edit' ? 'Save Changes' : 'Create Project')
            }
          </button>

          {mode === 'edit' && projectSlug && (
            <Link
              to={`/projects/${projectSlug}/blogs`}
              className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Go to Blogs
            </Link>
          )}
        </div>
      </form>

      {mode === 'edit' && (
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-200 mb-4">Project Actions</h3>
          <div className="flex gap-4">
            <Link
              to={`/projects/${projectSlug}/blogs`}
              className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <span className="mr-2">📝</span>
              View Project Blogs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 