import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function PostBody({ content }) {
  if (!content) return null;

  return (
    <motion.article {...fadeInUp} className="py-12 md:py-16">
      <div className="container-main px-4">
        <div
          className="prose prose-lg max-w-3xl mx-auto
            prose-headings:font-heading prose-headings:text-charcoal prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-gold prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-charcoal
            prose-ul:my-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:space-y-2
            prose-li:text-gray-700
            prose-img:rounded-xl prose-img:shadow-md
            prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-light-gray
            prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
            prose-blockquote:not-italic prose-blockquote:text-gray-700"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </motion.article>
  );
}
