export const serviceCategories = [
  {
    name: "Inside the apartment",
    slug: "unit-renovation",
    services: [
      {
        slug: "unit-interior-renovation",
        name: "Unit Interior Renovation",
        category: "Apartment interiors",
        description:
          "Kitchen and bathroom updates, flooring, paint, lighting, and the repairs that tie the unit together.",
      },
      {
        slug: "full-gut-rehab",
        name: "Full Gut Rehab",
        category: "Apartment interiors",
        description:
          "A deeper rebuild when new finishes alone won’t address the condition of the apartment.",
      },
    ],
  },
  {
    name: "Across the community",
    slug: "property-wide",
    services: [
      {
        slug: "common-area-amenity-renovation",
        name: "Common Areas & Amenities",
        category: "Property-wide",
        description:
          "Leasing offices, clubhouses, fitness rooms, and shared spaces, planned around the people using them.",
      },
      {
        slug: "exterior-curb-appeal",
        name: "Exterior Improvements",
        category: "Property-wide",
        description:
          "Siding, paint, entrances, and exterior repairs. Address condition as well as appearance.",
      },
    ],
  },
  {
    name: "Planning the bigger job",
    slug: "management",
    services: [
      {
        slug: "value-add-programs",
        name: "Phased Renovation Programs",
        category: "Planning & coordination",
        description:
          "A repeatable unit scope and a phased schedule built around vacancy, materials, and your budget.",
      },
      {
        slug: "construction-management",
        name: "Construction Management",
        category: "Planning & coordination",
        description:
          "Scope, budgets, scheduling, trade coordination, and punch lists for a renovation with more moving parts.",
      },
    ],
  },
];
export const allServices = serviceCategories.flatMap(
  (category) => category.services,
);
export default serviceCategories;
