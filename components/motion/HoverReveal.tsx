/* eslint-disable @next/next/no-img-element */
"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "../ui";

type Item = { title: string; text: string; image: string; href?: string };

// An editorial index: hovering a row floats its photograph beside the pointer.
export default function HoverReveal({ items }: { items: Item[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = float.current;
    const box = wrap.current;
    if (!el || !box || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      x(e.clientX - r.left);
      y(e.clientY - r.top);
    };
    box.addEventListener("pointermove", move);
    return () => box.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={wrap} className="relative" onPointerLeave={() => setActive(null)}>
      <ul className="border-line border-t">
        {items.map((item, i) => {
          const row = (
            <div className="flex items-baseline gap-6 py-8 sm:gap-10 sm:py-10">
              <span className="font-serif text-accent w-10 shrink-0 text-xl italic">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1">
                <h3
                  className={`display text-3xl transition-all duration-700 sm:text-5xl lg:text-6xl ${
                    active !== null && active !== i ? "opacity-25" : ""
                  } ${active === i ? "text-accent italic lg:translate-x-6" : ""}`}
                >
                  {item.title}
                </h3>
                <p className="text-muted mt-3 max-w-xl text-sm leading-relaxed">{item.text}</p>
              </div>
              {item.href && <Arrow className="text-accent hidden shrink-0 sm:block" />}
            </div>
          );
          return (
            <li key={item.title} className="border-line border-b" onPointerEnter={() => setActive(i)}>
              {item.href ? (
                <Link href={item.href} data-cursor="Enter" className="block cursor-pointer">
                  {row}
                </Link>
              ) : (
                row
              )}
            </li>
          );
        })}
      </ul>

      <div
        ref={float}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 hidden h-[340px] w-[260px] -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        {items.map((item, i) => (
          <img
            key={i}
            src={item.image}
            alt=""
            className={`grade absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
              active === i ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-6 opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
