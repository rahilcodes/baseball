import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase admin client using the SERVICE_ROLE key.
 * NEVER import this in a client component — it bypasses ALL RLS.
 * Use only in:
 *  - Server components (app/manage/*, lib/data.ts)
 *  - API routes (app/api/*)
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
