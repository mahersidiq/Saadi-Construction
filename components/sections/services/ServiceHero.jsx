import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ServiceHero({ title, subheadline, category }) {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-navy via-[#14304d] to-charcoal overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,149,42,0.1),transparent_60%)]" />

      <div className="relative z-10 container-main px-4 py-20 md:py-28">
        {category && (
          <motion.span
            {...fadeInUp}
            className="inline-block mb-4 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase rounded-full bg-gold/15 text-gold border border-gold/30"
          >
            {category}
          </motion.span>
        )}

        <motion.h1
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl"
        >
          {title}
        </motion.h1>

        {subheadline && (
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            {subheadline}
          </motion.p>
        )}

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.3 }}
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
