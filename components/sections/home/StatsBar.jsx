import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 1000, suffix: '+', label: 'Units Delivered' },
  { value: 20, suffix: '+', label: 'Services' },
  { value: null, display: 'Greater Houston', label: 'Area Coverage' },
  { value: null, display: 'Licensed', label: '& Insured' },
];

function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;
    let start = 0;
    const step = Math.ceil(value / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(id);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(id);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-gold font-heading text-3xl md:text-4xl font-extrabold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-navy py-12 px-4">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {stat.value !== null ? (
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              ) : (
                <span className="text-gold font-heading text-3xl md:text-4xl font-extrabold">
                  {stat.display}
                </span>
              )}
              <p className="mt-2 text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
