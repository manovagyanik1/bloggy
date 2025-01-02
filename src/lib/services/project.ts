import { supabase } from '../supabase';
import { Project, CreateProjectInput } from '../types/project';

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createProject(project: CreateProjectInput): Promise<Project> {
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error('Not authenticated');

  // Add user_id to project data
  const projectWithUser = {
    ...project,
    user_id: user.id
  };

  const { data, error } = await supabase
    .from('projects')
    .insert([projectWithUser])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProjectById(id: string): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error) throw error;
    if (!data) throw new Error('Project not found');
    
    return data;
  }

export async function getProjectBySlug(slug: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Project not found');
  
  return data;
}

export async function updateProject(id: string, project: Partial<CreateProjectInput>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}; 