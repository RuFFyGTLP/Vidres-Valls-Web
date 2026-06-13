"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CTABanner from "@/components/sections/CTABanner";
import {
  AppWindow,
  DoorOpen,
  ShowerHead,
  Mountain,
  Glasses,
  Sparkles,
  Wrench,
  Hammer,
  ArrowRight,
  Mail,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ventanas: AppWindow,
  puertas: DoorOpen,
  mamparas: ShowerHead,
  barandillas: Mountain,
  espejos: Glasses,
  decorativos: Sparkles,
  herreria: Hammer,
  reparacion: Wrench,
};

const services = [
  { key: "ventanas", href: "/servicios/ventanas" },
  { key: "puertas", href: "/servicios/puertas" },
  { key: "mamparas", href: "/servicios/mamparas" },
  { key: "barandillas", href: "/servicios/barandillas" },
  { key: "espejos", href: "/servicios/espejos" },
  { key: "decorativos", href: "/servicios/decorativos" },
  { key: "herreria", href: "/servicios/herreria" },
  { key: "reparacion", href: "/servicios/reparacion" },
];

export default function ServiciosPage() {
  const t = useTranslations("services");
  const tCta = useTranslations("cta");

  return (
    <div>
      {/* Hero */}
      <section className="page-hero page-hero--services py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
        </div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-manrope)] text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-white/60">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      {/* Services Grid */}
      <Section spacing="lg">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.key] ?? Sparkles;
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group relative flex flex-col"
                >
                  <Link
                    href={service.href}
                    className="flex flex-col flex-1 p-6 rounded-2xl border border-border bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Glass shimmer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-col flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 shadow-md shadow-primary/10">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>

                      <h3 className="text-xl font-bold font-[family-name:var(--font-manrope)] text-foreground group-hover:text-primary transition-colors mb-2">
                        {t(`${service.key}.title`)}
                      </h3>

                      <p className="text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
                        {t(`${service.key}.description`)}
                      </p>

                      <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{t("viewDetail")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>

                  {/* Budget CTA — outside Link to avoid nested anchor issue */}
                  <Link
                    href={`/contacto?servicio=${service.key}`}
                    className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    {t("requestBudget")}
                    <Mail className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTABanner
        title={tCta("notSureTitle")}
        subtitle={tCta("notSureSubtitle")}
      />
    </div>
  );
}
