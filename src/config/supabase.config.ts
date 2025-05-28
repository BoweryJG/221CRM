// Supabase configuration with support for multiple projects

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// Main 221CRM Supabase instance
export const mainSupabaseConfig: SupabaseConfig = {
  url: process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co',
  anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key',
};

// Sphere OS Supabase instance (for maintenance requests)
export const sphereOsSupabaseConfig: SupabaseConfig = {
  url: process.env.REACT_APP_SPHERE_OS_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co',
  anonKey: process.env.REACT_APP_SPHERE_OS_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key',
};

// Function to validate config
export const validateSupabaseConfig = (config: SupabaseConfig): boolean => {
  return !!(config.url && config.anonKey && 
    config.url.includes('supabase.co') && 
    config.anonKey.length > 0);
};

// Get the appropriate config based on the service
export const getSupabaseConfig = (service: 'main' | 'sphereOs' = 'main'): SupabaseConfig => {
  if (service === 'sphereOs' && 
      process.env.REACT_APP_SPHERE_OS_SUPABASE_URL && 
      process.env.REACT_APP_SPHERE_OS_SUPABASE_ANON_KEY) {
    return sphereOsSupabaseConfig;
  }
  return mainSupabaseConfig;
};