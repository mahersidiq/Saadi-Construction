import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

export default function PostCard({ post }) {
  const { slug, title, excerpt, cover_image_url, category, published_at } = post;

  return (
    <motion.div {...fadeInUp}>
      <Link
        href={`/blog/${slug}`}
        className="group block rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
      >
        {/* Cover image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-navy to-charcoal">
          {cover_image_url ? (
            <Image
              src={cover_image_url}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-14 w-14 text-white/20"
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
            </div>
          )}

          {/* Category badge */}
          {category && (
            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-gold/90 text-white">
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {published_at && (
            <time className="text-xs text-gray-400 uppercase tracking-wide">
              {formatDate(published_at)}
            </time>
          )}

          <h3 className="mt-2 font-heading text-lg font-bold text-charcoal group-hover:text-navy transition-colors line-clamp-2">
            {title}
          </h3>

          {excerpt && (
            <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          )}

          <span className="inline-flex items-center mt-4 text-sm font-semibold text-gold">
            Read More
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
  );
}
