// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars not set — sync disabled')
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

export const isSupabaseConfigured = () => !!supabaseUrl && !!supabaseAnonKey
