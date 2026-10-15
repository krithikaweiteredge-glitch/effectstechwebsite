import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import MapEmbed from "@/components/MapEmbed";
import { PageHero } from "@/components/ui";
import { getVertical, heroImages, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Enquire with Effects Tech about experiences, meetings & events or weddings.",
  alternates: { canonical: "/contact" },
};

const tel = (p: string) => `tel:+91${p.replace(/\D/g, "").replace(/^0/, "")}`;

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ vertical?: string }> }) {
  const vertical = getVertical((await searchParams).vertical ?? "");

  return (
    <div data-theme={vertical?.slug ?? "master"} className="bg-bg text-fg">
      <PageHero
        eyebrow={vertical ? `Enquire — ${vertical.name}` : "By invitation"}
        title={
          <>
            Begin a <em className="foil italic">conversation</em>
          </>
        }
        text="Share a few details in confidence, and our team will be in touch personally."
        image={vertical?.image ?? heroImages[3]}
      />
      <section className="container-x section">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <EnquiryForm key={vertical?.slug ?? "general"} initial={vertical?.slug ?? "general"} />

          <aside className="space-y-10">
            <div>
              <h2 className="eyebrow mb-4">Studio</h2>
              <address className="font-serif text-2xl leading-snug italic">{site.address}</address>
            </div>
            <div>
              <h2 className="eyebrow mb-4">Call</h2>
              <ul className="space-y-1 text-lg">
                {site.phones.map((p) => (
                  <li key={p}>
                    <a href={tel(p)} className="hover:text-accent transition-colors">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-4">Email</h2>
              <a href={`mailto:${site.email}`} className="hover:text-accent text-lg transition-colors">
                {site.email}
              </a>
              <ul className="text-muted mt-5 space-y-4 text-sm">
                {site.contacts.map((c) => (
                  <li key={c.email}>
                    <span className="text-fg block">
                      {c.name} · {c.role}
                    </span>
                    <a href={`mailto:${c.email}`} className="hover:text-accent transition-colors">
                      {c.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-4">Follow</h2>
              <ul className="flex gap-6 text-[10px] tracking-[0.36em] uppercase">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <MapEmbed address={site.address} />
    </div>
  );
}
