import { useEffect, useState, useRef } from 'react';

const stats = [
  { value: 1000, suffix: '+', label: 'Units Delivered' },
  { value: null, display: '48hr', label: 'Bid Turnaround' },
  { value: null, display: '100%', label: 'Multifamily Focus' },
  { value: null, display: 'Owner-Led', label: 'Every Project' },
];

function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || value === null) return;
    const fallback = setTimeout(() => { if (!hasAnimated) { setHasAnimated(true); setCount(value); } }, 2000);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        clearTimeout(fallback);
        setHasAnimated(true);
        let start = 0;
        const step = Math.ceil(value / 40);
        const id = setInterval(() => { start += step; if (start >= value) { setCount(value); clearInterval(id); } else { setCount(start); } }, 30);
      }
    }, { threshold: 0.3 });
    observer.observe(ref.current);
    return () => { clearTimeout(fallback); observer.disconnect(); };
  }, [value, hasAnimated]);

  return <span ref={ref} className="font-heading text-5xl md:text-6xl font-black text-charcoal">{count.toLocaleString()}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section className="py-20 bg-white border-t border-b border-mid-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-mid-gray">
          {stats.map((stat, i) => (
            <div key={i} className="px-8 py-4 text-center">
              {stat.value !== null
                ? <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                : <span className="font-heading text-5xl md:text-6xl font-black text-charcoal">{stat.display}</span>
              }
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
