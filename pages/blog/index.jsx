import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import PostCard from '@/components/sections/blog/PostCard';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const categories = [
  'All',
  'Industry Insights',
  'Project Updates',
  'Renovation Tips',
  'Market News',
  'Cost Guides',
];

export default function BlogIndexPage({ posts }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Apartment Renovation Blog | Saadi Construction Group | Houston, TX"
        description="Insights on apartment renovation in Houston. Industry trends, project updates, renovation tips, cost guides, and market news for multifamily owners and operators."
        keywords="apartment renovation blog, multifamily renovation insights, Houston apartment renovation tips"
        canonicalUrl="https://saadiconstructiongroup.com/blog"
      />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center bg-gradient-to-br from-navy via-[#14304d] to-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,149,42,0.08),transparent_60%)]" />
        <div className="relative z-10 container-main px-4 py-20 md:py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Apartment Renovation Insights — Houston, TX
          </motion.h1>
        </div>
      </section>

      {/* Category Filter + Posts */}
      <section className="section-padding bg-white">
        <div className="container-main px-4">
          {/* Category Filter */}
          <motion.div
            {...fadeInUp}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-light-gray text-charcoal hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <motion.div
              {...fadeInUp}
              className="text-center py-16"
            >
              <svg
                className="mx-auto h-16 w-16 text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5"
                />
              </svg>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-2">
                No Posts Yet
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                {activeCategory !== 'All'
                  ? `No articles in "${activeCategory}" yet. Check back soon or browse all categories.`
                  : 'We are working on new content. Check back soon for apartment renovation insights and updates.'}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  let posts = [];

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

      const { data, error } = await supabase
        .from('blog_posts')
        .select(
          'slug, title, excerpt, cover_image_url, category, published_at'
        )
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (!error && data) {
        posts = data;
      }
    }
  } catch (err) {
    console.error('Error fetching blog posts:', err.message);
  }

  return {
    props: { posts },
  };
}
