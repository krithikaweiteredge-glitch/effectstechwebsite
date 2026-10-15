"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

// A champagne ring that trails the pointer and opens up over interactive
// elements; elements with data-cursor="Label" show that label inside it.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const enabled =
      window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled || !ring.current || !dot.current) return;
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3.out" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      const interactive = target.closest("a, button, input, select, textarea, label");
      setLabel(labelled?.dataset.cursor ?? "");
      ring.current!.dataset.state = labelled ? "label" : interactive ? "hover" : "";
    };
    const leave = () => gsap.to([ring.current, dot.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([ring.current, dot.current], { opacity: 1, duration: 0.3 });

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  // Hidden by CSS on touch screens and for reduced motion.
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span>{label}</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
