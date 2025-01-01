import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../lib/services/project';
import { toast } from 'react-hot-toast';

const THEMES = ['default', 'dark', 'light', 'modern', 'minimal'];

export function ProjectForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const slug = formData.get('slug') as string;
      const theme = formData.get('theme') as string;
      const description = formData.get('description') as string;

      const project = await createProject({
        name,
        slug,
        theme,
        description
      });

      toast.success('Project created successfully!');
      navigate(`/projects/${project.slug}`);
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slugInput = e.currentTarget.form?.querySelector<HTMLInputElement>('[name="slug"]');
    if (slugInput) {
      slugInput.value = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
  };

  return (
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
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
          placeholder="my-awesome-project"
        />
        <p className="mt-1 text-sm text-gray-500">
          URL-friendly name (lowercase letters, numbers, and hyphens only)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Theme
        </label>
        <select
          name="theme"
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
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
          placeholder="Describe your project..."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </form>
  );
} 