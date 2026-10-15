/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import Reveal from "@/components/Reveal";
import IndiaMap from "@/components/IndiaMap";
import CameraWalk from "@/components/motion/CameraWalk";
import Showcase from "@/components/motion/Showcase";
import { Arrow, Photo } from "@/components/ui";
import { faces, heroImages, houses, projects, stats, verticals, getVertical } from "@/lib/data";

// Mosaic placement for the six "faces" tiles on a 4-column grid.
const faceSpans = [
  "col-span-2 row-span-2",
  "",
  "row-span-2",
  "",
  "col-span-2",
  "col-span-2",
];

// Light accents so each vertical tile reads on top of its photo.
const tileAccent: Record<string, string> = {
  experiences: "#e0a98b",
  "meetings-events": "#c9d1dc",
  weddings: "#e8d3a2",
};

export default function Home() {
  const signature = projects.slice(0, 6);
  // The gallery walk uses the projects not already in the showcase, so nothing appears twice.
  const frames = projects.slice(6, 18).map((p) => ({
    image: p.gallery?.[2] ?? p.image,
    title: p.title,
    meta: `${getVertical(p.vertical)?.short} · ${p.location ?? p.category}`,
    href: `/work/${p.slug}`,
  }));

  return (
    <>
      {/* Hero */}
      <section
        data-hero
        data-theme="noir"
        className="relative flex min-h-svh items-center justify-center overflow-hidden bg-black text-center text-white"
      >
        <div data-hero-bg className="absolute inset-0">
          <HeroSlider images={heroImages} />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.75)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070707] to-transparent" />
        <div data-hero-content className="container-x relative pt-28 pb-24">
          <p data-hero-fade className="eyebrow mb-8 text-[#e8d3a2]">
            Experiences · Meetings &amp; Events · Weddings
          </p>
          <h1
            aria-label="Experiences beyond expectations"
            className="display mx-auto max-w-6xl text-[clamp(1.9rem,8vw,7.5rem)] leading-[1.02]"
          >
            <span aria-hidden="true" className="block overflow-hidden pt-[0.08em] pb-[0.16em]">
              {"Experiences".split("").map((c, i) => (
                <span key={i} className="hero-char inline-block">
                  {c === " " ? "\u00a0" : c}
                </span>
              ))}
            </span>
            <span aria-hidden="true" className="block pb-[0.12em]">
              <em className="foil hero-foil inline-block pr-[0.15em] italic">beyond expectations</em>
            </span>
          </h1>
          <p data-hero-fade className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Brand experiences, celebrations and summits for India&apos;s most discerning brands, families and stars.
          </p>
          <div data-hero-fade className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/work" className="btn border-[#c9a96e] text-[#e8d3a2]">
              Discover our world
            </Link>
            <Link href="/contact" className="btn-ghost text-white">
              Enquire privately
            </Link>
          </div>
        </div>
      </section>

      {/* Houses */}
      <section className="border-line overflow-hidden border-b py-12" aria-label="Brands and houses we have created for">
        <p className="eyebrow mb-8 text-center">Trusted by the houses that define luxury</p>
        <div className="marquee flex w-max items-center">
          {[...houses, ...houses].map((h, i) => (
            <span key={i} aria-hidden={i >= houses.length} className="flex items-center">
              <span className="font-serif text-fg/85 px-10 text-3xl whitespace-nowrap italic sm:text-4xl">{h}</span>
              <span className="text-accent text-xs">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="container-x section text-center">
        <Reveal>
          <span className="hairline mx-auto mb-12" />
          <h2 className="display mx-auto max-w-5xl text-4xl sm:text-6xl lg:text-7xl" data-anim="heading">
            Some evenings are attended.
            <br />
            <em className="foil italic">Ours are remembered.</em>
          </h2>
          <p data-anim="words" className="mx-auto mt-12 max-w-3xl font-display text-2xl leading-snug sm:text-3xl">
            We create the evenings people dress for, travel for — and talk about for years.
          </p>
        </Reveal>
      </section>

      {/* Gallery walk */}
      <CameraWalk frames={frames} />

      {/* Faces & moments */}
      <section className="pb-24 sm:pb-32 lg:pb-44">
        <div className="container-x">
          <Reveal className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-5">Faces &amp; moments</p>
              <h2 className="display text-4xl sm:text-6xl" data-anim="heading">
                In our <em className="foil italic">spotlight</em>
              </h2>
            </div>
            <Link href="/work" className="link-arrow shrink-0">
              The full portfolio <Arrow />
            </Link>
          </Reveal>
          <div className="grid auto-rows-[180px] grid-cols-2 gap-2 sm:auto-rows-[240px] lg:auto-rows-[300px] lg:grid-cols-4 lg:gap-3">
            {faces.map((f, i) => (
              <figure key={f.image} className={`group relative overflow-hidden ${faceSpans[i]}`}>
                <Photo
                  src={f.image}
                  alt={f.caption}
                  position={f.position}
                  className="absolute! inset-0"
                  imgClassName="transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute bottom-4 left-4 text-[10px] tracking-[0.36em] text-white/90 uppercase sm:bottom-6 sm:left-6">
                  {f.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Signature work */}
      <Showcase projects={signature} />

      {/* Three worlds */}
      <section className="section">
        <div className="container-x">
          <Reveal className="mb-16 text-center">
            <p className="eyebrow mb-5">Three worlds</p>
            <h2 className="display text-4xl sm:text-6xl" data-anim="heading">
              One house of <em className="foil italic">celebration</em>
            </h2>
          </Reveal>
          <div className="grid gap-3 lg:grid-cols-3">
            {verticals.map((v, i) => (
              <Reveal key={v.slug} delay={i * 120}>
                <Link
                  href={`/${v.slug}`}
                  data-cursor="Enter"
                  data-tilt
                  className="group relative flex aspect-[4/5] cursor-pointer flex-col items-center justify-end overflow-hidden p-8 text-center text-white sm:p-10 lg:aspect-[3/5]"
                >
                  <img
                    src={v.image}
                    alt=""
                    loading="lazy"
                    className="grade absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                  <div className="relative">
                    <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: tileAccent[v.slug] }}>
                      Effects Tech
                    </p>
                    <h3 className="display mt-4 text-3xl lg:text-4xl">{v.short}</h3>
                    <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-white/75">{v.tagline}</p>
                    <span
                      className="mt-8 inline-flex items-center gap-3 border-b pb-1 text-[10px] tracking-[0.36em] uppercase"
                      style={{ color: tileAccent[v.slug], borderColor: tileAccent[v.slug] }}
                    >
                      Enter <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-bg text-fg section" data-theme="noir">
        <div className="container-x">
          <Reveal className="mb-16 text-center">
            <span className="hairline mx-auto mb-10" />
            <p className="eyebrow mb-5">Across India</p>
            <h2 className="display text-4xl sm:text-6xl" data-anim="heading">
              From Mumbai to <em className="foil italic">everywhere</em>
            </h2>
          </Reveal>
          <IndiaMap />
        </div>
      </section>

      {/* Numbers */}
      <section className="border-line border-y">
        <dl className="container-x grid grid-cols-2 py-16 text-center lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="py-6">
              <dd className="font-display foil text-5xl sm:text-7xl" data-anim="count">
                {s.value}
              </dd>
              <dt className="text-muted mt-4 text-[10px] tracking-[0.36em] uppercase">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

    </>
  );
}
