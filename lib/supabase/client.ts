import { createClient as createClientLib } from '@supabase/supabase-js'

export function createClient() {
  return createClientLib(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
