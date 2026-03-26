import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Hammer, Bath, CookingPot, Layers, Paintbrush, Wrench, Zap, Wind,
  DoorOpen, Building2, Fence, Briefcase, Star, ParkingCircle, Umbrella,
  Droplets, HardHat, TrendingUp, Users, SprayCan,
} from 'lucide-react';
import { serviceCategories } from '@/data/services';

const iconMap = {
  'full-gut-rehab': Hammer,
  'unit-interior-renovation': Layers,
  'bathroom-remodel': Bath,
  'kitchen-renovation': CookingPot,
  'flooring-installation': Layers,
  'painting-drywall': Paintbrush,
  plumbing: Wrench,
  electrical: Zap,
  hvac: Wind,
  'window-door-replacement': DoorOpen,
  'common-area-renovation': Building2,
  'exterior-curb-appeal': Fence,
  'leasing-office-remodel': Briefcase,
  'amenity-renovation': Star,
  'parking-lot-concrete': ParkingCircle,
  'roof-repair': Umbrella,
  'waterproofing-drainage': Droplets,
  'construction-management': HardHat,
  'value-add-programs': TrendingUp,
  'occupied-renovation': Users,
  'make-ready': SprayCan,
};

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-charcoal text-center"
        >
          Full-Scope Apartment Renovation Services
        </motion.h2>

        {serviceCategories.map((category, ci) => (
          <div key={category.slug} className="mt-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-xl font-semibold text-navy mb-6"
            >
              {category.name}
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.services.map((service, si) => {
                const Icon = iconMap[service.slug] || Hammer;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: si * 0.05 }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex flex-col items-center gap-3 rounded-xl border border-mid-gray p-5 text-center hover:shadow-lg hover:border-gold transition-all duration-200"
                    >
                      <Icon className="w-7 h-7 text-gold" />
                      <span className="text-sm font-medium text-charcoal">
                        {service.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
