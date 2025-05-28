import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing!');
  console.error('REACT_APP_SUPABASE_URL:', supabaseUrl);
  console.error('REACT_APP_SUPABASE_ANON_KEY:', supabaseAnonKey ? '[REDACTED]' : undefined);
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Export auth-related utility functions
export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};
