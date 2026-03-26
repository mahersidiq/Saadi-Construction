import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function NearbyAreas({ nearbyAreas }) {
  if (!nearbyAreas || nearbyAreas.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-light-gray">
      <div className="container-main px-4">
        <motion.h2
          {...fadeInUp}
          className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-10 text-center"
        >
          Nearby Service Areas
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {nearbyAreas.map((area, i) => (
            <motion.div
              key={area.slug}
              {...fadeInUp}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={`/service-areas/${area.slug}`}
                className="flex items-center justify-between rounded-lg bg-white p-5 border border-gray-200 hover:border-gold/50 hover:shadow-md transition-all duration-300 group"
              >
                <span className="font-semibold text-charcoal group-hover:text-navy transition-colors">
                  {area.name}
                </span>
                <svg
                  className="h-5 w-5 text-gray-400 group-hover:text-gold transition-colors"
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
