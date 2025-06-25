import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'

// Récupère les variables depuis app.json (expo.extra)
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing in app.json')
}

// Initialise le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
