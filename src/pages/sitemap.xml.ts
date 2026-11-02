export const prerender = true;
import { allServices } from "@/data/services";
import { serviceAreas } from "@/data/serviceAreas";
import { blogPosts } from "@/data/blogPosts";
import { business } from "@/data/business";
// Omit lastmod for pages without a known content modification date. Build time is not a content update.
const urls = [
  "",
  "/about",
  "/contact",
  "/services",
  "/service-areas",
  "/projects",
  "/blog",
  ...allServices.map((s) => `/services/${s.slug}`),
  ...serviceAreas.map((a) => `/service-areas/${a.slug}`),
  ...blogPosts.map((p) => `/blog/${p.slug}`),
];
export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url><loc>${business.url}${path}</loc></url>`).join("\n")}\n</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
