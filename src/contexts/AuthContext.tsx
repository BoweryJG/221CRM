import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';

// Mock authentication context that doesn't require actual authentication
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

// Authorized users list
const AUTHORIZED_USERS = [
  {
    email: 'doug.mino@221bowery.com',
    name: 'Doug Mino',
    role: 'Property Manager',
    id: 'doug-mino-001'
  },
  {
    email: 'jason.golden@221bowery.com', 
    name: 'Jason Golden',
    role: 'System Administrator',
    id: 'jason-golden-001'
  },
  // Additional authorized email for Jason
  {
    email: 'jason@cascadeprojects.com',
    name: 'Jason Golden', 
    role: 'System Administrator',
    id: 'jason-golden-001'
  },
  // Social login variants for Doug
  {
    email: 'doug.mino@gmail.com',
    name: 'Doug Mino',
    role: 'Property Manager',
    id: 'doug-mino-001'
  },
  {
    email: 'doug.mino@facebook.com',
    name: 'Doug Mino', 
    role: 'Property Manager',
    id: 'doug-mino-001'
  },
  {
    email: 'doug.mino@icloud.com',
    name: 'Doug Mino',
    role: 'Property Manager', 
    id: 'doug-mino-001'
  }
];

// Mock provider that doesn't actually authenticate
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem('221crm_session');
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        setSession(parsedSession);
        setUser(parsedSession.user);
      } catch (error) {
        console.error('Error parsing stored session:', error);
        localStorage.removeItem('221crm_session');
      }
    }
    setLoading(false);
  }, []);

  // Sign in handler
  const signIn = async (email: string, password: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    const authorizedUser = AUTHORIZED_USERS.find(u => u.email === normalizedEmail);
    
    if (!authorizedUser) {
      return { data: null, error: new Error('Unauthorized user') };
    }

    const mockUser = {
      id: authorizedUser.id,
      email: authorizedUser.email,
      app_metadata: {},
      user_metadata: {
        full_name: authorizedUser.name,
        role: authorizedUser.role,
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

    setUser(mockUser);
    setSession(mockSession);
    localStorage.setItem('221crm_session', JSON.stringify(mockSession));

    return { data: { user: mockUser, session: mockSession }, error: null };
  };

  // Mock social login handler
  const signInWithProvider = async (provider: 'google' | 'facebook' | 'apple') => {
    // Simulate OAuth flow
    console.log(`Signing in with ${provider}`);
    
    // For demo, we'll only allow Doug Mino's social accounts
    const socialEmail = provider === 'google' ? 'doug.mino@gmail.com' : 
                       provider === 'facebook' ? 'doug.mino@facebook.com' : 
                       'doug.mino@icloud.com';
    
    const authorizedUser = AUTHORIZED_USERS.find(u => u.email === socialEmail);
    
    if (!authorizedUser) {
      return { data: null, error: new Error('Unauthorized social account') };
    }

    const socialUser = {
      id: authorizedUser.id,
      email: authorizedUser.email,
      app_metadata: {},
      user_metadata: {
        full_name: authorizedUser.name,
        role: authorizedUser.role,
        company: '221 Bowery Real Estate',
        provider,
        avatar_url: provider === 'google' 
          ? 'https://lh3.googleusercontent.com/a/default-user' 
          : provider === 'facebook'
          ? 'https://graph.facebook.com/v2.6/default/picture'
          : 'https://appleid.apple.com/default-avatar',
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as User;
    
    const socialSession = { 
      access_token: 'mock-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
      user: socialUser 
    } as Session;

    setUser(socialUser);
    setSession(socialSession);
    localStorage.setItem('221crm_session', JSON.stringify(socialSession));

    return { 
      data: { 
        user: socialUser, 
        session: socialSession
      }, 
      error: null 
    };
  };

  // Sign out handler
  const signOut = async () => {
    setUser(null);
    setSession(null);
    localStorage.removeItem('221crm_session');
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
