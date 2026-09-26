import { createClient } from "@supabase/supabase-js";

// Gunakan NEXT_PUBLIC_ agar bisa dibaca di client maupun server
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  "https://stqaqzchwgvtritwlczk.supabase.co";

// Gunakan Anon Key untuk client umum (BUKAN Service Role Key)
const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  "dummy-key-for-build-time";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);