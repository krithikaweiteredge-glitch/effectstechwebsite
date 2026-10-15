/* eslint-disable @next/next/no-img-element */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { Arrow } from "../ui";

gsap.registerPlugin(ScrollTrigger);

export type Frame = { image: string; title: string; meta: string; href: string };

const D = 1100; // depth between photographs (px)
const LEAD = 0.55 * D; // how far ahead of the camera the featured photograph sits
const ANGLE = 34; // resting angle of a photograph towards the aisle (deg)
const FOCUS_ANGLE = 6; // angle once it turns to face the visitor (deg)

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// A gallery corridor. Scrolling dollies the camera forward; it drifts away from
// the next photograph and turns to look at it while the photograph swings round
// to face the visitor, so each one is seen clearly before moving on.
export default function CameraWalk({ frames }: { frames: Frame[] }) {
  const section = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = section.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("walk-static");
      return;
    }

    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);
    const arches = gsap.utils.toArray<HTMLElement>("[data-arch]", el);
    const dust = gsap.utils.toArray<HTMLElement>("[data-dust]", el);
    const intro = el.querySelector<HTMLElement>("[data-intro]")!;
    const finale = el.querySelector<HTMLElement>("[data-finale]")!;
    const TRAVEL = 0.84; // share of the scroll spent walking; the rest belongs to the closing line
    const caption = el.querySelector<HTMLElement>("[data-caption]")!;
    const n = frames.length;

    // Layout scales with the viewport so phones see the same corridor, closer in.
    let px = 600; // aisle half-width (px)
    const layout = () => {
      const w = window.innerWidth;
      px = w < 768 ? w * 0.3 : Math.min(620, w * 0.42);
      el.style.setProperty("--aisle", `${px}px`);
      const panelW = w < 768 ? w * 0.86 : Math.min(1040, w * 0.68);
      el.style.setProperty("--panel-w", `${panelW}px`);
      el.style.setProperty("--portal", `${px + panelW * 0.62}px`);
      el.style.setProperty("--portal-h", `${panelW * 1.15}px`);
    };
    layout();

    const START = LEAD; // camera starts one photograph-length before the first
    const END = START - (n - 1) * D;
    const FINALE_Z = -(n - 1) * D - 1.7 * D; // the closing line hangs at the end of the aisle
    const FINALE_VIEW = 700; // how close the camera comes to it

    let p = 0;
    let sp = 0;
    let cx = 0;
    let lx = 0;
    let idx = -1;
    let live = false;
    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: () => `+=${n * 700 + 1100}`,
      pin: true,
      onUpdate: (self) => {
        p = self.progress;
      },
    });

    const io = new IntersectionObserver(([e]) => (live = e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("resize", layout);

    let lastFrame = "";
    const tick = () => {
      if (!live) return;
      sp = lerp(sp, p, 0.08);
      pointer.sx = lerp(pointer.sx, pointer.x, 0.05);
      pointer.sy = lerp(pointer.sy, pointer.y, 0.05);

      const walk = clamp01(sp / TRAVEL); // camera progress along the aisle
      const close = clamp01((sp - TRAVEL) / (1 - TRAVEL)); // closing line progress
      const closeEase = 1 - Math.pow(1 - close, 3);
      const scene = 1 - clamp01(close * 1.6); // the gallery dims away as the camera moves on
      // After the last photograph the camera glides on down the aisle to the closing line.
      const camZ = lerp(START, END, walk) - closeEase * (END - FINALE_Z - FINALE_VIEW);
      const f = (START - camZ) / D; // which photograph we are approaching
      const i = Math.max(0, Math.min(n - 1, Math.round(f)));
      if (i !== idx) {
        idx = i;
        setCurrent(i);
      }
      const side = i % 2 ? 1 : -1;

      // Camera drifts to the opposite side of the aisle and looks across at the photograph.
      // ...and turns back to the centre of the aisle as it heads for the closing line.
      cx = lerp(cx, -side * px * 0.22 * (1 - closeEase), 0.045);
      lx = lerp(lx, side * px * 0.92 * (1 - closeEase), 0.05);
      // Skip redrawing when scroll, pointer and camera have come to rest.
      const frameKey = `${sp.toFixed(5)}|${cx.toFixed(1)}|${lx.toFixed(1)}|${pointer.sx.toFixed(3)}|${pointer.sy.toFixed(3)}|${(p - sp).toFixed(4)}`;
      if (frameKey === lastFrame) return;
      lastFrame = frameKey;
      const camX = cx + pointer.sx * 60;
      const camY = Math.sin(f * Math.PI * 2) * 8 + pointer.sy * 30;
      const yaw = (Math.atan2(lx - camX + pointer.sx * 40, LEAD) * 180) / Math.PI;
      const roll = (p - sp) * 30;

      world.current!.style.transform = `rotateZ(${roll}deg) rotateY(${yaw}deg) translate3d(${-camX}px, ${-camY}px, ${-camZ}px)`;

      panels.forEach((panel, k) => {
        const s = k % 2 ? 1 : -1;
        const ahead = camZ - -k * D; // distance from camera to this photograph (positive = ahead)
        const focus = clamp01(1 - Math.abs(k - f) / 0.6);
        const angle = -s * lerp(ANGLE, FOCUS_ANGLE, focus);
        panel.style.transform = `translate3d(${s * px}px, ${(k % 3) * -14}px, ${-k * D}px) translate(-50%, -50%) rotateY(${angle}deg)`;
        // Fog in the distance; gone once it has slipped past the camera.
        const fog = clamp01((4.2 * D - ahead) / (1.4 * D)) * clamp01((ahead - 0.18 * D) / (0.2 * D));
        const op = fog * lerp(0.42, 1, focus) * clamp01((sp - 0.04) * 16) * scene;
        panel.style.opacity = String(op);
        panel.style.visibility = op < 0.01 ? "hidden" : "visible";
      });

      arches.forEach((arch) => {
        const z = Number(arch.dataset.z);
        const ahead = camZ - z;
        const op = clamp01((5 * D - ahead) / (2 * D)) * clamp01((ahead - 0.2 * D) / (0.4 * D));
        arch.style.opacity = String(op * 0.9 * scene);
        arch.style.visibility = op < 0.01 ? "hidden" : "visible";
      });

      dust.forEach((d) => {
        const z = Number(d.dataset.z);
        const ahead = camZ - z;
        const op = clamp01((4 * D - ahead) / (2 * D)) * clamp01((ahead - 0.15 * D) / (0.3 * D));
        d.style.opacity = String(op * lerp(1, 0.5, close));
        d.style.visibility = op < 0.01 ? "hidden" : "visible";
      });

      intro.style.opacity = String(clamp01(1 - sp * 14));
      caption.style.opacity = String(clamp01((sp - 0.04) * 14) * (1 - clamp01(close * 4)));
      bar.current!.style.transform = `scaleX(${walk})`;
      // The closing line is part of the corridor: it glows into view far down the aisle.
      const finaleAhead = camZ - FINALE_Z;
      // It only appears once the last photograph has been seen, then grows as the camera arrives.
      const finaleOp = clamp01((5 * D - finaleAhead) / (1.8 * D)) * clamp01((close - 0.03) / 0.3);
      finale.style.opacity = String(finaleOp);
      finale.style.visibility = finaleOp < 0.01 ? "hidden" : "visible";
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", layout);
    };
  }, [frames.length]);

  // Gold dust: fixed pseudo-random positions so server and client render alike.
  const dust = Array.from({ length: 70 }, (_, k) => {
    const r = (s: number) => {
      const x = Math.sin(k * 12.9898 + s * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      x: Math.round((r(1) - 0.5) * 1600),
      y: Math.round((r(2) - 0.5) * 900),
      z: Math.round(D - r(3) * (frames.length + 2) * D),
      s: Math.round(2 + r(4) * 3),
    };
  });
  const archCount = frames.length + 2;
  const f = frames[current];

  return (
    <section ref={section} data-theme="noir" className="walk relative h-svh overflow-hidden bg-[#070605] text-white" aria-label="A walk through our work">
      <div className="walk-stage absolute inset-0">
        <div ref={world} className="walk-world absolute top-1/2 left-1/2">
          {/* Gold portals framing the aisle: hairline pillars and lintel (cheap to render) */}
          {Array.from({ length: archCount }, (_, k) => {
            const z = D * 0.5 - k * D;
            return (
              <Fragment key={`a${k}`}>
                <span aria-hidden="true" data-arch data-z={z} className="walk-pillar" style={{ transform: `translate3d(calc(var(--portal) * -1), -55%, ${z}px)` }} />
                <span aria-hidden="true" data-arch data-z={z} className="walk-pillar" style={{ transform: `translate3d(var(--portal), -55%, ${z}px)` }} />
                <span aria-hidden="true" data-arch data-z={z} className="walk-lintel" style={{ transform: `translate3d(-50%, calc(var(--portal-h) * -0.6), ${z}px)` }} />
              </Fragment>
            );
          })}
          {dust.map((d, k) => (
            <span
              key={`d${k}`}
              data-dust
              data-z={d.z}
              aria-hidden="true"
              className="walk-dust"
              style={{ width: d.s, height: d.s, transform: `translate3d(${d.x}px, ${d.y}px, ${d.z}px)` }}
            />
          ))}
          {frames.map((fr, k) => (
            <figure key={k} data-panel className="walk-panel">
              <img src={fr.image} alt={fr.title} loading="lazy" className="grade walk-photo" />
            </figure>
          ))}
          {/* Closing line, hung at the far end of the aisle */}
          <div
            data-finale
            className="walk-finale"
            style={{ transform: `translate3d(-50%, -50%, ${-(frames.length - 1) * D - 1.7 * D}px)` }}
          >
            <span className="hairline mx-auto mb-12" />
            <h2 className="display walk-finale-title">
              Every evening, <em className="foil italic">a world of its own</em>
            </h2>
            <Link
              href="/work"
              data-cursor="View"
              className="mt-14 inline-flex items-center gap-4 text-[clamp(11px,1.2vw,16px)] tracking-[0.36em] text-white/75 uppercase transition-colors hover:text-[#e8d3a2]"
            >
              See all our work <Arrow />
            </Link>
          </div>
        </div>
      </div>

      {/* Edges fade to black like a darkened gallery */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_35%,rgba(7,6,5,0.92)_100%)]" />

      <div data-intro className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <p className="eyebrow mb-6 text-[#e8d3a2]">The gallery</p>
        <h2 className="display px-5 text-4xl sm:text-6xl lg:text-7xl">
          Walk through <em className="foil italic">our world</em>
        </h2>
        <p className="mt-8 text-[10px] tracking-[0.4em] text-white/60 uppercase">Keep scrolling — the camera moves with you</p>
      </div>

      {/* Caption for the photograph in focus */}
      <div data-caption className="absolute inset-x-0 bottom-0 z-10 opacity-0">
        <div className="container-x flex items-end justify-between gap-6 pb-14 sm:pb-16">
          <Link key={current} href={f.href} data-cursor="View" className="walk-caption group block max-w-2xl">
            <p className="text-[10px] tracking-[0.36em] text-[#c9a96e] uppercase">
              {String(current + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")} — {f.meta}
            </p>
            <p className="display mt-3 text-3xl sm:text-5xl">{f.title}</p>
            <span className="mt-4 inline-flex items-center gap-3 text-[10px] tracking-[0.36em] text-white/70 uppercase transition-colors group-hover:text-[#e8d3a2]">
              View the project <Arrow />
            </span>
          </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
          <div ref={bar} className="h-full origin-left scale-x-0 bg-[#c9a96e]" />
        </div>
      </div>
    </section>
  );
}
