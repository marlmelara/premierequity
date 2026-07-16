import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { BrandMark } from "@/components/BrandMark";

export const metadata = {
  title: "Lead Dashboard | Premier Equity",
  robots: { index: false, follow: false },
};

// Always render fresh — this reads per-request auth + live data.
export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  acres: string;
  address: string;
  reason: string | null;
  created_at: string;
};

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
    <main className="min-h-screen bg-neutral-50">
      <header className="flex items-center justify-between border-b border-forest/10 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <BrandMark size={36} />
          <div className="leading-tight">
            <p className="font-heading font-semibold text-forest">Lead Dashboard</p>
            <p className="text-xs text-forest/60">{user.email}</p>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg border border-forest/20 px-4 py-2 text-sm font-medium text-forest transition hover:bg-forest hover:text-white"
          >
            Sign Out
          </button>
        </form>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {!isAdmin ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
            This account isn&apos;t authorized to view leads. Ask an administrator
            to add <span className="font-medium">{user.email}</span> to the admin
            list.
          </div>
        ) : (
          <LeadsTable />
        )}
      </div>
    </main>
  );
}

async function LeadsTable() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load submissions: {error.message}
      </div>
    );
  }

  const leads = (data ?? []) as Lead[];

  return (
    <>
      <div className="mb-4 flex items-baseline justify-between">
        <h1 className="font-heading text-2xl font-semibold text-forest">
          Submissions
        </h1>
        <span className="text-sm text-forest/60">
          {leads.length} total
        </span>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-xl border border-forest/10 bg-white p-10 text-center text-forest/60">
          No submissions yet. New leads from the site will appear here.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-forest/10 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-forest/10 bg-forest/5 text-forest">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Acres</th>
                <th className="px-4 py-3 font-semibold">Address / Parcel</th>
                <th className="px-4 py-3 font-semibold">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5 text-forest/90">
              {leads.map((lead) => (
                <tr key={lead.id} className="align-top hover:bg-forest/[0.02]">
                  <td className="whitespace-nowrap px-4 py-3 text-forest/60">
                    {new Date(lead.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-forest underline-offset-2 hover:underline"
                    >
                      {lead.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-forest underline-offset-2 hover:underline"
                    >
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">{lead.acres}</td>
                  <td className="px-4 py-3">{lead.address}</td>
                  <td className="px-4 py-3 text-forest/70">{lead.reason ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
