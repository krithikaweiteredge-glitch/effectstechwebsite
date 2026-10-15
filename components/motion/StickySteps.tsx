/* eslint-disable @next/next/no-img-element */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

type Step = { title: string; text: string; image: string };

// The method: a sticky photograph and counter on the left change as each
// step on the right scrolls through the middle of the screen.
export default function StickySteps({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setCurrent(i),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="grid gap-12 lg:grid-cols-2 lg:gap-24">
      <div className="hidden lg:block">
        <div className="sticky top-28">
          {/* Sized to the viewport so the counter is never pushed off-screen. */}
          <div
            className="relative h-[calc(100svh-10rem)] max-h-[820px] overflow-hidden"
            style={{ ["--accent" as string]: "#c9a96e", ["--accent-2" as string]: "#f1dfb4" }}
          >
            {steps.map((s, i) => (
              <img
                key={i}
                src={s.image}
                alt=""
                className={`grade absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                  i === current ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <p className="font-serif foil absolute bottom-8 left-8 pr-3 text-8xl leading-none italic">
              {String(current + 1).padStart(2, "0")}
            </p>
            <p className="absolute right-8 bottom-10 text-[10px] tracking-[0.36em] text-white/70 uppercase">
              of {String(steps.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>

      <ol>
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-step
            className={`border-line border-t py-14 transition-opacity duration-700 lg:min-h-[60vh] lg:py-20 ${
              i === current ? "opacity-100" : "lg:opacity-30"
            }`}
          >
            <p className="text-accent text-[10px] tracking-[0.4em] uppercase">Step {String(i + 1).padStart(2, "0")}</p>
            <h3 className="display mt-5 text-4xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">{s.title}</h3>
            <p className="text-muted mt-6 max-w-md text-lg leading-loose">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
