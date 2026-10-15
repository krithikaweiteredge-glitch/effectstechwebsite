"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "./ui";
import { verticals, type VerticalSlug } from "@/lib/data";

type Kind = VerticalSlug | "general";
type Field = { name: string; label: string; type?: string; options?: string[]; placeholder?: string };

// Extra questions shown for each enquiry type.
const extras: Record<Kind, Field[]> = {
  general: [{ name: "company", label: "Company / organisation" }],
  experiences: [
    { name: "company", label: "Brand / company" },
    {
      name: "experienceType",
      label: "Type of experience",
      options: ["Brand experience", "Brand activation", "Product launch", "Fashion show", "Live show / concert", "Other"],
    },
    { name: "audience", label: "Expected audience", placeholder: "e.g. 500" },
    { name: "date", label: "Tentative date", type: "date" },
  ],
  "meetings-events": [
    { name: "company", label: "Company" },
    {
      name: "eventType",
      label: "Event type",
      options: ["Conference / summit", "Corporate meeting", "Exhibition", "Incentive travel", "Awards / annual day", "Other"],
    },
    { name: "delegates", label: "Number of delegates", placeholder: "e.g. 250" },
    { name: "destination", label: "City / destination" },
    { name: "date", label: "Tentative date", type: "date" },
  ],
  weddings: [
    { name: "destination", label: "Preferred destination", placeholder: "e.g. Udaipur" },
    { name: "guests", label: "Approximate guest count", placeholder: "e.g. 300" },
    { name: "date", label: "Wedding date (tentative)", type: "date" },
    {
      name: "services",
      label: "What do you need?",
      options: ["Full planning & production", "Décor & production only", "Hospitality & guest management", "Not sure yet"],
    },
  ],
};

export default function EnquiryForm({ initial = "general" }: { initial?: Kind }) {
  const [kind, setKind] = useState<Kind>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? ""))) next.email = "Please enter a valid email address.";
    if (String(data.get("phone") ?? "").replace(/\D/g, "").length < 8) next.phone = "Please enter a valid phone number.";
    setErrors(next);
    if (Object.keys(next).length) {
      (e.currentTarget.elements.namedItem(Object.keys(next)[0]) as HTMLElement | null)?.focus();
      return;
    }
    // Frontend only for now: the enquiry is not sent anywhere yet.
    // Connect this to the email / CRM endpoint when the backend is added.
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="border-accent border p-10 text-center">
        <p className="eyebrow mb-4">Thank you</p>
        <h3 className="font-serif text-4xl italic">Your enquiry has been received.</h3>
        <p className="text-muted mx-auto mt-4 max-w-md leading-relaxed">
          Our team will get back to you shortly. For anything urgent, please call us directly.
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-8">
          Send another enquiry
        </button>
      </div>
    );
  }

  const text = (f: Field, required = false) => (
    <div key={f.name}>
      <label htmlFor={f.name} className="text-muted mb-1 block text-[10px] tracking-[0.32em] uppercase">
        {f.label} {required && <span className="text-accent">*</span>}
      </label>
      {f.options ? (
        <select id={f.name} name={f.name} defaultValue="" className="field [&>option]:text-black">
          <option value="" disabled>
            Select
          </option>
          {f.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          id={f.name}
          name={f.name}
          type={f.type ?? "text"}
          placeholder={f.placeholder}
          aria-required={required || undefined}
          aria-invalid={errors[f.name] ? true : undefined}
          aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
          className="field"
        />
      )}
      {errors[f.name] && (
        <p id={`${f.name}-error`} role="alert" className="mt-2 text-sm text-red-500">
          {errors[f.name]}
        </p>
      )}
    </div>
  );

  const tabs: { id: Kind; label: string }[] = [
    { id: "general", label: "General" },
    ...verticals.map((v) => ({ id: v.slug as Kind, label: v.short })),
  ];

  return (
    <form onSubmit={onSubmit} noValidate>
      <fieldset className="mb-10">
        <legend className="font-serif mb-6 text-3xl italic">What is your enquiry about?</legend>
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <label
              key={t.id}
              className={`flex min-h-11 cursor-pointer items-center border px-5 text-[10px] tracking-[0.32em] uppercase transition-colors duration-300 has-[:focus-visible]:outline-2 ${
                kind === t.id ? "bg-accent text-on-accent border-accent" : "border-line hover:border-accent"
              }`}
            >
              <input
                type="radio"
                name="enquiryType"
                value={t.id}
                checked={kind === t.id}
                onChange={() => setKind(t.id)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {text({ name: "name", label: "Full name" }, true)}
        {text({ name: "email", label: "Email", type: "email" }, true)}
        {text({ name: "phone", label: "Phone", type: "tel" }, true)}
        {extras[kind].map((f) => text(f))}
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="text-muted mb-1 block text-[10px] tracking-[0.32em] uppercase">
          Tell us about your {kind === "weddings" ? "celebration" : "project"}
        </label>
        <textarea id="message" name="message" rows={5} className="field resize-y" />
      </div>

      <button type="submit" className="btn mt-8 w-full sm:w-auto">
        Send enquiry <Arrow />
      </button>
    </form>
  );
}
