import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTABanner() {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />

      <div className="section-padding">
        <div className="container-main text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-white"
          >
            Have an Apartment Community That Needs Work?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-300 max-w-xl mx-auto"
          >
            From single-unit make-readies to full property renovation programs
            &mdash; we deliver.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Request a Bid
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
