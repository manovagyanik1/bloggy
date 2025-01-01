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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
} 