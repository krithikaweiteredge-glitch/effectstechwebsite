/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Arrow } from "../ui";

export type MapPin = {
  city: string;
  x: number; // percent of map width
  y: number; // percent of map height
  note: string;
  image: string;
  projects: { title: string; slug: string }[];
};

// Gold pins over a dotted map of India; choosing one opens a card with the
// events staged there.
export default function EventMap({ pins, children }: { pins: MapPin[]; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const pin = pins[active];

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
      <div className="relative mx-auto aspect-square w-full max-w-[640px]">
        {children}
        {pins.map((p, i) => (
          <button
            key={p.city}
            type="button"
            onClick={() => setActive(i)}
            onPointerEnter={() => setActive(i)}
            aria-pressed={active === i}
            aria-label={`${p.city}: ${p.note}`}
            className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span className={`map-ping absolute h-6 w-6 rounded-full border border-[#c9a96e] ${active === i ? "" : "opacity-60"}`} />
            <span
              className={`relative h-3 w-3 rounded-full transition-all duration-500 ${
                active === i ? "scale-150 bg-[#f1dfb4] shadow-[0_0_24px_6px_rgba(201,169,110,0.6)]" : "bg-[#c9a96e]"
              }`}
            />
            <span
              className={`absolute top-full mt-1 text-[10px] tracking-[0.3em] whitespace-nowrap uppercase transition-colors ${
                active === i ? "text-[#f1dfb4]" : "text-white/60"
              }`}
            >
              {p.city}
            </span>
          </button>
        ))}
      </div>

      <div aria-live="polite">
        <div key={pin.city} className="map-card">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={pin.image} alt="" className="grade absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="font-serif foil absolute bottom-4 left-6 text-5xl italic">{pin.city}</p>
          </div>
          <p className="text-muted mt-6 text-[10px] tracking-[0.36em] uppercase">{pin.note}</p>
          <ul className="mt-4">
            {pin.projects.map((pr) => (
              <li key={pr.slug} className="border-line border-b">
                <Link
                  href={`/work/${pr.slug}`}
                  data-cursor="View"
                  className="group hover:text-accent flex items-center justify-between py-4 transition-colors"
                >
                  <span className="font-display text-2xl">{pr.title}</span>
                  <Arrow className="text-accent transition-transform group-hover:translate-x-1.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
