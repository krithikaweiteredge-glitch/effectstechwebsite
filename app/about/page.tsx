/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import HoverReveal from "@/components/motion/HoverReveal";
import StickySteps from "@/components/motion/StickySteps";
import Reveal from "@/components/Reveal";
import { Arrow, PageHero, Photo, SectionHead } from "@/components/ui";
import { founderImage, getProject, heroImages, houses, site, stats, verticals, whyUs } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "With over 18 years of turnkey event production, Effects Tech is India's leading events production house — experiences, meetings & events and weddings.",
  alternates: { canonical: "/about" },
};

const g = (slug: string, i: number) => getProject(slug)?.gallery?.[i] ?? getProject(slug)!.image;

const offerings = [
  ...verticals.map((v) => ({ title: v.short, text: v.intro, image: v.image, href: `/${v.slug}` })),
  {
    title: "Set design & fabrication",
    text: "Sets, stages and structures drawn and built by our own teams.",
    image: g("rohit-bal-ajsk-tarun-tahiliani", 1),
  },
  {
    title: "Sound, light & video",
    text: "Concert-grade systems and the specialists who run them.",
    image: g("zubin-mehta-concert", 1),
  },
  {
    title: "Exhibitions & stalls",
    text: "From grand expos to specialised stall design that stands out on the floor.",
    image: g("cartier", 1),
  },
];

const method = [
  {
    title: "Immersion",
    text: "We begin with the brief, the audience and the feeling the evening must leave behind.",
    image: g("gq-and-vogue", 1),
  },
  {
    title: "Concept & design",
    text: "Every element is imagined together as one world — never in isolation.",
    image: g("rohit-bal-ajsk-tarun-tahiliani", 0),
  },
  {
    title: "Fabrication",
    text: "Our own teams build what was drawn, so the design is exactly what is delivered.",
    image: g("mughal-e-azam", 1),
  },
  {
    title: "Production",
    text: "Technical rehearsals, show-calling and crews who adapt in real time when the unexpected happens.",
    image: g("birla-family-celebration", 1),
  },
  {
    title: "The moment",
    text: "Doors open. Every detail holds. Our guests simply remember how it felt.",
    image: g("chudhary-wedding-hyderabad", 1),
  },
];

const partners = [
  "Luxury fashion & beauty houses",
  "Top corporate houses",
  "Event management companies",
  "Families celebrating milestones",
  "Hospitality & lifestyle groups",
  "Artists, theatre & live shows",
];

const faqs = [
  {
    q: "What does Effects Tech do?",
    a: "Effects Tech is a turnkey events production house. We design and produce brand experiences, corporate meetings and events, exhibitions, fashion shows, theatre and live shows, and weddings.",
  },
  {
    q: "Where is Effects Tech based?",
    a: `Our studio is at ${site.address}, and we produce events across India.`,
  },
  {
    q: "How long has Effects Tech been in business?",
    a: "Over 18 years, with more than 1000 productions for over 150 clients.",
  },
  {
    q: "Do you handle production in-house?",
    a: "Yes. Fabrication, set design, sound and light design, video and trussing are handled by our own teams, so one partner is accountable for the whole event.",
  },
  {
    q: "Do you plan weddings?",
    a: "Yes. Effects Tech Weddings plans and produces weddings and family celebrations, from décor and staging to sound, lighting and function management.",
  },
  {
    q: "How do I start an enquiry?",
    a: `Use our enquiry form, email ${site.email}, or call ${site.phones[0]}.`,
  },
];

const filmstrip = [
  g("gq-and-vogue", 0),
  g("lakme-fashion", 2),
  g("cartier", 2),
  g("birla-family-celebration", 3),
  g("ruia-wedding-udaipur", 2),
  g("zubin-mehta-concert", 3),
  g("shaadi-by-marriott", 2),
  g("rohit-bal-ajsk-tarun-tahiliani", 3),
  g("chudhary-wedding-hyderabad", 4),
  g("mughal-e-azam", 3),
];

export default function AboutPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero
        eyebrow="About Effects Tech"
        title={
          <>
            We build the <em className="foil italic">extraordinary</em>
          </>
        }
        text="The production house behind some of India's most memorable evenings."
        image={heroImages[1]}
      />

      {/* Manifesto */}
      <section className="container-x section text-center">
        <span className="hairline mx-auto mb-12" />
        <p className="eyebrow mb-10">Our story</p>
        <p data-anim="words" className="font-display mx-auto max-w-5xl text-3xl leading-snug sm:text-5xl sm:leading-tight">
          With over eighteen years of turnkey production, a pool of gifted professionals and an expansive infrastructure,
          Effects Tech is equipped to take on events of any magnitude — and to make every one of them unforgettable.
        </p>
        <dl className="border-line mx-auto mt-24 grid max-w-5xl grid-cols-2 border-y lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="py-10">
              <dd className="font-display foil text-5xl sm:text-7xl" data-anim="count">
                {s.value}
              </dd>
              <dt className="text-muted mt-4 text-[10px] tracking-[0.36em] uppercase">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* What we do */}
      <section className="bg-surface section">
        <div className="container-x">
          <SectionHead
            eyebrow="What we do"
            title={
              <>
                Integrated, <em className="foil italic">end to end</em>
              </>
            }
            text="Three specialist worlds, powered by one production house."
          />
          <HoverReveal items={offerings} />
        </div>
      </section>

      {/* Founder */}
      <section className="container-x section">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-28">
            <Photo
              src={founderImage}
              alt="Sarosh Patel, founder of Effects Tech"
              className="mx-auto aspect-[4/5] max-w-md rounded-t-full"
            />
          </div>
          <div className="lg:pt-24">
            <p className="eyebrow mb-6">Meet the founder</p>
            <h2 className="display text-5xl italic sm:text-7xl" data-anim="heading">
              Sarosh Patel
            </h2>
            <p className="font-serif text-accent mt-12 text-2xl leading-snug italic sm:text-3xl">
              A design practice born from solving problems on the spot.
            </p>
            <div className="text-muted mt-10 space-y-6 text-lg leading-loose">
              <p>
                Sarosh started out twenty-five years ago with an event production company and moved into set design while
                handling bigger and bigger projects.
              </p>
              <p>
                Effects Tech was led naturally into design by last-minute changes — a new location, a client request, a
                designer unhappy with a set as it stood. Over time the team began designing for repeat clients, and before
                long it was doing so all the time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="border-line border-t">
        <div className="container-x section">
          <SectionHead
            eyebrow="Our approach"
            title={
              <>
                Five steps to an <em className="foil italic">unforgettable</em> evening
              </>
            }
          />
          <StickySteps steps={method} />
        </div>
      </section>

      {/* Filmstrip */}
      <section className="overflow-hidden py-6" aria-label="Moments from our events">
        {[filmstrip, [...filmstrip].reverse()].map((row, r) => (
          <div key={r} className={`marquee flex w-max gap-3 py-1.5 ${r ? "marquee-rev" : ""}`}>
            {[...row, ...row].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                className="grade h-44 w-72 shrink-0 object-cover sm:h-60 sm:w-96"
              />
            ))}
          </div>
        ))}
      </section>

      {/* Who we create for */}
      <section className="container-x section">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow mb-6">Who we create for</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-4xl xl:text-5xl" data-anim="heading">
              A curated circle of <em className="foil italic">partners</em>
            </h2>
            <ul className="mt-12">
              {partners.map((p) => (
                <li key={p} className="border-line group flex items-center gap-5 border-b py-5">
                  <span className="text-accent text-[8px]">◆</span>
                  <span className="font-display group-hover:text-accent text-2xl transition-colors duration-500 sm:text-3xl">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-6">Why Effects Tech</p>
            <div className="grid gap-px sm:grid-cols-2">
              {whyUs.map((w, i) => (
                <Reveal
                  key={w.title}
                  delay={i * 90}
                  className="border-line hover:bg-surface border p-8 transition-colors duration-700"
                >
                  <p className="font-serif foil text-4xl italic">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-serif mt-6 text-2xl italic">{w.title}</h3>
                  <p className="text-muted mt-3 text-sm leading-relaxed">{w.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Houses */}
      <section className="bg-surface section text-center">
        <p className="eyebrow mb-12">Our success lies in our associations</p>
        <ul className="container-x flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {houses.map((h, i) => (
            <li key={h}>
              <Reveal delay={i * 60}>
                <span className="font-serif text-fg/85 hover:text-accent text-3xl italic transition-colors duration-500 sm:text-5xl">
                  {h}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="container-x section">
        <SectionHead
          eyebrow="FAQs"
          title={
            <>
              Questions, <em className="italic">answered</em>
            </>
          }
        />
        <div className="border-line mx-auto max-w-3xl border-t">
          {faqs.map((f) => (
            <details key={f.q} className="border-line group border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                <span className="font-display group-open:text-accent text-xl transition-colors sm:text-2xl">{f.q}</span>
                <span className="text-accent text-2xl transition-transform duration-500 group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="text-muted pb-8 leading-loose">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link href="/contact" className="link-arrow">
            Ask us anything else <Arrow />
          </Link>
        </div>
      </section>

    </>
  );
}
