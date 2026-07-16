"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({
  heading = "Get Your Free Cash Offer Today",
  idPrefix,
}: {
  heading?: string;
  idPrefix: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <h3 className="font-heading text-2xl font-semibold text-forest">
          Thanks — we&apos;ve got it!
        </h3>
        <p className="mt-3 text-neutral-600">
          A member of the Premier Equity team will reach out shortly with your
          cash offer.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow-xl space-y-4"
    >
      <h3 className="font-heading text-2xl font-semibold text-neutral-900">
        {heading}
      </h3>

      <Field id={`${idPrefix}-name`} name="name" label="Full Name" required />

      <div className="grid grid-cols-2 gap-4">
        <Field id={`${idPrefix}-email`} name="email" type="email" label="Email" required />
        <Field id={`${idPrefix}-phone`} name="phone" type="tel" label="Phone" required />
      </div>

      <Field id={`${idPrefix}-acres`} name="acres" label="Property Size (Acres)" required />
      <Field
        id={`${idPrefix}-address`}
        name="address"
        label="Property Address or Parcel ID"
        required
      />

      <div>
        <label
          htmlFor={`${idPrefix}-reason`}
          className="block text-sm font-medium text-neutral-800 mb-1"
        >
          Reason for Selling
        </label>
        <textarea
          id={`${idPrefix}-reason`}
          name="reason"
          rows={3}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-olive px-6 py-3 font-semibold text-white transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Get Your Cash Offer"}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-800 mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive"
      />
    </div>
  );
}
