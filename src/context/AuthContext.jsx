import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'resusphere_auth_session_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const session = localStorage.getItem(AUTH_STORAGE_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        // Validate session structure (never store passwords)
        if (parsed && parsed.id && parsed.email) {
          return {
            id: parsed.id,
            name: parsed.name || 'Alex Chen',
            email: parsed.email,
            avatar: parsed.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
            role: parsed.role || 'Senior Software Engineer',
            plan: parsed.plan || 'Pro Engineer',
            provider: parsed.provider || 'email',
            createdAt: parsed.createdAt || '2024-01-15'
          };
        }
      }
    } catch (e) {
      console.warn('[Auth] Failed to restore session from storage:', e);
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'

  // Persist session token profile (excluding any sensitive credentials)
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          plan: user.plan,
          provider: user.provider,
          createdAt: user.createdAt
        }));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('[Auth] Failed to save session:', e);
    }
  }, [user]);

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Sign In with Email & Password
  const login = async (email, password) => {
    setIsLoading(true);
    // Simulate server authentication verification latency
    await new Promise(resolve => setTimeout(resolve, 600));

    // Create session profile (passwords are strictly never stored in localStorage)
    const sessionUser = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Full-Stack Developer',
      plan: 'Pro Engineer',
      provider: 'email',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUser(sessionUser);
    setIsLoading(false);
    setIsAuthModalOpen(false);
    return { success: true, user: sessionUser };
  };

  // Create Account with Name, Email & Password
  const signup = async (name, email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 700));

    const sessionUser = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: name.trim() || 'Alex Chen',
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Software Engineer',
      plan: 'Free Creator',
      provider: 'email',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUser(sessionUser);
    setIsLoading(false);
    setIsAuthModalOpen(false);
    return { success: true, user: sessionUser };
  };

  // Social OAuth (Google / GitHub)
  const loginWithOAuth = async (providerName = 'google') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const isGoogle = providerName.toLowerCase() === 'google';
    const sessionUser = {
      id: `usr_oauth_${Math.random().toString(36).substring(2, 9)}`,
      name: isGoogle ? 'Alex Chen' : 'alexchen-dev',
      email: isGoogle ? 'alex.chen@gmail.com' : 'alex@github.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Senior Full-Stack & AI Engineer',
      plan: 'Pro Engineer',
      provider: providerName.toLowerCase(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUser(sessionUser);
    setIsLoading(false);
    setIsAuthModalOpen(false);
    return { success: true, user: sessionUser };
  };

  // Quick Demo Login for Development Testing
  const demoLogin = (profileType = 'engineer') => {
    const demoUser = {
      id: 'usr_demo_chen',
      name: 'Alex Chen',
      email: 'alex.chen@resusphere.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Senior Full-Stack & AI Engineer',
      plan: 'Enterprise Pro',
      provider: 'demo',
      createdAt: '2024-01-10'
    };

    setUser(demoUser);
    setIsAuthModalOpen(false);
    return demoUser;
  };

  // Sign Out
  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    signup,
    loginWithOAuth,
    demoLogin,
    logout,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,
    // Cloud Auth Provider Status for Transparency
    authProviderConfig: {
      isCloudConfigured: false,
      readyFor: ['Supabase Auth', 'Firebase Auth', 'Auth0', 'Custom JWT Server'],
      mode: 'Local Session Token (Dev Ready)'
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
