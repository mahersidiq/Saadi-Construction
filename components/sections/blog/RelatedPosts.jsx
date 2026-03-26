import { motion } from 'framer-motion';
import PostCard from './PostCard';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-light-gray">
      <div className="container-main px-4">
        <motion.h2
          {...fadeInUp}
          className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-10 text-center"
        >
          Related Articles
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
