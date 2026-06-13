"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const facts = [
  {
    value: "20+",
    label: { ca: "anys treballant el vidre", es: "años trabajando el vidrio", en: "years working with glass" },
  },
  {
    value: "8",
    label: { ca: "famílies de serveis", es: "familias de servicios", en: "service families" },
  },
  {
    value: "Valls",
    label: { ca: "taller i atenció local", es: "taller y atención local", en: "local workshop and support" },
  },
];

export default function StatsBar() {
  const locale = useLocale() as "ca" | "es" | "en";
  return (
    <section className="py-12 bg-dark-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
            >
              <div className="gradient-text text-3xl sm:text-4xl font-bold font-[family-name:var(--font-manrope)]">
                {fact.value}
              </div>
              <p className="mt-2 text-sm text-text-muted">{fact.label[locale] ?? fact.label.ca}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
