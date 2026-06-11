"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Shield, Award, CheckCircle } from "lucide-react";

const certifications = [
  {
    name: "Cristales para ti",
    icon: Award,
    color: "text-primary",
  },
  {
    name: "ISO 9001",
    icon: CheckCircle,
    color: "text-success",
  },
  {
    name: "CE Marking",
    icon: Shield,
    color: "text-secondary",
  },
];

export default function TrustBar() {
  const t = useTranslations("home");

  return (
    <section className="py-10 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-text-muted mb-6 uppercase tracking-wider font-medium"
        >
          {t("trustedBy")}
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-border flex items-center justify-center">
                <cert.icon className={`w-5 h-5 ${cert.color}`} />
              </div>
              <span className="font-semibold text-sm text-foreground">{cert.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
