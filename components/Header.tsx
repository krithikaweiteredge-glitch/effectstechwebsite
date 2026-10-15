/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, verticals } from "@/lib/data";

const links = [
  ...verticals.map((v) => ({ href: `/${v.slug}`, label: v.short })),
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-theme="noir"
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        hidden && !open ? "-translate-y-full" : ""
      } ${
        open
          ? "bg-[#070707]"
          : scrolled
            ? "border-b border-[#c9a96e]/20 bg-[#070707]/85 backdrop-blur-md"
            : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0 cursor-pointer" aria-label={`${site.name} home`}>
          <img src={site.logo} alt={site.name} width={148} height={40} className="h-9 w-auto sm:h-10" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`hover:text-accent cursor-pointer text-[10px] tracking-[0.32em] uppercase transition-colors duration-300 ${
                isActive(l.href) ? "text-accent" : "text-white/85"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn hidden min-h-11 px-6 sm:inline-flex">
            Enquire
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[7px] xl:hidden"
          >
            <span className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="container-x flex h-[calc(100svh-5rem)] flex-col justify-between overflow-y-auto pt-6 pb-10 xl:hidden"
        >
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-white/10">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`font-display block cursor-pointer py-4 text-3xl ${isActive(l.href) ? "text-accent" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn w-full">
              Enquire now
            </Link>
            <p className="mt-6 text-sm text-white/60">
              {site.phones[0]} · {site.email}
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
