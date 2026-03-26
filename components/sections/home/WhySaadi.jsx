import { motion } from 'framer-motion';
import { Building2, BarChart3, UserCheck, Handshake } from 'lucide-react';

const values = [
  {
    icon: Building2,
    title: 'Multifamily-Only Focus',
    text: 'Every project we take is an apartment community. That specialization shows in our execution.',
  },
  {
    icon: BarChart3,
    title: 'Proven at Scale',
    text: 'Our team has delivered construction programs across 1,000+ multifamily units in Houston \u2014 from ground-up developments to full gut rehab programs.',
  },
  {
    icon: UserCheck,
    title: 'Owner on Every Project',
    text: 'You work directly with decision-making leadership from bid to punchlist. No handoffs.',
  },
  {
    icon: Handshake,
    title: 'Houston Subcontractor Network',
    text: "Deep relationships with Houston\u2019s best trade contractors across every discipline \u2014 built over years of multifamily work.",
  },
];

export default function WhySaadi() {
  return (
    <section className="section-padding bg-light-gray">
      <div className="container-main">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-charcoal text-center"
        >
          Why Apartment Owners Choose Saadi
        </motion.h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-heading text-lg font-bold text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
