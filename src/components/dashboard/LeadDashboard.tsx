"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  LEAD_STATUSES,
  STATUS_CONFIG,
  isLeadStatus,
  type LeadStatus,
} from "@/lib/lead-status";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  acres: string;
  address: string;
  reason: string | null;
  created_at: string;
  status: LeadStatus;
  status_updated_at: string | null;
};

type RawLead = Omit<Lead, "status"> & { status?: string | null };

function normalize(rows: RawLead[]): Lead[] {
  return rows.map((r) => ({
    ...r,
    status: isLeadStatus(r.status) ? r.status : "new",
  }));
}

function fullDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function timeAgo(iso: string | null) {
  if (!iso) return null;
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function LeadDashboard({ initialLeads }: { initialLeads: RawLead[] }) {
  const [leads, setLeads] = useState<Lead[]>(() => normalize(initialLeads));
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length };
    for (const s of LEAD_STATUSES) c[s.key] = 0;
    for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
    return c;
  }, [leads]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (!q) return true;
      return [l.name, l.email, l.phone, l.address, l.reason ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [leads, filter, query]);

  async function changeStatus(id: string, next: LeadStatus) {
    const prev = leads.find((l) => l.id === id);
    if (!prev || prev.status === next) return;

    setBusyId(id);
    setError(null);
    const optimisticTime = new Date().toISOString();
    setLeads((ls) =>
      ls.map((l) =>
        l.id === id ? { ...l, status: next, status_updated_at: optimisticTime } : l,
      ),
    );

    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("leads")
      .update({ status: next })
      .eq("id", id)
      .select("id,status,status_updated_at")
      .single();

    if (error) {
      // Revert on failure.
      setLeads((ls) => ls.map((l) => (l.id === id ? prev : l)));
      setError(
        "Couldn't save that change. If this keeps happening, the database may still need the status update — check the setup SQL.",
      );
    } else if (data) {
      setLeads((ls) =>
        ls.map((l) =>
          l.id === id
            ? { ...l, status: (data.status as LeadStatus) ?? next, status_updated_at: data.status_updated_at }
            : l,
        ),
      );
    }
    setBusyId(null);
  }

  async function deleteLead(id: string) {
    setDeletingId(id);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      setError(
        "Couldn't delete that lead. If this keeps happening, the database may still need the delete permission — check the setup SQL.",
      );
    } else {
      setLeads((ls) => ls.filter((l) => l.id !== id));
    }
    setDeletingId(null);
    setConfirmingId(null);
  }

  return (
    <div className="space-y-6">
      {/* Toolbar: filters + search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="All"
            count={counts.all}
            active={filter === "all"}
            onClick={() => setFilter("all")}
            activeClasses="bg-forest text-white ring-forest"
          />
          {LEAD_STATUSES.map((s) => (
            <FilterPill
              key={s.key}
              label={s.label}
              count={counts[s.key] ?? 0}
              dot={s.dot}
              active={filter === s.key}
              onClick={() => setFilter(s.key)}
              activeClasses={s.activePill}
            />
          ))}
        </div>

        <div className="relative lg:w-72">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, address…"
            className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-9 pr-3 text-sm text-neutral-800 outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center text-neutral-500">
          {leads.length === 0
            ? "No submissions yet. New leads from the site will appear here."
            : "No leads match this filter."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-500">
              <tr>
                <Th>Status</Th>
                <Th>Name</Th>
                <Th>Contact</Th>
                <Th>Acres</Th>
                <Th>Address / Parcel</Th>
                <Th>Reason</Th>
                <Th>Submitted</Th>
                <Th>Updated</Th>
                <th className="px-4 py-3" aria-label="Actions" />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {filtered.map((lead) => (
                <tr key={lead.id} className="align-top transition-colors hover:bg-neutral-50/70">
                  <td className="px-4 py-3">
                    <StatusMenu
                      value={lead.status}
                      busy={busyId === lead.id}
                      onChange={(next) => changeStatus(lead.id, next)}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900">{lead.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <a href={`mailto:${lead.email}`} className="text-forest hover:underline">
                        {lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="text-neutral-500 hover:underline">
                        {lead.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">{lead.acres}</td>
                  <td className="px-4 py-3">{lead.address}</td>
                  <td className="max-w-xs px-4 py-3 text-neutral-500">{lead.reason ?? "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-neutral-500" title={fullDate(lead.created_at)}>
                    {new Date(lead.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td
                    className="whitespace-nowrap px-4 py-3 text-neutral-500"
                    title={lead.status_updated_at ? fullDate(lead.status_updated_at) : "Not updated yet"}
                    suppressHydrationWarning
                  >
                    {timeAgo(lead.status_updated_at) ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    {confirmingId === lead.id ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="text-xs text-neutral-500">Delete?</span>
                        <button
                          type="button"
                          onClick={() => deleteLead(lead.id)}
                          disabled={deletingId === lead.id}
                          className="rounded-md bg-rose-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-rose-700 disabled:opacity-60"
                        >
                          {deletingId === lead.id ? "Deleting…" : "Yes"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingId(null)}
                          className="rounded-md px-2 py-1 text-xs font-medium text-neutral-500 transition hover:bg-neutral-100"
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmingId(lead.id)}
                        aria-label={`Delete lead from ${lead.name}`}
                        className="rounded-lg p-2 text-neutral-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <svg
                          className="h-[18px] w-[18px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6l-.84 13.1A2 2 0 0 1 16.16 21H7.84a2 2 0 0 1-2-1.9L5 6" />
                          <path d="M10 11v5M14 11v5" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-neutral-400">
        Showing {filtered.length} of {leads.length} {leads.length === 1 ? "lead" : "leads"}.
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">{children}</th>;
}

function FilterPill({
  label,
  count,
  dot,
  active,
  onClick,
  activeClasses,
}: {
  label: string;
  count: number;
  dot?: string;
  active: boolean;
  onClick: () => void;
  activeClasses: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition ${
        active
          ? activeClasses
          : "bg-white text-neutral-600 ring-neutral-300 hover:bg-neutral-50"
      }`}
    >
      {dot && <span className={`h-2 w-2 rounded-full ${active ? "bg-white/90" : dot}`} />}
      {label}
      <span className={`text-xs ${active ? "text-white/80" : "text-neutral-400"}`}>{count}</span>
    </button>
  );
}

function StatusMenu({
  value,
  busy,
  onChange,
}: {
  value: LeadStatus;
  busy: boolean;
  onChange: (next: LeadStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const cfg = STATUS_CONFIG[value];

  function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setCoords({ top: r.bottom + 6, left: r.left });
    setOpen(true);
  }

  // The menu is portaled to <body> so the table's horizontal-scroll container
  // can't clip it. Close it on outside click, scroll, resize, or Escape.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        disabled={busy}
        onClick={toggle}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 transition ${cfg.badge} ${busy ? "opacity-60" : "hover:brightness-95"}`}
      >
        <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
        {cfg.label}
        <svg className="h-3 w-3 opacity-60" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", top: coords.top, left: coords.left }}
            className="z-50 w-44 overflow-hidden rounded-xl border border-neutral-200 bg-white p-1 shadow-lg"
          >
            {LEAD_STATUSES.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => {
                  onChange(s.key);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-neutral-700 transition hover:bg-neutral-100"
              >
                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                <span className="flex-1">{s.label}</span>
                {s.key === value && (
                  <svg className="h-4 w-4 text-forest" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
