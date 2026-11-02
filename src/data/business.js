export const business = {
  name: "Multifamily Rehab Specialists",
  shortName: "MRS",
  url: "https://multifamilyrehabspecialists.com",
  phone: "(832) 360-3804",
  phoneHref: "tel:+18323603804",
  email: "info@multifamilyrehabspecialists.com",
  location: "Houston, Texas",
};
// Add credentials, project totals, ratings, and street addresses only after confirmation.
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${business.url}/#business`,
  name: business.name,
  url: business.url,
  telephone: "+1-832-360-3804",
  email: business.email,
  description:
    "Apartment interior renovation, full rehabs, and property-wide improvements for multifamily owners and property managers in Greater Houston.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Houston",
    addressRegion: "TX",
    addressCountry: "US",
  },
  areaServed: { "@type": "Place", name: "Greater Houston, Texas" },
};
export function breadcrumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Home", ""], ...items].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${business.url}${path}`,
    })),
  };
}
