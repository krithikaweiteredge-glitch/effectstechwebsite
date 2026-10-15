"use client";

import { useState } from "react";

// Google Maps is a heavy third-party page that makes scrolling stutter, so it
// only loads when the visitor asks for it.
export default function MapEmbed({ address }: { address: string }) {
  const [open, setOpen] = useState(false);
  const query = encodeURIComponent(address);

  if (open) {
    return (
      <iframe
        title="Effects Tech location on Google Maps"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[420px] w-full border-0"
      />
    );
  }

  return (
    <div data-theme="noir" className="bg-bg text-fg relative flex h-[420px] items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.14),transparent_60%)]" />
      <div className="relative px-5">
        <p className="eyebrow mb-5">The studio</p>
        <p className="font-serif mx-auto max-w-xl text-2xl leading-snug italic sm:text-3xl">{address}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={() => setOpen(true)} className="btn">
            View the map
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-fg"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
