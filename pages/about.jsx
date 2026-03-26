import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const values = [
  {
    title: 'Transparency',
    description:
      'We provide clear, detailed scopes, honest timelines, and open-book communication from bid to punch list. You always know where your project stands.',
  },
  {
    title: 'Competence',
    description:
      'Our team brings institutional-grade construction experience to every engagement — proper planning, disciplined scheduling, and quality execution across every trade.',
  },
  {
    title: 'Adaptability',
    description:
      'Every property is different. We tailor our approach to your asset, your residents, and your investment goals — whether it is a 20-unit rehab or a 300-unit repositioning.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Saadi Construction Group | Houston Apartment Renovation Contractor"
        description="Houston-based multifamily renovation firm delivering institutional-grade apartment renovation programs across 1,000+ units. Licensed general contractor serving Houston and surrounding areas."
        keywords="about Saadi Construction Group, Houston apartment renovation contractor, multifamily renovation firm Houston"
        canonicalUrl="https://saadiconstructiongroup.com/about"
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
            Multifamily Expertise. Owner Accountability.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            A Houston-based renovation firm built for apartment owners and
            operators who demand results.
          </motion.p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="container-main px-4 max-w-4xl">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Saadi Construction Group is a Houston-based multifamily renovation
              firm focused exclusively on apartment communities. We partner with
              property owners, operators, and investment groups to deliver
              renovation programs that protect asset value and drive returns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Track Record */}
      <section className="section-padding bg-light-gray">
        <div className="container-main px-4 max-w-4xl">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Our Track Record
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our team has delivered and managed construction programs across
              more than 1,000 multifamily units in Houston and surrounding areas
              — spanning ground-up garden-style communities, wrap developments,
              and large-scale renovation and rehab programs. That
              institutional-grade experience in planning, scheduling,
              procurement, and execution is what we bring to every project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Multifamily-Only Focus */}
      <section className="section-padding bg-white">
        <div className="container-main px-4 max-w-4xl">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Multifamily-Only Focus
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We do not renovate single-family homes, offices, or retail spaces.
              Every dollar we invest in systems, training, and trade
              relationships is directed at one thing: making apartment
              renovations run better. That singular focus means tighter scopes,
              faster turns, and fewer surprises on your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Area Coverage */}
      <section className="section-padding bg-light-gray">
        <div className="container-main px-4 max-w-4xl">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-6">
              Service Area
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We serve the Greater Houston metropolitan area including Katy,
              Sugar Land, Pearland, Pasadena, The Woodlands, Spring, Cypress,
              League City, Missouri City, Conroe, Baytown, Richmond,
              Friendswood, and Humble. If your property is within the Houston
              metro, we can get a team on site.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-main px-4 max-w-4xl">
          <motion.h2
            {...fadeInUp}
            className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center"
          >
            Our Values
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                {...fadeInUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-xl bg-light-gray p-8 border border-gray-200"
              >
                <h3 className="font-heading text-xl font-bold text-navy mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Statement */}
      <section className="bg-navy py-12">
        <div className="container-main px-4 text-center">
          <motion.p
            {...fadeInUp}
            className="text-lg font-semibold text-gold tracking-wide"
          >
            Licensed General Contractor | Houston, Texas | Licensed &amp;
            Insured
          </motion.p>
        </div>
      </section>
    </>
  );
}
