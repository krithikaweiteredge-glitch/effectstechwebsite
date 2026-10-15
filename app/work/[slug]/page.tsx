import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Arrow, PageHero, Photo, ProjectCard, SectionHead } from "@/components/ui";
import { caseStudyCopy, getProject, getVertical, projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.title} — ${p.category} project by ${getVertical(p.vertical)?.name}.`,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { images: [p.image] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const vertical = getVertical(project.vertical)!;
  const copy = caseStudyCopy[project.vertical];
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const related = projects.filter((p) => p.vertical === project.vertical && p.slug !== project.slug).slice(0, 3);

  const facts = [
    ["Vertical", vertical.short],
    ["Event type", project.category],
    ...(project.location ? [["Location", project.location]] : []),
  ];

  return (
    <div data-theme={project.vertical} className="bg-bg text-fg">
      <PageHero eyebrow={`${vertical.short} · ${project.category}`} title={project.title} image={project.image} />

      <section className="container-x section">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:gap-24">
          <Reveal>
            <dl className="border-line border-t">
              {facts.map(([k, v]) => (
                <div key={k} className="border-line flex justify-between gap-6 border-b py-5">
                  <dt className="text-muted text-[10px] tracking-[0.36em] uppercase">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/work" className="link-arrow mt-8">
              <Arrow className="rotate-180" /> All projects
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-5">Project overview</p>
            <p data-anim="words" className="font-display text-3xl leading-snug sm:text-4xl">
              {copy.overview}
            </p>
            <h2 className="eyebrow mt-14 mb-5">Scope of work</h2>
            <ul className="flex flex-wrap gap-3">
              {copy.scope.map((s) => (
                <li key={s} className="border-line border px-5 py-3 text-[11px] tracking-[0.28em] uppercase">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mt-20 grid gap-2 sm:grid-cols-2 lg:gap-3">
          {(project.gallery ?? [project.image]).map((src, i) => (
            <Reveal key={src} delay={(i % 2) * 100} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
              <Photo
                src={src}
                alt={`${project.title} — photograph ${i + 1}`}
                className={i % 3 === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-line border-t">
          <div className="container-x section">
            <SectionHead eyebrow="Related projects" title={
                <>
                  More from <em className="italic">{vertical.short}</em>
                </>
              } />
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} delay={i * 100} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next project */}
      <Link
        href={`/work/${next.slug}`}
        data-cursor="Next"
        className="group relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-black text-center text-white"
        style={{ ["--accent" as string]: "#c9a96e", ["--accent-2" as string]: "#f1dfb4" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={next.image}
          alt=""
          loading="lazy"
          className="grade absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-[1600ms] ease-out group-hover:scale-105 group-hover:opacity-70"
        />
        <div className="relative px-5">
          <p className="eyebrow mb-6">Next project</p>
          <p className="display text-5xl sm:text-7xl lg:text-8xl">
            <em className="foil italic">{next.title}</em>
          </p>
          <p className="mt-6 text-[10px] tracking-[0.36em] text-white/70 uppercase">{next.category}</p>
        </div>
      </Link>

    </div>
  );
}
