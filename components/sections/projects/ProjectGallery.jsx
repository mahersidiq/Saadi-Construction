import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ProjectGallery({ images }) {
  const [selectedIdx, setSelectedIdx] = useState(null);

  if (!images || images.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="container-main px-4 text-center">
          <div className="rounded-xl bg-gradient-to-br from-navy to-charcoal p-16">
            <svg
              className="mx-auto h-20 w-20 text-white/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
            <p className="mt-4 text-white/40 text-lg">Gallery photos coming soon</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-light-gray">
      <div className="container-main px-4">
        <motion.h2
          {...fadeInUp}
          className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-10 text-center"
        >
          Project Gallery
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, i) => (
            <motion.button
              key={i}
              {...fadeInUp}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              onClick={() => setSelectedIdx(i)}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Project photo ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-[4/3] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIdx]}
                alt={`Project photo ${selectedIdx + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <button
                onClick={() => setSelectedIdx(null)}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Close gallery modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
