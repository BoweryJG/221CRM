import React, { createContext, useContext, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithProvider: (provider: 'google' | 'facebook' | 'apple') => Promise<any>;
  signOut: () => Promise<any>;
}

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: false,
  signIn: async () => ({ data: {}, error: null }),
  signInWithProvider: async () => ({ data: {}, error: null }),
  signOut: async () => ({ error: null }),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

// Mock provider without authentication
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create a mock user that's always logged in
  const mockUser = {
    id: 'mock-user-001',
    email: 'user@221bowery.com',
    app_metadata: {},
    user_metadata: {
      full_name: 'Property Manager',
      role: 'Manager',
      company: '221 Bowery Real Estate',
    },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as User;

  const mockSession = {
    access_token: 'mock-token',
    token_type: 'bearer',
    expires_in: 3600,
    refresh_token: 'mock-refresh-token',
    user: mockUser
  } as Session;

  const [user] = useState<User | null>(mockUser);
  const [session] = useState<Session | null>(mockSession);
  const [loading] = useState(false);

  // Mock sign in handler that always succeeds
  const signIn = async (email: string, password: string) => {
    // Always return success
    return { data: { user: mockUser, session: mockSession }, error: null };
  };

  // Mock social login handler that always succeeds
  const signInWithProvider = async (provider: 'google' | 'facebook' | 'apple') => {
    // Always return success
    return { data: { user: mockUser, session: mockSession }, error: null };
  };

  // Mock sign out handler
  const signOut = async () => {
    // Always return success but don't actually sign out
    return { error: null };
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signInWithProvider,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
