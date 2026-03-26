import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import PostBody from '@/components/sections/blog/PostBody';
import RelatedPosts from '@/components/sections/blog/RelatedPosts';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function ShareButton({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-light-gray border border-gray-200 text-charcoal/60 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
    >
      {children}
    </a>
  );
}

export default function BlogPostPage({ post, relatedPosts }) {
  if (!post) return null;

  const postUrl = `https://saadiconstructiongroup.com/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Person',
      name: post.author || 'Saadi Construction Group',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saadi Construction Group',
      url: 'https://saadiconstructiongroup.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://saadiconstructiongroup.com/og-image.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    ...(post.cover_image_url && { image: post.cover_image_url }),
    ...(post.meta_description && { description: post.meta_description }),
  };

  return (
    <>
      <SEO
        title={
          post.meta_title ||
          `${post.title} | Saadi Construction Group`
        }
        description={
          post.meta_description ||
          post.excerpt ||
          `Read "${post.title}" on the Saadi Construction Group blog.`
        }
        ogImage={post.cover_image_url || '/og-image.jpg'}
        canonicalUrl={postUrl}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Cover Image / Hero */}
      <section className="relative min-h-[50vh] flex items-end bg-gradient-to-br from-navy via-[#14304d] to-charcoal overflow-hidden">
        {post.cover_image_url ? (
          <>
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,149,42,0.1),transparent_60%)]" />
        )}

        <div className="relative z-10 container-main px-4 py-16 md:py-24">
          {post.category && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-full bg-gold/90 text-white"
            >
              {post.category}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-3xl"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-300"
          >
            {post.published_at && (
              <time dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            )}
            {post.author && (
              <>
                <span className="text-gray-500">|</span>
                <span>{post.author}</span>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Post Body */}
      <PostBody content={post.content} />

      {/* Share + CTA */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container-main px-4 max-w-3xl mx-auto">
          {/* Social Share */}
          <div className="flex items-center gap-4 mb-12">
            <span className="text-sm font-semibold text-charcoal">Share:</span>
            <ShareButton
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              label="Twitter"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </ShareButton>
            <ShareButton
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              label="LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </ShareButton>
            <ShareButton
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              label="Facebook"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </ShareButton>
          </div>

          {/* CTA Banner */}
          <motion.div
            {...fadeInUp}
            className="rounded-xl bg-navy p-8 md:p-10 text-center"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
              Planning a renovation? Request a bid.
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Tell us about your property and we will put together a detailed scope and estimate.
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-block text-lg px-8 py-4"
            >
              Request a Bid
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let post = null;
  let relatedPosts = [];

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
        .select('*')
        .eq('slug', params.slug)
        .eq('status', 'published')
        .single();

      if (error || !data) {
        return { notFound: true };
      }

      post = data;

      // Fetch related posts (same category, exclude current)
      if (post.category) {
        const { data: related } = await supabase
          .from('blog_posts')
          .select(
            'slug, title, excerpt, cover_image_url, category, published_at'
          )
          .eq('status', 'published')
          .eq('category', post.category)
          .neq('slug', post.slug)
          .order('published_at', { ascending: false })
          .limit(3);

        if (related) relatedPosts = related;
      }
    } else {
      return { notFound: true };
    }
  } catch (err) {
    console.error('Error fetching blog post:', err.message);
    return { notFound: true };
  }

  return {
    props: {
      post,
      relatedPosts,
    },
  };
}
