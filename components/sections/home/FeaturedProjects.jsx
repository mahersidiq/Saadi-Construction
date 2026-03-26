import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';

const placeholders = [
  { title: 'Coming Soon', location: 'Houston, TX', units: '--' },
  { title: 'Coming Soon', location: 'Houston, TX', units: '--' },
  { title: 'Coming Soon', location: 'Houston, TX', units: '--' },
];

export default function FeaturedProjects({ projects = [] }) {
  const items = projects.length > 0 ? projects.slice(0, 3) : placeholders;
  const hasReal = projects.length > 0;

  return (
    <section className="section-padding bg-light-gray">
      <div className="container-main">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-charcoal text-center"
        >
          Recent Apartment Renovation Projects
        </motion.h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project, i) => {
            const card = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-navy to-charcoal flex items-center justify-center">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-gold/40" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-charcoal">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.location || project.city || 'Houston, TX'}
                  </p>
                  {(project.unit_count || project.units) && (
                    <p className="text-sm text-gold font-semibold mt-2">
                      {project.unit_count || project.units} Units
                    </p>
                  )}
                </div>
              </motion.div>
            );

            return hasReal && project.slug ? (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                {card}
              </Link>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
