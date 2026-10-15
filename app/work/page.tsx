import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";
import { PageHero } from "@/components/ui";
import { getVertical, heroImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Portfolio and case studies from Effects Tech — theatre, fashion shows, corporate summits, brand experiences and weddings.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ vertical?: string }> }) {
  const initial = getVertical((await searchParams).vertical ?? "")?.slug ?? "all";

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Extravagance <em className="foil italic">meets events</em>
          </>
        }
        text="Fashion weeks, award nights, palace weddings and global summits — a string of successes."
        image={heroImages[2]}
      />
      <section className="container-x section">
        <WorkGrid initial={initial} />
      </section>
    </>
  );
}
