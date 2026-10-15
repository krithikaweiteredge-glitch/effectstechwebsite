import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Cursor from "@/components/motion/Cursor";
import MotionProvider from "@/components/motion/MotionProvider";
import VideoCta from "@/components/motion/VideoCta";
import { site } from "@/lib/data";
import "lenis/dist/lenis.css";
import "./globals.css";

// A wide, extended grotesk (in the spirit of luxury agency type) for everything,
// with a high-contrast serif italic reserved for accent words.
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const serif = Bodoni_Moda({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable}`}>
      <body className="font-light">
        <div className="preloader" aria-hidden="true">
          <div>
            <p className="pl-name">EFFECTS TECH</p>
            <span className="pl-rule" />
            <span className="pl-sub">Experience innovation</span>
          </div>
        </div>
        <div className="grain" aria-hidden="true" />
        <MotionProvider />
        <Cursor />
        <a
          href="#main"
          className="bg-accent text-on-accent sr-only z-[60] px-4 py-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <VideoCta />
        <Footer />
      </body>
    </html>
  );
}
