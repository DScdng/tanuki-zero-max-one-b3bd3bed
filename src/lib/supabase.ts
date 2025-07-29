import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug: Check if environment variables are available
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing!')
  console.error('Available env vars:', Object.keys(import.meta.env))
  throw new Error('Supabase is not properly configured. Please ensure the Supabase integration is connected.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface FeedbackSubmission {
  id?: number
  created_at?: string
  name?: string
  sandwich_type: string
  feedback: string
}