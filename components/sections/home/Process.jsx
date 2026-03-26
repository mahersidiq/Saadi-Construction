import { motion } from 'framer-motion';
import { ClipboardList, FileCheck, Hammer, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    title: 'Scope & Bid',
    text: 'Detailed per-unit cost breakdown within 5 business days',
  },
  {
    icon: FileCheck,
    title: 'Contract & Schedule',
    text: 'Fixed-price contracts with milestone-based billing',
  },
  {
    icon: Hammer,
    title: 'Execution',
    text: 'Phased delivery keeps income flowing during renovation',
  },
  {
    icon: CheckCircle2,
    title: 'Punch & Handoff',
    text: 'Photo documentation on every unit, clean handoff to your team',
  },
];

export default function Process() {
  return (
    <section className="section-padding bg-navy">
      <div className="container-main">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center"
        >
          How We Work
        </motion.h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:grid grid-cols-4 gap-6 mt-14 relative">
          {/* Connector line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gold/30" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <span className="text-gold font-heading text-sm font-bold mb-1">
                  Step {i + 1}
                </span>
                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden mt-10 space-y-8 relative pl-10">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gold/30" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 w-8 h-8 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <span className="text-gold font-heading text-sm font-bold">
                  Step {i + 1}
                </span>
                <h3 className="font-heading text-base font-bold text-white mt-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
