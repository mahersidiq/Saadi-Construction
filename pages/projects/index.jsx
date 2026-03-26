import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import ProjectFilter from '@/components/sections/projects/ProjectFilter';
import ProjectCard from '@/components/sections/projects/ProjectCard';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/** Placeholder projects when Supabase is not configured */
const placeholderProjects = [
  {
    slug: 'example-project-1',
    title: 'Garden-Style Community Renovation',
    location: 'Houston, TX',
    unit_count: 240,
    scope_type: 'Full Gut Rehab',
    image_url: null,
  },
  {
    slug: 'example-project-2',
    title: 'Mid-Rise Value-Add Program',
    location: 'Katy, TX',
    unit_count: 180,
    scope_type: 'Unit Interior Renovation',
    image_url: null,
  },
  {
    slug: 'example-project-3',
    title: 'Suburban Apartment Rehab',
    location: 'Sugar Land, TX',
    unit_count: 120,
    scope_type: 'Make Ready',
    image_url: null,
  },
  {
    slug: 'example-project-4',
    title: 'Clubhouse & Amenity Renovation',
    location: 'The Woodlands, TX',
    unit_count: 300,
    scope_type: 'Amenity Renovation',
    image_url: null,
  },
  {
    slug: 'example-project-5',
    title: 'Exterior & Curb Appeal Overhaul',
    location: 'Pearland, TX',
    unit_count: 200,
    scope_type: 'Exterior & Curb Appeal',
    image_url: null,
  },
  {
    slug: 'example-project-6',
    title: 'Common Area Modernization',
    location: 'Spring, TX',
    unit_count: 160,
    scope_type: 'Common Area Renovation',
    image_url: null,
  },
];

const projectCategories = ['Gut Rehab', 'Interior', 'Common Areas', 'Exterior'];

export default function ProjectsIndexPage({ projects }) {
  const [activeFilter, setActiveFilter] = useState(null);

  const filtered = activeFilter
    ? projects.filter((p) => p.scope_type === activeFilter)
    : projects;

  return (
    <>
      <SEO
        title="Apartment Renovation Projects | Saadi Construction Group | Houston, TX"
        description="View our portfolio of apartment renovation projects across Houston and surrounding areas. Full gut rehabs, value-add programs, and property-wide renovations."
        keywords="apartment renovation projects Houston, multifamily renovation portfolio, apartment rehab before after"
        canonicalUrl="https://saadiconstructiongroup.com/projects"
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
            Apartment Renovation Projects — Houston and Surrounding Areas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Apartment renovation work across Houston and surrounding communities.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <ProjectFilter
            categories={projectCategories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <motion.div {...fadeInUp} className="text-center py-16">
              <p className="text-lg text-gray-500">
                No projects found for the selected filter.
              </p>
              <button
                onClick={() => setActiveFilter(null)}
                className="mt-4 text-gold font-semibold hover:underline"
              >
                View all projects
              </button>
            </motion.div>
          )}
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
              Planning a Similar Renovation?
            </motion.h2>
            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="mt-4 text-lg text-gray-300 max-w-xl mx-auto"
            >
              Tell us about your property and we&apos;ll provide a detailed scope and estimate.
            </motion.p>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="mt-8">
              <a href="/contact" className="btn-primary text-lg px-8 py-4">
                Request a Bid
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  let projects = [];

  try {
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { data } = await supabase
        .from('projects')
        .select('slug, title, location, unit_count, scope_type, image_url')
        .order('sort_order', { ascending: true });

      if (data && data.length > 0) {
        projects = data;
      }
    }
  } catch (err) {
    console.error('Error fetching projects:', err.message);
  }

  // Fall back to placeholders if no projects
  if (projects.length === 0) {
    projects = placeholderProjects;
  }

  return {
    props: {
      projects,
    },
  };
}
