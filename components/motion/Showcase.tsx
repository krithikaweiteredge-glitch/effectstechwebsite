/* eslint-disable @next/next/no-img-element */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { Arrow } from "../ui";
import type { Project } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Signature work as a pinned, horizontally scrolling gallery on large screens;
// a simple vertical list on phones and for reduced motion.
export default function Showcase({
  projects,
  eyebrow = "Signature work",
  title = (
    <>
      The evenings that <em className="foil italic">define us</em>
    </>
  ),
  text = "Couture runways, family celebrations and award nights — a few of the evenings we were trusted with.",
  href = "/work",
  label = "The full portfolio",
}: {
  projects: Project[];
  eyebrow?: string;
  title?: ReactNode;
  text?: string;
  href?: string;
  label?: string;
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const scroll = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      // Each photograph drifts inside its frame as the gallery moves.
      el.querySelectorAll<HTMLElement>("[data-drift]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
          },
        );
      });
      gsap.to(section.current!.querySelector("[data-progress]"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="bg-surface relative overflow-hidden lg:h-svh">
      <div
        ref={track}
        className="flex flex-col gap-16 px-5 py-24 sm:px-8 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-14 lg:px-[8vw] lg:py-0"
      >
        <div className="shrink-0 lg:w-[36vw]">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h2 className="display text-4xl sm:text-5xl xl:text-6xl" data-anim="heading">
            {title}
          </h2>
          <p className="text-muted mt-8 max-w-sm leading-loose">{text}</p>
          <p className="text-muted mt-10 hidden items-center gap-4 text-[10px] tracking-[0.36em] uppercase lg:flex">
            Scroll to explore <Arrow />
          </p>
        </div>

        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            data-cursor="View"
            className="group block shrink-0 cursor-pointer lg:w-[52vw] xl:w-[46vw]"
          >
            <div className="relative aspect-[16/10] overflow-hidden" data-anim="img">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                data-drift
                className="grade absolute inset-0 h-full w-[120%] max-w-none object-cover lg:-left-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="font-serif text-accent absolute top-5 left-6 text-5xl italic sm:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-6 flex items-end justify-between gap-6">
              <div>
                <p className="text-muted text-[10px] tracking-[0.36em] uppercase">
                  {p.category}
                  {p.location ? ` · ${p.location}` : ""}
                </p>
                <h3 className="display group-hover:text-accent mt-3 text-3xl transition-colors duration-500 sm:text-4xl">
                  {p.title}
                </h3>
              </div>
              <Arrow className="text-accent mb-3 shrink-0 transition-transform duration-500 group-hover:translate-x-2" />
            </div>
          </Link>
        ))}

        <div className="shrink-0 lg:w-[26vw]">
          <Link href={href} className="btn">
            {label} <Arrow />
          </Link>
        </div>
      </div>
      <div className="absolute inset-x-[8vw] bottom-10 hidden h-px bg-white/10 lg:block">
        <div data-progress className="bg-accent h-full origin-left scale-x-0" />
      </div>
    </section>
  );
}
