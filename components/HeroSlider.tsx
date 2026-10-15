/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSlider({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(root.current!);
    // Only change slides while the hero is on screen.
    const id = setInterval(() => visible && setActive((a) => (a + 1) % images.length), 6000);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [images.length]);

  return (
    <div ref={root} className="absolute inset-0" aria-hidden="true">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          className={`grade absolute inset-0 h-full w-full object-cover transition-opacity duration-[2200ms] ease-in-out ${
            i === active ? "kenburns opacity-75" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
