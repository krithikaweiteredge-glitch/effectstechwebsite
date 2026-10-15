"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ui";
import { projects, verticals, type VerticalSlug } from "@/lib/data";

type Filter = VerticalSlug | "all";

export default function WorkGrid({ initial = "all" }: { initial?: Filter }) {
  const [vertical, setVertical] = useState<Filter>(initial);
  const [category, setCategory] = useState("all");

  const inVertical = useMemo(
    () => projects.filter((p) => vertical === "all" || p.vertical === vertical),
    [vertical],
  );
  const categories = useMemo(() => [...new Set(inVertical.map((p) => p.category))], [inVertical]);
  const visible = inVertical.filter((p) => category === "all" || p.category === category);

  const chip = (active: boolean) =>
    `min-h-11 cursor-pointer border px-5 text-[10px] tracking-[0.32em] uppercase transition-colors duration-300 ${
      active ? "bg-accent text-on-accent border-accent" : "border-line hover:border-accent hover:text-accent"
    }`;

  return (
    <>
      <div className="mb-12 flex flex-col items-center space-y-6">
        <div role="group" aria-label="Filter by vertical" className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            aria-pressed={vertical === "all"}
            className={chip(vertical === "all")}
            onClick={() => {
              setVertical("all");
              setCategory("all");
            }}
          >
            All work
          </button>
          {verticals.map((v) => (
            <button
              key={v.slug}
              type="button"
              aria-pressed={vertical === v.slug}
              className={chip(vertical === v.slug)}
              onClick={() => {
                setVertical(v.slug);
                setCategory("all");
              }}
            >
              {v.short}
            </button>
          ))}
        </div>
        {categories.length > 1 && (
          <div role="group" aria-label="Filter by category" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {["all", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`min-h-11 cursor-pointer text-sm transition-colors duration-300 ${
                  category === c ? "text-accent underline underline-offset-8" : "text-muted hover:text-fg"
                }`}
              >
                {c === "all" ? "All categories" : c}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-muted mb-12 text-center text-[10px] tracking-[0.36em] uppercase" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => {
          const wide = i % 4 === 0;
          return (
            <div key={`${vertical}-${category}-${p.slug}`} className={wide ? "sm:col-span-2" : ""}>
              <ProjectCard project={p} wide={wide} delay={(i % 3) * 80} />
            </div>
          );
        })}
      </div>
    </>
  );
}
