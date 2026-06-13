"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { MapPin, Ruler, Wrench } from "lucide-react";

const strengths = [
  {
    title: { ca: "Fabricació a mida", es: "Fabricación a medida", en: "Made-to-measure" },
    description: {
      ca: "Vidre i alumini adaptats a cada obertura i projecte.",
      es: "Cristal y aluminio adaptados a cada hueco y proyecto.",
      en: "Glass and aluminium adapted to each opening and project.",
    },
    icon: Ruler,
  },
  {
    title: { ca: "Instal·lació professional", es: "Instalación profesional", en: "Professional installation" },
    description: {
      ca: "Mesura, preparació i muntatge amb criteri tècnic.",
      es: "Medición, preparación y montaje con criterio técnico.",
      en: "Measurement, preparation and fitting with technical care.",
    },
    icon: Wrench,
  },
  {
    title: { ca: "Servei de proximitat", es: "Servicio de proximidad", en: "Local service" },
    description: {
      ca: "Atenció directa des de Valls per a Tarragona i voltants.",
      es: "Atención directa desde Valls para Tarragona y alrededores.",
      en: "Direct support from Valls for Tarragona and nearby areas.",
    },
    icon: MapPin,
  },
];

export default function TrustBar() {
  const locale = useLocale() as "ca" | "es" | "en";
  return (
    <section className="py-8 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-4">
          {strengths.map((item, index) => (
            <motion.div
              key={item.title.ca}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{item.title[locale] ?? item.title.ca}</p>
                <p className="text-sm text-foreground-muted">{item.description[locale] ?? item.description.ca}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
