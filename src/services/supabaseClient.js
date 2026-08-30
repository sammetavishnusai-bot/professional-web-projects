/**
 * Supabase Client Configuration (Browser / Frontend)
 * Initializes Supabase using ONLY public environment variables (URL and ANON KEY).
 * NEVER includes or references the service-role secret key.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Safe configuration check
 */
export function isSupabaseConfigured() {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key'
  );
}

/**
 * Initialized Supabase Client instance (or null if unconfigured)
 */
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;
