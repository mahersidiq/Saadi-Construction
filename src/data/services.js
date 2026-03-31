export const serviceCategories = [
  {
    name: 'Unit Renovation Services',
    slug: 'unit-renovation',
    services: [
      { name: 'Full Gut Rehab', slug: 'full-gut-rehab' },
      { name: 'Unit Interior Renovation', slug: 'unit-interior-renovation' },
      { name: 'Bathroom Remodel', slug: 'bathroom-remodel' },
      { name: 'Kitchen Renovation', slug: 'kitchen-renovation' },
      { name: 'Flooring Installation', slug: 'flooring-installation' },
      { name: 'Painting & Drywall', slug: 'painting-drywall' },
      { name: 'Plumbing', slug: 'plumbing' },
      { name: 'Electrical', slug: 'electrical' },
      { name: 'HVAC', slug: 'hvac' },
      { name: 'Window & Door Replacement', slug: 'window-door-replacement' },
    ],
  },
  {
    name: 'Property-Wide Services',
    slug: 'property-wide',
    services: [
      { name: 'Common Area Renovation', slug: 'common-area-renovation' },
      { name: 'Exterior & Curb Appeal', slug: 'exterior-curb-appeal' },
      { name: 'Leasing Office Remodel', slug: 'leasing-office-remodel' },
      { name: 'Amenity Renovation', slug: 'amenity-renovation' },
      { name: 'Parking Lot & Concrete', slug: 'parking-lot-concrete' },
      { name: 'Roof Repair', slug: 'roof-repair' },
      { name: 'Waterproofing & Drainage', slug: 'waterproofing-drainage' },
    ],
  },
  {
    name: 'Management Services',
    slug: 'management',
    services: [
      { name: 'Construction Management', slug: 'construction-management' },
      { name: 'Value-Add Programs', slug: 'value-add-programs' },
      { name: 'Occupied Renovation', slug: 'occupied-renovation' },
      { name: 'Make Ready', slug: 'make-ready' },
    ],
  },
];

export const allServices = serviceCategories.flatMap((cat) => cat.services);

export default serviceCategories;
