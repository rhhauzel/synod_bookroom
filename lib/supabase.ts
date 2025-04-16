import { createClient } from '@supabase/supabase-js'

const supabaseURL =
  process.env.SYNOD_PUBLIC_SUPABASE_URL ||
  'https://ftxciwqgappahupgtgcp.supabase.co'
const supabaseKey =
  process.env.SYNOD_PUBLIC_SUPABASE_ANON ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0eGNpd3FnYXBwYWh1cGd0Z2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNTU5NzksImV4cCI6MjA1OTkzMTk3OX0.kwPE20NYlsO1lhUn6OrF-e-Lo5zjYDyxBUFbM-z3Enw'

export const supabase = createClient(supabaseURL, supabaseKey)
