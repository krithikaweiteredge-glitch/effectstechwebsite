/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import VideoBg from "./motion/VideoBg";
import { getVertical, type Insight, type Project } from "@/lib/data";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
      <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Remote photo with a tonal fallback behind it, so layouts hold while images
// load or if a source is unavailable.
export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
  position,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <div data-anim="img" className={`bg-surface relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
        className={`grade absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  action,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  action?: ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal
      className={`mb-14 flex flex-col gap-8 sm:mb-20 ${
        center ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"
      }`}
    >
      <div className="max-w-3xl">
        {center && <span className="hairline mx-auto mb-10" />}
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl" data-anim="heading">
          {title}
        </h2>
        {text && (
          <p className={`text-muted mt-7 max-w-2xl text-base leading-loose sm:text-lg ${center ? "mx-auto" : ""}`}>{text}</p>
        )}
      </div>
      {action}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  video,
  center = true,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  image?: string;
  video?: string;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      data-page-hero
      data-theme="noir"
      className="relative flex min-h-svh items-end overflow-hidden bg-black text-white"
      // Heroes sit on dark photography, so always use the bright champagne foil.
      style={{ ["--accent" as string]: "#c9a96e", ["--accent-2" as string]: "#f1dfb4" }}
    >
      {video && (
        <div data-hero-bg className="absolute inset-0">
          <VideoBg src={video} poster={image} className="opacity-70" />
        </div>
      )}
      {image && !video && (
        <img src={image} alt="" data-hero-bg className="grade absolute inset-0 h-full w-full object-cover opacity-75" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.7)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/90 to-transparent" />
      <div className={`container-x relative pt-44 pb-20 sm:pb-28 ${center ? "text-center" : ""}`}>
        <p className="eyebrow mb-7 text-[#e8d3a2]" data-hero-fade>
          {eyebrow}
        </p>
        <h1 data-hero-fade className={`display max-w-5xl text-[clamp(2rem,5.2vw,5.25rem)] ${center ? "mx-auto" : ""}`}>{title}</h1>
        {text && (
          <p data-hero-fade className={`mt-8 max-w-2xl text-base leading-loose text-white/80 sm:text-lg ${center ? "mx-auto" : ""}`}>
            {text}
          </p>
        )}
        {children && <div data-hero-fade className={`mt-10 flex flex-wrap gap-4 ${center ? "justify-center" : ""}`}>{children}</div>}
      </div>
    </section>
  );
}

export function ProjectCard({
  project,
  tall = false,
  wide = false,
  delay = 0,
}: {
  project: Project;
  tall?: boolean;
  wide?: boolean;
  delay?: number;
}) {
  const vertical = getVertical(project.vertical);
  return (
    <Reveal delay={delay}>
      <Link href={`/work/${project.slug}`} data-cursor="View" className="group block cursor-pointer">
        <Photo
          src={project.image}
          alt={project.title}
          className={wide ? "aspect-[16/9] lg:aspect-auto lg:h-[calc((100cqw-3rem)/4)]" : tall ? "aspect-[4/5]" : "aspect-[4/3]"}
          imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-muted mb-3 text-[10px] tracking-[0.36em] uppercase">
              {vertical?.short} · {project.category}
            </p>
            <h3 className="font-display group-hover:text-accent text-2xl leading-tight transition-colors duration-500 sm:text-[1.8rem]">
              {project.title}
            </h3>
            {project.location && <p className="text-muted mt-1 text-sm">{project.location}</p>}
          </div>
          <Arrow className="text-muted group-hover:text-accent mt-2 shrink-0 transition-all duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </Reveal>
  );
}

export function InsightCard({ post, delay = 0 }: { post: Insight; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link href={`/insights/${post.slug}`} data-cursor="Read" className="group block cursor-pointer">
        <Photo
          src={post.image}
          alt=""
          className="aspect-[3/2]"
          imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <p className="text-accent mt-5 text-[10px] tracking-[0.36em] uppercase">
          {post.category} · {post.readTime}
        </p>
        <h3 className="font-display group-hover:text-accent mt-3 text-2xl leading-tight transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-muted mt-3 text-sm leading-relaxed">{post.excerpt}</p>
      </Link>
    </Reveal>
  );
}

