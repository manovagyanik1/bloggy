import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase';

const SITE_URL = import.meta.env.VITE_SITE_URL;

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${SITE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Auth error:', error);
    throw error;
  }
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function getUser() {
  return supabase.auth.getUser();
}

export function getSession() {
  return supabase.auth.getSession();
}

export function onAuthStateChange(callback: (session: Session) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      callback(session);
    }
  });
}
