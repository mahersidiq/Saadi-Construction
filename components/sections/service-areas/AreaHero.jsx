import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AreaHero({ name, county, headline }) {
  return (
    <section className="relative min-h-[55vh] flex items-center bg-gradient-to-br from-navy via-[#14304d] to-charcoal overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,149,42,0.08),transparent_60%)]" />

      <div className="relative z-10 container-main px-4 py-20 md:py-28">
        {county && (
          <motion.span
            {...fadeInUp}
            className="inline-block mb-4 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase rounded-full bg-white/10 text-gray-300 border border-white/20"
          >
            {county} County
          </motion.span>
        )}

        <motion.h1
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl"
        >
          {headline || `Apartment Renovation in ${name}`}
        </motion.h1>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10"
        >
          <Link
            href="/contact"
            className="btn-primary inline-block text-lg px-8 py-4"
          >
            Request a Bid
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
