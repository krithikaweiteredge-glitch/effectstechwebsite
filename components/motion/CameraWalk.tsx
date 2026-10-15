/* eslint-disable @next/next/no-img-element */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Frame = { image: string; caption: string };

const SPACING = 1100; // px of depth between frames

// A walk through the archive: frames hang in 3D space and the camera glides
// forward as you scroll, passing each photograph like a gallery corridor.
export default function CameraWalk({ frames }: { frames: Frame[] }) {
  const section = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("walk-static");
      return;
    }
    const items = gsap.utils.toArray<HTMLElement>("[data-frame]", el);
    const outro = el.querySelector<HTMLElement>("[data-outro]")!;
    const intro = el.querySelector<HTMLElement>("[data-intro]")!;
    const depth = (frames.length + 1) * SPACING;

    const render = (progress: number) => {
      const cam = progress * depth;
      gsap.set(world.current, { z: cam });
      items.forEach((item, i) => {
        const rel = -(i + 1) * SPACING + cam; // distance in front of the camera (negative = ahead)
        const fadeIn = gsap.utils.clamp(0, 1, gsap.utils.mapRange(-4200, -2600, 0, 1, rel));
        const fadeOut = gsap.utils.clamp(0, 1, gsap.utils.mapRange(150, 650, 1, 0, rel));
        // Frames stay hidden until the intro title has cleared, so nothing sits over it.
        const afterIntro = gsap.utils.clamp(0, 1, (progress - 0.06) * 12);
        item.style.opacity = String(Math.min(fadeIn, fadeOut, afterIntro));
      });
      intro.style.opacity = String(gsap.utils.clamp(0, 1, 1 - progress * 9));
      outro.style.opacity = String(gsap.utils.clamp(0, 1, (progress - 0.88) * 9));
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: () => `+=${frames.length * 520}`,
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => render(self.progress),
    });
    render(0);
    return () => st.kill();
  }, [frames.length]);

  return (
    <section ref={section} data-theme="noir" className="walk relative h-svh overflow-hidden bg-black text-white" aria-label="A walk through our events">
      <div className="walk-stage absolute inset-0">
        <div ref={world} className="walk-world absolute top-1/2 left-1/2">
          {frames.map((f, i) => {
            const side = i % 2 ? 1 : -1;
            const x = side * (18 + (i % 3) * 6); // vw from centre
            const y = ((i * 37) % 22) - 11; // vh from centre
            return (
              <figure
                key={i}
                data-frame
                className="walk-frame absolute"
                style={{ transform: `translate3d(${x}vw, ${y}vh, ${-(i + 1) * SPACING}px) translate(-50%, -50%)` }}
              >
                <img src={f.image} alt={f.caption} loading="lazy" className="grade block aspect-[4/3] w-full object-cover" />
                <figcaption className="mt-3 text-[10px] tracking-[0.36em] text-white/70 uppercase">
                  <span className="text-[#c9a96e]">{String(i + 1).padStart(2, "0")}</span> — {f.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div data-intro className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <p className="eyebrow mb-6 text-[#e8d3a2]">The gallery</p>
        <h2 className="display px-5 text-4xl sm:text-6xl lg:text-7xl">
          Walk through <em className="foil italic">our world</em>
        </h2>
        <p className="mt-8 text-[10px] tracking-[0.4em] text-white/60 uppercase">Scroll to step inside</p>
      </div>
      <div data-outro className="pointer-events-none absolute inset-0 flex items-center justify-center text-center opacity-0">
        <h2 className="display px-5 text-4xl sm:text-6xl">
          Every evening, <em className="foil italic">a world of its own</em>
        </h2>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
    </section>
  );
}
