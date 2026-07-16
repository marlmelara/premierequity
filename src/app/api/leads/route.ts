import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseClient } from "@/lib/supabase";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  acres?: string;
  address?: string;
  reason?: string;
};

const REQUIRED_FIELDS: (keyof LeadPayload)[] = ["name", "email", "phone", "acres", "address"];

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body[field]?.toString().trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const lead = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    acres: body.acres!.trim(),
    address: body.address!.trim(),
    reason: body.reason?.trim() || null,
  };

  const supabase = getSupabaseClient();
  const { error } = await supabase.from("leads").insert(lead);

  if (error) {
    console.error("Failed to save lead:", error.message);
    return NextResponse.json({ error: "Failed to save your submission." }, { status: 500 });
  }

  if (process.env.LEADS_EMAIL_NOTIFICATIONS === "true") {
    await sendLeadNotification(lead).catch((err) => {
      console.error("Lead was saved, but the notification email failed:", err);
    });
  }

  return NextResponse.json({ success: true });
}

async function sendLeadNotification(lead: Required<Omit<LeadPayload, "reason">> & { reason: string | null }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    console.warn(
      "LEADS_EMAIL_NOTIFICATIONS is on, but RESEND_API_KEY or LEADS_NOTIFICATION_EMAIL is missing.",
    );
    return;
  }

  const resend = new Resend(apiKey);

  // Uses Resend's shared sandbox sender until a custom domain is verified:
  // https://resend.com/docs/dashboard/domains/introduction
  const from = process.env.LEADS_FROM_EMAIL || "Premier Equity Leads <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    subject: `New land lead: ${lead.name}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Property size (acres): ${lead.acres}`,
      `Property address / parcel ID: ${lead.address}`,
      `Reason for selling: ${lead.reason ?? "—"}`,
    ].join("\n"),
  });
}
