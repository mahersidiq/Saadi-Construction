import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-charcoal via-navy to-charcoal overflow-hidden">
      {/* Decorative overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,149,42,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(27,58,92,0.4),transparent_60%)]" />

      <div className="relative z-10 container-main text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto"
        >
          Houston&apos;s Apartment Renovation &amp; Rehab Specialists
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Full gut rehabs, unit remodels, and complete multifamily renovation
          services for apartment owners and operators across Houston and
          surrounding areas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-primary text-lg px-8 py-4">
            Request a Bid
          </Link>
          <Link href="/projects" className="btn-outline text-lg px-8 py-4">
            View Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
