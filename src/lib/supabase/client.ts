import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client for the login form. Persists the session to
// cookies (via @supabase/ssr) so the server and proxy can read it.
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
