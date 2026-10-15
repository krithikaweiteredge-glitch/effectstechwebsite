"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Duration of the CSS preloader in app/layout.tsx; the hero waits for it on first load.
const PRELOADER_MS = 2300;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function MotionProvider() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const firstLoad = useRef(true);

  // Buttery smooth scrolling, kept in sync with ScrollTrigger.
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.085, anchors: { offset: -80 } });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Per-page choreography, rebuilt on every route change.
  useEffect(() => {
    if (reducedMotion()) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
    const delay = firstLoad.current ? PRELOADER_MS / 1000 : 0.75;
    firstLoad.current = false;

    const ctx = gsap.context(() => {
      // Home hero: letters rise, the foil word is unveiled, then the rest follows.
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        const tl = gsap.timeline({ delay, defaults: { ease: "expo.out" } });
        tl.from(hero.querySelectorAll("[data-hero-bg]"), { scale: 1.3, duration: 3.2, ease: "power3.out" }, 0)
          .from(hero.querySelectorAll(".hero-char"), { yPercent: 115, rotate: 7, duration: 1.5, stagger: 0.04 }, 0.15)
          .fromTo(
            hero.querySelectorAll(".hero-foil"),
            { clipPath: "inset(0 100% 0 0)", x: -30 },
            { clipPath: "inset(-20% -10% -20% 0)", x: 0, duration: 2 },
            0.7,
          )
          .from(hero.querySelectorAll("[data-hero-fade]"), { y: 30, opacity: 0, duration: 1.4, stagger: 0.12 }, 1.1);

        // Scroll away: content drifts up and dissolves, photography sinks.
        gsap.to(hero.querySelector("[data-hero-content]"), {
          yPercent: -35,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(hero.querySelectorAll("[data-hero-bg]"), {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }

      // Inner-page heroes.
      document.querySelectorAll<HTMLElement>("[data-page-hero]").forEach((el) => {
        const bg = el.querySelector("[data-hero-bg]");
        gsap.from(el.querySelectorAll("[data-hero-fade]"), {
          y: 40,
          opacity: 0,
          duration: 1.6,
          stagger: 0.14,
          ease: "expo.out",
          delay,
        });
        if (bg) {
          gsap.from(bg, { scale: 1.25, duration: 3, ease: "power3.out", delay: delay - 0.4 });
          gsap.to(bg, {
            yPercent: 16,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
          });
        }
      });

      // Headings rise out of an invisible slot while their tracking settles.
      gsap.utils.toArray<HTMLElement>("[data-anim='heading']").forEach((el) => {
        const spacing = getComputedStyle(el).letterSpacing;
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", yPercent: 40, letterSpacing: "0.08em" },
          {
            clipPath: "inset(-30% -5% -30% -5%)",
            yPercent: 0,
            letterSpacing: spacing === "normal" ? "0em" : spacing,
            duration: 1.8,
            ease: "expo.out",
            clearProps: "clipPath,letterSpacing,transform",
            scrollTrigger: { trigger: el, start: "top 90%" },
          },
        );
      });

      // Photographs open like a curtain and settle from a slow zoom.
      gsap.utils.toArray<HTMLElement>("[data-anim='img']").forEach((el) => {
        const img = el.querySelector("img");
        const st = { trigger: el, start: "top 92%" };
        gsap.fromTo(
          el,
          { clipPath: "inset(14% 8% 14% 8%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.9, ease: "expo.out", clearProps: "clipPath", scrollTrigger: st },
        );
        if (img) {
          // The photo's own CSS hover transition would restart on every frame of
          // this tween and stutter, so it is switched off until the reveal ends.
          gsap.fromTo(
            img,
            { scale: 1.4, transition: "none" },
            { scale: 1, duration: 2.4, ease: "expo.out", clearProps: "transform,transition", scrollTrigger: st },
          );
        }
      });

      // Words light up one by one as they scroll through the viewport.
      gsap.utils.toArray<HTMLElement>("[data-anim='words']").forEach((el) => {
        if (!el.dataset.split) {
          el.innerHTML = el.textContent!
            .trim()
            .split(/\s+/)
            .map((w) => `<span class="word">${w}</span>`)
            .join(" ");
          el.dataset.split = "1";
        }
        gsap.fromTo(
          el.querySelectorAll(".word"),
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: true },
          },
        );
      });

      // Numbers count up.
      gsap.utils.toArray<HTMLElement>("[data-anim='count']").forEach((el) => {
        // Keep the real value so re-runs never count to a half-finished number.
        el.dataset.value ??= el.textContent?.trim() ?? "";
        el.textContent = el.dataset.value;
        const match = el.dataset.value.match(/^(\d+)(.*)$/);
        if (!match) return;
        const target = Number(match[1]);
        const suffix = match[2];
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 2.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}${suffix}`;
          },
        });
      });

      // Lines draw themselves on (map routes and other paths with pathLength=1).
      gsap.utils.toArray<SVGPathElement>("[data-anim='draw']").forEach((el, i) => {
        gsap.fromTo(
          el,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 2.2,
            delay: i * 0.25,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el.closest("svg"), start: "top 75%" },
          },
        );
      });

      // Gentle float on decorative layers.
      gsap.utils.toArray<HTMLElement>("[data-anim='parallax']").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    });

    // Re-measure once late images and fonts have settled.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [pathname]);

  // Cards marked data-tilt lean towards the pointer in 3D.
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 10, rotateX: -py * 10, transformPerspective: 1100, duration: 0.8, ease: "power3.out" });
    };
    const onOut = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (card && !card.contains(e.relatedTarget as Node)) {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" });
      }
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerout", onOut);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  // Looping animations (marquees, map pins, the hero shimmer) pause while off-screen,
  // so idle pages do no work for things nobody can see.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-offscreen", !e.isIntersecting)),
      { rootMargin: "100px 0px" },
    );
    document.querySelectorAll(".marquee, [data-loop]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Magnetic buttons on precise pointers.
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(".btn, .btn-ghost");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * 0.3,
        y: (e.clientY - r.top - r.height / 2) * 0.4,
        duration: 0.6,
        ease: "power3.out",
      });
    };
    const onOut = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(".btn, .btn-ghost");
      if (btn && !btn.contains(e.relatedTarget as Node)) {
        gsap.to(btn, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.35)" });
      }
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerout", onOut);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return null;
}
