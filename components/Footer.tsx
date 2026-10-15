/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { site, verticals } from "@/lib/data";

const tel = (p: string) => `tel:+91${p.replace(/\D/g, "").replace(/^0/, "")}`;

export default function Footer() {
  return (
    <footer data-theme="noir" className="bg-bg text-fg border-line relative overflow-hidden border-t">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-24">
        <div>
          <img src={site.logo} alt={site.name} width={148} height={40} className="h-10 w-auto" />
          <p className="font-serif foil mt-8 text-3xl italic">{site.tagline}</p>
          <p className="text-muted mt-4 max-w-xs text-sm leading-relaxed">
            India&apos;s leading events production house. Think events, think Effects Tech.
          </p>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Verticals</h2>
          <ul className="space-y-3 text-sm">
            {verticals.map((v) => (
              <li key={v.slug}>
                <Link href={`/${v.slug}`} className="hover:text-accent cursor-pointer transition-colors">
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Company</h2>
          <ul className="space-y-3 text-sm">
            {[
              ["/about", "About"],
              ["/work", "Our Work"],
              ["/insights", "Insights"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-accent cursor-pointer transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Get in touch</h2>
          <address className="text-muted space-y-3 text-sm leading-relaxed not-italic">
            <p>{site.address}</p>
            <p>
              {site.phones.map((p, i) => (
                <span key={p}>
                  {i > 0 && " | "}
                  <a href={tel(p)} className="hover:text-accent transition-colors">
                    {p}
                  </a>
                </span>
              ))}
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-accent transition-colors">
                {site.email}
              </a>
            </p>
          </address>
          <ul className="mt-6 flex gap-6 text-[10px] tracking-[0.36em] uppercase">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-line border-t">
        <div className="container-x text-muted flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="tracking-[0.3em] uppercase">Experiences · Meetings &amp; Events · Weddings</p>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="font-display pointer-events-none px-4 pt-4 pb-[0.22em] text-center text-[14.5vw] leading-[1.05] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_rgb(201_169_110/0.3)]"
      >
        Effects Tech
      </p>
    </footer>
  );
}
