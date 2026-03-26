import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import ProjectGallery from '@/components/sections/projects/ProjectGallery';
import ProjectCard from '@/components/sections/projects/ProjectCard';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ProjectDetailPage({ project, relatedProjects }) {
  if (!project) return null;

  const {
    title,
    location,
    unit_count,
    scope_type,
    description,
    body,
    image_url,
    gallery,
  } = project;

  return (
    <>
      <SEO
        title={`${title} | Saadi Construction Group`}
        description={
          description ||
          `${title} — apartment renovation project in ${location || 'Houston, TX'} by Saadi Construction Group.`
        }
        keywords={`apartment renovation ${location || 'Houston'}, ${scope_type || 'multifamily renovation'}`}
        canonicalUrl={`https://saadiconstructiongroup.com/projects/${project.slug}`}
        ogImage={image_url || '/og-image.jpg'}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end bg-gradient-to-br from-navy via-[#14304d] to-charcoal overflow-hidden">
        {image_url && (
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />

        <div className="relative z-10 container-main px-4 pb-16 pt-32 md:pb-20">
          {scope_type && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase rounded-full bg-gold/15 text-gold border border-gold/30"
            >
              {scope_type}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4 mt-6"
          >
            {location && (
              <span className="flex items-center gap-2 text-gray-300">
                <svg
                  className="h-5 w-5"
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
                {location}
              </span>
            )}
            {unit_count && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium text-gray-300">
                {unit_count} Units
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Description / Body */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-main px-4">
          {description && (
            <motion.div {...fadeInUp} className="max-w-3xl mx-auto mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-6">
                Project Overview
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
            </motion.div>
          )}

          {body && (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="max-w-3xl mx-auto prose prose-lg
                prose-headings:font-heading prose-headings:text-charcoal prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-gold prose-a:font-semibold
                prose-strong:text-charcoal
                prose-ul:space-y-2 prose-li:text-gray-700
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}

          {!description && !body && (
            <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center py-8">
              <p className="text-gray-500 text-lg">
                Project details coming soon.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <ProjectGallery images={gallery || []} />

      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container-main px-4">
            <motion.h2
              {...fadeInUp}
              className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-10 text-center"
            >
              Related Projects
            </motion.h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

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
              Request a bid and let&apos;s discuss your project.
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

export async function getServerSideProps({ params }) {
  let project = null;
  let relatedProjects = [];

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
        .select('*')
        .eq('slug', params.slug)
        .single();

      if (data) {
        project = data;

        // Fetch related projects (same scope_type, excluding current)
        const { data: related } = await supabase
          .from('projects')
          .select('slug, title, location, unit_count, scope_type, image_url')
          .neq('slug', params.slug)
          .eq('scope_type', data.scope_type || '')
          .order('created_at', { ascending: false })
          .limit(3);

        if (related && related.length > 0) {
          relatedProjects = related;
        }
      }
    }
  } catch (err) {
    console.error('Error fetching project:', err.message);
  }

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
      relatedProjects,
    },
  };
}
