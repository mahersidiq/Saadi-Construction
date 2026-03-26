import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ProjectCard({ project }) {
  const { slug, title, location, unit_count, scope_type, image_url } = project;

  return (
    <motion.div {...fadeInUp}>
      <Link
        href={`/projects/${slug}`}
        className="group block rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy to-charcoal">
          {image_url ? (
            <Image
              src={image_url}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-16 w-16 text-white/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z"
                />
              </svg>
            </div>
          )}

          {/* Scope type badge */}
          {scope_type && (
            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-gold/90 text-white">
              {scope_type}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-navy transition-colors line-clamp-2">
            {title}
          </h3>

          <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
            {location && (
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4"
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
              <span className="px-2 py-0.5 rounded bg-light-gray text-xs font-medium text-charcoal">
                {unit_count} Units
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
