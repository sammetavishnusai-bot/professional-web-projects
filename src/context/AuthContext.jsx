import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { dataStorageService } from '../services/dataStorageService';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'resusphere_auth_session_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup' | 'forgot'

  // 1. Initialize session from Supabase (or fallback to local session) on mount
  useEffect(() => {
    let subscription = null;

    async function initAuth() {
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (!error && data?.session) {
            setSession(data.session);
            mapSupabaseUser(data.session.user);
          }
        } catch (e) {
          console.warn('[Auth] Supabase session retrieval failed, checking local:', e.message);
        }

        // Listen to live Supabase Auth state changes
        try {
          const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
            setSession(newSession);
            if (newSession?.user) {
              mapSupabaseUser(newSession.user);
            } else if (_event === 'SIGNED_OUT') {
              setUser(null);
              localStorage.removeItem(AUTH_STORAGE_KEY);
            }
          });
          subscription = authListener?.subscription;
        } catch (err) {
          console.warn('[Auth] Error setting up auth listener:', err.message);
        }
      } else {
        // Fallback: Restore from local session
        try {
          const saved = localStorage.getItem(AUTH_STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.id && parsed.email) {
              setUser(parsed);
            }
          }
        } catch (e) {
          console.warn('[Auth] Failed to restore local session:', e);
        }
      }

      setIsLoading(false);
    }

    initAuth();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Helper to map Supabase user object to unified user profile
  const mapSupabaseUser = (sbUser) => {
    const profile = {
      id: sbUser.id,
      name: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'User',
      email: sbUser.email,
      avatar: sbUser.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: sbUser.user_metadata?.role || 'Full-Stack Developer',
      plan: 'Pro Engineer',
      provider: sbUser.app_metadata?.provider || 'email',
      createdAt: sbUser.created_at?.split('T')[0] || new Date().toISOString().split('T')[0]
    };
    setUser(profile);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    // Also ensure profile record exists in DB
    dataStorageService.upsertProfile(sbUser.id, profile);
    return profile;
  };

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

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        if (error) throw error;

        const profile = mapSupabaseUser(data.user);
        setIsLoading(false);
        setIsAuthModalOpen(false);
        return { success: true, user: profile };
      } catch (err) {
        setIsLoading(false);
        throw new Error(err.message || 'Invalid email or password.');
      }
    }

    // Local Mock / Demo Fallback when Supabase is unconfigured
    await new Promise(resolve => setTimeout(resolve, 500));
    const sessionUser = {
      id: `usr_${email.replace(/[^a-z0-9]/gi, '_')}`,
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Full-Stack Developer',
      plan: 'Pro Engineer',
      provider: 'email',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUser(sessionUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
    setIsLoading(false);
    setIsAuthModalOpen(false);
    return { success: true, user: sessionUser };
  };

  // Create Account with Name, Email & Password
  const signup = async (name, email, password) => {
    setIsLoading(true);

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim()
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          const profile = mapSupabaseUser(data.user);
          setIsLoading(false);
          setIsAuthModalOpen(false);
          return { success: true, user: profile };
        }
      } catch (err) {
        setIsLoading(false);
        throw new Error(err.message || 'Failed to create account.');
      }
    }

    // Local Mock / Demo Fallback
    await new Promise(resolve => setTimeout(resolve, 600));
    const sessionUser = {
      id: `usr_${email.replace(/[^a-z0-9]/gi, '_')}`,
      name: name.trim() || 'Alex Chen',
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'Software Engineer',
      plan: 'Free Creator',
      provider: 'email',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUser(sessionUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
    setIsLoading(false);
    setIsAuthModalOpen(false);
    return { success: true, user: sessionUser };
  };

  // Password Reset Request
  const resetPassword = async (email) => {
    setIsLoading(true);
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
        setIsLoading(false);
        if (error) throw error;
        return { success: true, message: 'Password reset link sent to your email.' };
      } catch (err) {
        setIsLoading(false);
        throw new Error(err.message || 'Failed to send password reset email.');
      }
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    setIsLoading(false);
    return { success: true, message: 'Password reset simulation sent to email.' };
  };

  // Social OAuth
  const loginWithOAuth = async (providerName = 'google') => {
    setIsLoading(true);

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: providerName.toLowerCase()
        });
        if (error) throw error;
        return;
      } catch (err) {
        setIsLoading(false);
        throw new Error(err.message || `Failed to authenticate with ${providerName}`);
      }
    }

    // Local Demo OAuth
    await new Promise(resolve => setTimeout(resolve, 400));
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
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
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
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
    setIsAuthModalOpen(false);
    return demoUser;
  };

  // Sign Out
  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('[Auth] Supabase signOut error:', err.message);
      }
    }
    setUser(null);
    setSession(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = {
    user,
    session,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    signup,
    resetPassword,
    loginWithOAuth,
    demoLogin,
    logout,
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,
    isCloudAuth: isSupabaseConfigured()
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
