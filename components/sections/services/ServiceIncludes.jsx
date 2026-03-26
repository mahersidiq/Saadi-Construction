import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ServiceIncludes({ includes, whatIsIt, bestFor }) {
  return (
    <section className="py-16 md:py-24 bg-light-gray">
      <div className="container-main px-4">
        {/* What Is It */}
        {whatIsIt && (
          <motion.div {...fadeInUp} className="mb-14 max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-6">
              What Is It
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{whatIsIt}</p>
          </motion.div>
        )}

        {/* What's Included */}
        {includes && includes.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-14 max-w-3xl"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-6">
              What&apos;s Included
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Best For */}
        {bestFor && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl rounded-lg bg-white p-6 md:p-8 border-l-4 border-gold shadow-sm"
          >
            <h3 className="font-heading text-xl font-bold text-charcoal mb-3">
              Best For
            </h3>
            <p className="text-gray-700 leading-relaxed">{bestFor}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
