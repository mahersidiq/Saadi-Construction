export const serviceCategories = [
  {
    name: 'Unit Renovation',
    slug: 'unit-renovation',
    services: [
      {
        slug: 'full-gut-rehab',
        name: 'Full Gut Rehab',
        category: 'Unit Renovation',
        description: 'Complete unit demolition and reconstruction. From stripped walls to move-in ready — kitchens, baths, flooring, paint, doors, and all finishes delivered on schedule.',
      },
      {
        slug: 'unit-interior-renovation',
        name: 'Unit Interior Renovation',
        category: 'Unit Renovation',
        description: 'Targeted interior upgrades that drive rent premiums. We scope, schedule, and execute kitchen and bath renovations, flooring replacement, and full interior refresh programs across any number of units.',
      },
    ],
  },
  {
    name: 'Property-Wide',
    slug: 'property-wide',
    services: [
      {
        slug: 'common-area-amenity-renovation',
        name: 'Common Area & Amenity Renovation',
        category: 'Property-Wide',
        description: 'Clubhouse renovations, fitness centers, leasing offices, and amenity build-outs that reposition your property and justify premium rents.',
      },
      {
        slug: 'exterior-curb-appeal',
        name: 'Exterior & Curb Appeal',
        category: 'Property-Wide',
        description: 'Facade upgrades, siding replacement, window and door packages, breezeways, and exterior painting programs that transform first impressions at the property line.',
      },
    ],
  },
  {
    name: 'Management',
    slug: 'management',
    services: [
      {
        slug: 'value-add-programs',
        name: 'Value-Add Programs',
        category: 'Management',
        description: 'Phased renovation programs designed around your occupancy and budget. We plan capital deployment, sequence unit turns, and execute renovation programs that maximize NOI impact without disrupting operations.',
      },
      {
        slug: 'construction-management',
        name: 'Construction Management',
        category: 'Management',
        description: 'Owner-side construction management for larger capital programs. Scope development, contractor procurement, scheduling, and quality control — with MRS accountability on every project.',
      },
    ],
  },
];

export const allServices = serviceCategories.flatMap((cat) => cat.services);

export default serviceCategories;
