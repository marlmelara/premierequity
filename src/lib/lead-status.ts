// Lead pipeline statuses. `new` is the default the moment a lead is submitted
// (untouched), and the rest are applied from the dashboard. Order here is the
// order shown in filters and the status menu.
export type LeadStatus =
  | "new"
  | "contacted"
  | "negotiating"
  | "offer_sent"
  | "won"
  | "lost";

export type StatusConfig = {
  key: LeadStatus;
  label: string;
  /** Small dot color (solid). */
  dot: string;
  /** Pill badge classes (bg + text + ring). */
  badge: string;
  /** Active filter-pill classes. */
  activePill: string;
};

export const LEAD_STATUSES: StatusConfig[] = [
  {
    key: "new",
    label: "New",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 ring-blue-600/20",
    activePill: "bg-blue-600 text-white ring-blue-600",
  },
  {
    key: "contacted",
    label: "Reached Out",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 ring-amber-600/20",
    activePill: "bg-amber-500 text-white ring-amber-500",
  },
  {
    key: "negotiating",
    label: "Negotiating",
    dot: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700 ring-violet-600/20",
    activePill: "bg-violet-600 text-white ring-violet-600",
  },
  {
    key: "offer_sent",
    label: "Offer Sent",
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-700 ring-sky-600/20",
    activePill: "bg-sky-600 text-white ring-sky-600",
  },
  {
    key: "won",
    label: "Won",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    activePill: "bg-emerald-600 text-white ring-emerald-600",
  },
  {
    key: "lost",
    label: "Lost",
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 ring-rose-600/20",
    activePill: "bg-rose-600 text-white ring-rose-600",
  },
];

export const STATUS_CONFIG: Record<LeadStatus, StatusConfig> = Object.fromEntries(
  LEAD_STATUSES.map((s) => [s.key, s]),
) as Record<LeadStatus, StatusConfig>;

export function isLeadStatus(value: unknown): value is LeadStatus {
  return typeof value === "string" && value in STATUS_CONFIG;
}
