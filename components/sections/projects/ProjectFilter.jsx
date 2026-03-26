import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ProjectFilter({ categories, activeFilter, onFilterChange }) {
  const allFilters = ['All', ...(categories || [])];

  return (
    <motion.div {...fadeInUp} className="flex flex-wrap justify-center gap-3 py-8">
      {allFilters.map((category) => {
        const isActive =
          category === 'All'
            ? !activeFilter || activeFilter === 'All'
            : activeFilter === category;

        return (
          <button
            key={category}
            onClick={() => onFilterChange(category === 'All' ? null : category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-gold text-white shadow-md'
                : 'bg-light-gray text-charcoal hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {category}
          </button>
        );
      })}
    </motion.div>
  );
}
