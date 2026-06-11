"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CTABanner from "@/components/sections/CTABanner";

interface Service {
  icon: string;
  titleCa: string;
  titleEs: string;
  descriptionCa: string;
  descriptionEs: string;
  features: { title: string; desc: string }[];
  applications: string[];
  badge: string;
}

interface Props {
  service: Service;
  slug: string;
  t: ReturnType<typeof useTranslations>;
  allServices: Record<string, Service>;
}

export default function ServiceDetailClient({ service, slug, t, allServices }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark-bg via-[#1a1035] to-dark-bg py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
        </div>
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
            {service.badge && (
              <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-4">
                {service.badge}
              </span>
            )}
            <div className="text-6xl mb-6">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-manrope)] text-white mb-4">
              {service.titleCa}
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              {service.descriptionCa}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Features */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-2">
              Característiques
            </h2>
            <p className="text-text-muted">Tot el que ofereix aquest servei</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl border border-border bg-white hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 transition-all duration-300"
              >
                <h3 className="font-bold font-[family-name:var(--font-manrope)] text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Applications */}
      <Section spacing="lg" dark>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-white mb-2">
              Aplicacions
            </h2>
            <p className="text-text-muted">On s&apos;utilitza aquest servei</p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {service.applications.map((app, i) => (
              <motion.span
                key={app}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 rounded-full bg-dark-card border border-white/10 text-white/80 text-sm font-medium"
              >
                {app}
              </motion.span>
            ))}
          </div>
        </Container>
      </Section>

      {/* Gallery preview */}
      <Section spacing="lg">
        <Container>
          <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-8">
            Exemples de treballs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center cursor-pointer hover:shadow-xl transition-shadow"
              >
                <span className="text-4xl opacity-50">{service.icon}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Related services */}
      <Section spacing="sm" className="border-t border-border">
        <Container>
          <h3 className="text-lg font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
            Altres serveis que et poden interessar
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(allServices)
              .filter(([key]) => key !== slug)
              .slice(0, 4)
              .map(([key, s]) => (
                <Link
                  key={key}
                  href={`/servicios/${key}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-white hover:border-primary/30 hover:bg-primary/5 text-foreground hover:text-primary transition-all text-sm font-medium"
                >
                  <span>{s.icon}</span>
                  <span>{s.titleCa}</span>
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Necesites aquest servei?"
        subtitle="Contacta amb nosaltres i t&apos;assessorem sense compromís. Et donem pressupost en 24h."
      />
    </div>
  );
}