import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { serviceCategories } from '@/data/services';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ServicesIndexPage({ categories }) {
  return (
    <>
      <SEO
        title="Apartment Renovation Services Houston TX | Saadi Construction Group"
        description="Comprehensive apartment renovation services in Houston. Unit rehabs, kitchen and bathroom remodels, common area renovations, exterior upgrades, and construction management."
        keywords="apartment renovation services Houston, multifamily renovation, unit rehab, kitchen remodel apartments"
        canonicalUrl="https://saadiconstructiongroup.com/services"
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-gradient-to-br from-navy via-[#14304d] to-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,149,42,0.08),transparent_60%)]" />
        <div className="relative z-10 container-main px-4 py-20 md:py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Apartment Renovation Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            From single-unit make-readies to full property renovation programs,
            we deliver every scope of multifamily renovation work.
          </motion.p>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section-padding bg-white">
        <div className="container-main">
          {categories.map((category, catIdx) => (
            <div key={category.slug} className="mb-16 last:mb-0">
              <motion.h2
                {...fadeInUp}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-8 pb-3 border-b-2 border-gold/30"
              >
                {category.name}
              </motion.h2>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service, i) => (
                  <motion.div
                    key={service.slug}
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center gap-4 rounded-xl bg-light-gray p-6 border border-gray-200 hover:border-gold/50 hover:shadow-lg transition-all duration-300 h-full"
                    >
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
                            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-navy transition-colors">
                          {service.name}
                        </h3>
                        <span className="text-sm text-gold font-semibold mt-1 inline-flex items-center">
                          Learn More
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
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
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
              Not Sure Which Service You Need?
            </motion.h2>
            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-gray-300 max-w-xl mx-auto"
            >
              Tell us about your property and we&apos;ll recommend the right scope of work.
            </motion.p>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="mt-8">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Request a Bid
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      categories: serviceCategories,
    },
  };
}
