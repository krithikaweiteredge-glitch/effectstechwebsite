/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Reveal from "../Reveal";
import { Arrow, srcSet } from "../ui";

export type GalleryItem = { image: string; event?: string; href?: string; w?: number; h?: number };

const subscribeResize = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
const columnsForWidth = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);

// A photo wall with a full-screen viewer: click to open, arrows / swipe to move,
// Esc to close. "masonry" keeps each photo's own shape; "editorial" alternates
// full-width and paired frames.
export default function Gallery({
  items,
  layout = "masonry",
  captions = true,
}: {
  items: GalleryItem[];
  layout?: "masonry" | "editorial";
  captions?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const startX = useRef<number | null>(null);

  // Masonry: each photo goes into whichever column is currently shortest (known
  // proportions), so every column ends at nearly the same point.
  const columnCount = useSyncExternalStore(subscribeResize, columnsForWidth, () => 3);
  const columns = useMemo(() => {
    const cols: { it: GalleryItem; i: number }[][] = Array.from({ length: columnCount }, () => []);
    const heights = new Array(columnCount).fill(0);
    items.forEach((it, i) => {
      const shortest = heights.indexOf(Math.min(...heights));
      cols[shortest].push({ it, i });
      heights[shortest] += (it.w && it.h ? it.h / it.w : 0.75) + 0.02; // + the gap
    });
    return cols;
  }, [items, columnCount]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, close, step]);

  const tile = (it: GalleryItem, i: number, className: string, imgClass: string, sizes: string) => (
    <button
      key={`${it.image}-${i}`}
      type="button"
      onClick={() => setOpen(i)}
      data-cursor="View"
      aria-label={`Open photo ${i + 1} of ${items.length}${it.event ? ` — ${it.event}` : ""}`}
      className={`group relative block w-full cursor-pointer overflow-hidden bg-surface ${className}`}
    >
      <img
        src={it.image}
        srcSet={srcSet(it.image)}
        sizes={sizes}
        width={it.w}
        height={it.h}
        alt={it.event ?? ""}
        loading="lazy"
        decoding="async"
        className={`grade transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] ${imgClass}`}
      />
      {captions && it.event && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-12 text-left text-[10px] tracking-[0.32em] text-white uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          {it.event}
        </span>
      )}
    </button>
  );

  return (
    <>
      {layout === "masonry" ? (
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
          {columns.map((column, c) => (
            <div key={c} className="flex flex-col gap-3">
              {column.map(({ it, i }) => (
                <Reveal key={`${it.image}-${i}`} delay={c * 80}>
                  {tile(it, i, "", "block h-auto w-full", "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")}
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:gap-3">
          {items.map((it, i) => (
            <Reveal key={`${it.image}-${i}`} delay={(i % 2) * 100} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
              {tile(
                it,
                i,
                i % 3 === 0 ? "aspect-[16/8]" : "aspect-[4/3]",
                "absolute inset-0 h-full w-full object-cover",
                i % 3 === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw",
              )}
            </Reveal>
          ))}
        </div>
      )}

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          data-lenis-prevent
          data-theme="noir"
          className="fixed inset-0 z-[100] flex flex-col bg-[#070605]/97 text-white"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <p className="text-[10px] tracking-[0.36em] text-[#c9a96e] uppercase">
              {String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              {items[open].event ? ` — ${items[open].event}` : ""}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="flex h-11 w-11 cursor-pointer items-center justify-center text-2xl text-white/80 transition-colors hover:text-[#e8d3a2]"
            >
              ×
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-14 pb-4 sm:px-20">
            <img
              key={items[open].image}
              src={items[open].image}
              alt={items[open].event ?? ""}
              className="viewer-in max-h-[78svh] max-w-full object-contain select-none"
              draggable={false}
            />
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-white/70 transition-colors hover:text-[#e8d3a2] sm:left-6"
            >
              <Arrow className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-white/70 transition-colors hover:text-[#e8d3a2] sm:right-6"
            >
              <Arrow />
            </button>
          </div>

          {items[open].href && (
            <div className="pb-8 text-center">
              <Link
                href={items[open].href!}
                onClick={close}
                className="inline-flex items-center gap-3 text-[10px] tracking-[0.36em] text-white/75 uppercase transition-colors hover:text-[#e8d3a2]"
              >
                View the event <Arrow />
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
