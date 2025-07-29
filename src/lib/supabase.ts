import { supabase as supabaseClient } from '@/integrations/supabase/client'

// Use the auto-generated client
export const supabase = supabaseClient
export const isSupabaseConfigured = true

// Database types
export interface FeedbackSubmission {
  id?: number
  created_at?: string
  name?: string
  sandwich_type: string
  feedback: string
}