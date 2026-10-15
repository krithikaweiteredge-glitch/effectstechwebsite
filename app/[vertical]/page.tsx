import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HoverReveal from "@/components/motion/HoverReveal";
import VideoBg from "@/components/motion/VideoBg";
import Showcase from "@/components/motion/Showcase";
import StickySteps from "@/components/motion/StickySteps";
import Reveal from "@/components/Reveal";
import { Arrow, PageHero, Photo, SectionHead } from "@/components/ui";
import { getVertical, projects, verticals } from "@/lib/data";

type Props = { params: Promise<{ vertical: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return verticals.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = getVertical((await params).vertical);
  if (!v) return {};
  return {
    title: v.name,
    description: `${v.tagline} ${v.intro}`,
    alternates: { canonical: `/${v.slug}` },
  };
}

export default async function VerticalPage({ params }: Props) {
  const v = getVertical((await params).vertical);
  if (!v) notFound();

  const work = projects.filter((p) => p.vertical === v.slug).slice(0, 6);
  // Photographs from this vertical's own projects, for services and process.
  const pool = projects.filter((p) => p.vertical === v.slug).flatMap((p) => p.gallery ?? [p.image]);
  const enquire = `/contact?vertical=${v.slug}`;

  return (
    <div data-theme={v.slug} className="bg-bg text-fg">
      <PageHero eyebrow={v.name} title={v.tagline} text={v.intro} image={v.image} video={v.heroVideo}>
        <Link href={enquire} className="btn">
          Enquire now <Arrow />
        </Link>
        <a href="#services" className="btn-ghost text-white">
          Our services
        </a>
      </PageHero>

      {/* Overview */}
      <section className="container-x section">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="eyebrow mb-5">Overview</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-4xl xl:text-5xl">
              {v.overview[0]} <em className="foil italic">{v.overview[1]}</em>
            </h2>
            <p data-anim="words" className="font-display mt-10 text-2xl leading-snug sm:text-3xl">
              {v.body}
            </p>
            <Link href={enquire} className="link-arrow mt-8">
              Talk to the {v.short.toLowerCase()} team <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={150}>
            <Photo
              src={v.bandImage}
              alt={`${v.name} — recent project`}
              className="aspect-[4/5] rounded-t-full"
            />
          </Reveal>
        </div>
      </section>

      {/* Film */}
      <section
        data-theme="noir"
        className="relative flex min-h-svh items-center justify-center overflow-hidden bg-black text-center text-white"
      >
        <VideoBg src={v.film.src} className="opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.75)_100%)]" />
        <h2 className="display container-x relative text-5xl sm:text-7xl lg:text-8xl" data-anim="heading">
          {v.film.line[0]}
          <br />
          <em className="foil">{v.film.line[1]}</em>
        </h2>
      </section>

      {/* Services */}
      <section id="services" className="bg-surface section scroll-mt-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Services"
            title={
              <>
                The <em className="foil italic">signature</em> services
              </>
            }
          />
          <HoverReveal
            items={v.services.map((sv, i) => ({ ...sv, image: pool[(i * 3 + 1) % pool.length] }))}
          />
        </div>
      </section>

      {/* Process */}
      <section className="container-x section">
        <SectionHead
          eyebrow="How we work"
          title={
            <>
              From first conversation to <em className="foil italic">final moment</em>
            </>
          }
        />
        <StickySteps steps={v.process.map((st, i) => ({ ...st, image: pool[(i * 4 + 2) % pool.length] }))} />
      </section>

      {/* Portfolio */}
      <Showcase
        projects={work}
        eyebrow="Portfolio"
        title={
          <>
            Selected <em className="foil italic">{v.short.toLowerCase()}</em>
          </>
        }
        text="A few of the evenings we were trusted with."
        href={`/work?vertical=${v.slug}`}
        label={`All ${v.short.toLowerCase()}`}
      />

    </div>
  );
}
