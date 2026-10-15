import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, InsightCard, PageHero, Photo } from "@/components/ui";
import { faces, insights } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insights",
  description: "Event trends, destination guides, wedding ideas and MICE insights from the Effects Tech team.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="The journal"
        title={
          <>
            Notes from <em className="foil italic">behind the curtain</em>
          </>
        }
        text="Event trends, destination guides and the craft of celebration, from our team."
        image={faces[2].image}
      />
      <section className="container-x section">
        <Link
          href={`/insights/${insights[0].slug}`}
          data-cursor="Read"
          className="group mb-24 grid cursor-pointer items-center gap-10 lg:grid-cols-12 lg:gap-16"
        >
          <Photo
            src={insights[0].image}
            alt=""
            className="aspect-[16/10] lg:col-span-7"
            imgClassName="transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">
              Featured · {insights[0].category}
            </p>
            <h2 className="display group-hover:text-accent text-3xl transition-colors duration-500 sm:text-4xl xl:text-5xl">
              {insights[0].title}
            </h2>
            <p className="text-muted font-serif mt-6 text-xl leading-relaxed italic">{insights[0].excerpt}</p>
            <span className="link-arrow text-accent mt-8">
              Read the story <Arrow />
            </span>
          </div>
        </Link>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {insights.slice(1).map((post, i) => (
            <InsightCard key={post.slug} post={post} delay={(i % 3) * 100} />
          ))}
        </div>
      </section>
    </>
  );
}
