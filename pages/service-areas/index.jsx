import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { serviceAreas } from '@/data/serviceAreas';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ServiceAreasIndexPage() {
  return (
    <>
      <SEO
        title="Service Areas | Saadi Construction Group | Houston, TX"
        description="Saadi Construction Group provides apartment renovation services across Houston, Katy, Sugar Land, Pearland, The Woodlands, Spring, Cypress, and surrounding areas."
        keywords="apartment renovation Houston, multifamily renovation Katy, apartment rehab Sugar Land, renovation contractor The Woodlands"
        canonicalUrl="https://saadiconstructiongroup.com/service-areas"
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-navy via-[#14304d] to-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,149,42,0.08),transparent_60%)]" />
        <div className="relative z-10 container-main px-4 py-20 md:py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Apartment Renovation Services — Houston and Surrounding Areas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Serving apartment communities across Houston and the greater metro area.
          </motion.p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area, i) => (
              <motion.div
                key={area.slug}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group flex items-center justify-between rounded-xl bg-light-gray p-6 border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300 h-full"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-navy/10 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                      <svg
                        className="h-6 w-6 text-navy group-hover:text-gold transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-bold text-charcoal group-hover:text-navy transition-colors">
                        {area.name}
                      </h2>
                      {area.county && (
                        <p className="text-xs text-gray-500">{area.county} County</p>
                      )}
                      <span className="text-sm text-gold font-semibold mt-1 inline-flex items-center">
                        View Services
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />
        <div className="section-padding">
          <div className="container-main text-center">
            <motion.h2
              {...fadeInUp}
              className="font-heading text-3xl md:text-4xl font-bold text-white"
            >
              Don&apos;t See Your Area?
            </motion.h2>
            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-gray-300 max-w-xl mx-auto"
            >
              We may still be able to help. Contact us to discuss your project location.
            </motion.p>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="mt-8">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
