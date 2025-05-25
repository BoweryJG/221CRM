import React, { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';

// Mock authentication context that doesn't require actual authentication
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
}

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: false,
  signIn: async () => ({ data: {}, error: null }),
  signOut: async () => ({ error: null }),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

// Mock provider that doesn't actually authenticate
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock values that simulate a logged-in user without actual authentication
  const mockUser = {
    id: 'mock-user-id',
    email: 'user@example.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as User;

  const value = {
    session: { user: mockUser } as Session,
    user: mockUser,
    loading: false,
    signIn: async () => ({ data: {}, error: null }),
    signOut: async () => ({ error: null }),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
