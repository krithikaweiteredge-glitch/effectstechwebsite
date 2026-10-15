import type { MetadataRoute } from "next";
import { insights, projects, site, verticals } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/work",
    "/insights",
    "/contact",
    ...verticals.map((v) => `/${v.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
    ...insights.map((i) => `/insights/${i.slug}`),
  ];
  return paths.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly", priority: path ? 0.7 : 1 }));
}
