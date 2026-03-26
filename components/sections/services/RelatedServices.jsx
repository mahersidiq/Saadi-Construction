import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function RelatedServices({ relatedServices }) {
  if (!relatedServices || relatedServices.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-main px-4">
        <motion.h2
          {...fadeInUp}
          className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-10 text-center"
        >
          Related Services
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {relatedServices.slice(0, 3).map((service, i) => (
            <motion.div
              key={service.slug}
              {...fadeInUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="block h-full rounded-xl bg-light-gray p-6 md:p-8 border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="font-heading text-xl font-bold text-charcoal group-hover:text-navy transition-colors">
                  {service.name || service.title}
                </h3>
                {service.description && (
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                )}
                <span className="inline-flex items-center mt-4 text-sm font-semibold text-gold group-hover:gap-2 transition-all">
                  Learn More
                  <svg
                    className="ml-1 h-4 w-4"
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
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
