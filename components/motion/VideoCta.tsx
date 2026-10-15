"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import VideoBg from "./VideoBg";
import { Arrow } from "../ui";
import { getProject, getVertical, site } from "@/lib/data";

// "Start a project" closing section with a film behind it, shown above the
// footer on every page; its wording and enquiry link follow the page.
export default function VideoCta() {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;

  const segment = pathname.split("/")[1] ?? "";
  const project = pathname.startsWith("/work/") ? getProject(pathname.split("/")[2] ?? "") : undefined;
  const vertical = getVertical(project?.vertical ?? segment);

  const title = project ? "Planning something similar?" : (vertical?.cta ?? "Think events. Think Effects Tech.");
  const href = vertical ? `/contact?vertical=${vertical.slug}` : "/contact";
  const film = vertical?.slug === "weddings" ? "/video/candles.mp4" : "/video/bokeh.mp4";

  return (
    <section
      data-theme="noir"
      className="relative flex min-h-[85svh] items-center justify-center overflow-hidden bg-black text-center text-white"
    >
      <VideoBg src={film} className="opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="container-x relative py-28">
        <p className="eyebrow mb-8 text-[#e8d3a2]">Start a project</p>
        <h2 className="display mx-auto max-w-5xl text-4xl sm:text-6xl lg:text-7xl" data-anim="heading">
          {title}
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <Link href={href} data-cursor="Enquire" className="btn border-[#c9a96e] text-[#e8d3a2]">
            Start a project <Arrow />
          </Link>
          <a href={`mailto:${site.email}`} className="text-[11px] tracking-[0.3em] text-white/70 uppercase transition-colors hover:text-white">
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
