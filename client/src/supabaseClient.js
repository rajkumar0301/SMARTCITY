// client/src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qmodnifxglafmjmowspy.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY  // from .env file
export const supabase = createClient(supabaseUrl, supabaseKey)
