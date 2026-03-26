import Link from 'next/link';
import { motion } from 'framer-motion';
import { serviceCategories } from '@/data/services';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AreaServices({ name }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main px-4">
        <motion.h2
          {...fadeInUp}
          className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center"
        >
          Services Available in {name}
        </motion.h2>

        <div className="space-y-12 max-w-5xl mx-auto">
          {serviceCategories.map((category, catIdx) => (
            <motion.div
              key={category.slug}
              {...fadeInUp}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
            >
              <h3 className="font-heading text-xl font-bold text-navy mb-4">
                {category.name}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-3 rounded-lg bg-light-gray p-4 border border-gray-200 hover:border-gold/50 hover:shadow-md transition-all duration-300 group"
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="text-charcoal font-medium group-hover:text-navy transition-colors">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
