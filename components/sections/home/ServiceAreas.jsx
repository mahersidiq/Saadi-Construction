import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { serviceAreas } from '@/data/serviceAreas';

export default function ServiceAreas() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-charcoal text-center"
        >
          Serving Houston and Surrounding Areas
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-gray-600 text-center max-w-2xl mx-auto"
        >
          Apartment renovation services across the Greater Houston metropolitan
          area.
        </motion.p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {serviceAreas.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              <Link
                href={`/service-areas/${area.slug}`}
                className="flex items-center gap-2 rounded-lg border border-mid-gray bg-light-gray px-4 py-3 hover:border-gold hover:shadow-md transition-all duration-200"
              >
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-sm font-medium text-charcoal truncate">
                  {area.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
