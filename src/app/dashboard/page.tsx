import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { BrandMark } from "@/components/BrandMark";
import { LeadDashboard } from "@/components/dashboard/LeadDashboard";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

export const metadata = {
  title: "Lead Dashboard | Premier Equity",
  robots: { index: false, follow: false },
};

// Always render fresh — this reads per-request auth + live data.
export const dynamic = "force-dynamic";

async function signOut() {
  "use server";
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  // Verify auth inside the page itself (proxy is not a sufficient boundary).
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="flex items-center justify-between border-b border-forest/10 bg-white px-6 py-4 dark:border-white/10 dark:bg-neutral-900">
        <div className="flex items-center gap-3">
          <span className="dark:hidden">
            <BrandMark size={36} />
          </span>
          <span className="hidden dark:inline">
            <BrandMark size={36} light />
          </span>
          <div className="leading-tight">
            <p className="font-heading font-semibold text-forest dark:text-white">Lead Dashboard</p>
            <p className="text-xs text-forest/60 dark:text-neutral-400">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-forest/20 px-4 py-2 text-sm font-medium text-forest transition hover:bg-forest hover:text-white dark:border-white/15 dark:text-neutral-200 dark:hover:bg-white dark:hover:text-neutral-900"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {!isAdmin ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            This account isn&apos;t authorized to view leads. Ask an administrator
            to add <span className="font-medium">{user.email}</span> to the admin
            list.
          </div>
        ) : (
          <Submissions />
        )}
      </div>
    </main>
  );
}

async function Submissions() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
        Failed to load submissions: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-semibold text-forest dark:text-white">Submissions</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Label each lead as you work it — changes are timestamped automatically.
        </p>
      </div>
      <LeadDashboard initialLeads={data ?? []} />
    </>
  );
}
