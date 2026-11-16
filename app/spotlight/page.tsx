import type { Metadata } from "next";
import Gallery from "@/components/motion/Gallery";
import { PageHero } from "@/components/ui";
import { spotlight } from "@/lib/spotlight";

export const metadata: Metadata = {
  title: "Spotlight",
  description: "Stars, showstoppers and red carpets from the events Effects Tech has produced.",
  alternates: { canonical: "/spotlight" },
};

export default function SpotlightPage() {
  const events = new Set(spotlight.map((p) => p.event)).size;
  return (
    <>
      <PageHero
        eyebrow="Stars at our events"
        title={
          <>
            In the <em className="foil italic">spotlight</em>
          </>
        }
        text="Showstoppers, red carpets and the stars who lit up the evenings we produced."
        image={spotlight[0].image}
      />
      <section className="container-x section">
        <p className="text-muted mb-14 text-center text-[10px] tracking-[0.36em] uppercase">
          {spotlight.length} moments · {events} events · click any photo to view
        </p>
        <Gallery items={spotlight} />
      </section>
    </>
  );
}
