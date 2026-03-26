import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Custom404() {
  return (
    <>
      <SEO
        title="Page Not Found | Saadi Construction Group"
        description="The page you are looking for does not exist. Return to the Saadi Construction Group homepage."
        noindex
      />

      <section className="min-h-[80vh] flex items-center justify-center bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,149,42,0.06),transparent_70%)]" />

        <div className="relative z-10 text-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-8xl md:text-9xl font-extrabold font-heading text-gold/20">
              404
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mt-4"
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 text-lg text-gray-300 max-w-md mx-auto"
          >
            The page you are looking for does not exist or has been moved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="btn-primary text-lg px-8 py-4"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-lg border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white hover:border-gold hover:text-gold transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
