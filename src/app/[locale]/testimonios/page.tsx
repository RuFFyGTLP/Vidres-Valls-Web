"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ClipboardCheck, MessageSquareText, Ruler, Wrench } from "lucide-react";
import { useParams } from "next/navigation";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CTABanner from "@/components/sections/CTABanner";

const copy = {
  ca: {
    eyebrow: "Compromis de treball",
    title: "Un procés clar per a cada projecte",
    subtitle: "Sense ressenyes inventades ni promeses genèriques: expliquem com abordem cada encàrrec.",
    imageAlt: "Mampara de vidre walk-in instal·lada per Vidres Valls",
    ctaTitle: "Parlem del teu projecte",
    ctaSubtitle: "Envia'ns mesures, fotografies o una descripció i t'orientarem sobre la solució adequada.",
    steps: [
      { title: "Escoltem la necessitat", description: "Partim de l'ús, l'estil i les condicions reals de l'espai.", icon: MessageSquareText },
      { title: "Mesurem i revisem", description: "Comprovem mesures, suports, accessos i detalls d'instal·lació.", icon: Ruler },
      { title: "Preparem la proposta", description: "Detallem materials, solució tècnica i pressupost.", icon: ClipboardCheck },
      { title: "Fabriquem i instal·lem", description: "Coordinem la fabricació a mida i el muntatge final.", icon: Wrench },
    ],
  },
  es: {
    eyebrow: "Compromiso de trabajo",
    title: "Un proceso claro para cada proyecto",
    subtitle: "Sin reseñas inventadas ni promesas genéricas: explicamos cómo abordamos cada encargo.",
    imageAlt: "Mampara de vidrio walk-in instalada por Vidres Valls",
    ctaTitle: "Hablemos de tu proyecto",
    ctaSubtitle: "Envíanos medidas, fotografías o una descripción y te orientaremos sobre la solución adecuada.",
    steps: [
      { title: "Escuchamos la necesidad", description: "Partimos del uso, el estilo y las condiciones reales del espacio.", icon: MessageSquareText },
      { title: "Medimos y revisamos", description: "Comprobamos medidas, soportes, accesos y detalles de instalación.", icon: Ruler },
      { title: "Preparamos la propuesta", description: "Detallamos materiales, solución técnica y presupuesto.", icon: ClipboardCheck },
      { title: "Fabricamos e instalamos", description: "Coordinamos la fabricación a medida y el montaje final.", icon: Wrench },
    ],
  },
  en: {
    eyebrow: "Work commitment",
    title: "A clear process for every project",
    subtitle: "No invented reviews or generic promises: we explain how we handle each job.",
    imageAlt: "Walk-in glass shower screen installed by Vidres Valls",
    ctaTitle: "Let's talk about your project",
    ctaSubtitle: "Send us measurements, photos or a short description and we will guide you toward the right solution.",
    steps: [
      { title: "We listen first", description: "We start with the use, style and real conditions of the space.", icon: MessageSquareText },
      { title: "We measure and review", description: "We check dimensions, supports, access points and installation details.", icon: Ruler },
      { title: "We prepare the proposal", description: "We detail materials, the technical solution and the quote.", icon: ClipboardCheck },
      { title: "We build and install", description: "We coordinate made-to-measure production and final installation.", icon: Wrench },
    ],
  },
};

export default function TestimoniosPage() {
  const locale = ((useParams().locale as string) || "ca") as keyof typeof copy;
  const t = copy[locale] || copy.ca;

  return (
    <div>
      <section className="relative overflow-hidden bg-dark-bg py-20 md:py-28">
        <Image src="/images/projects/mampara-walk-in.png" alt={t.imageAlt} fill className="object-cover opacity-25" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/90 to-dark-bg/50" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">{t.eyebrow}</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">{t.title}</h1>
            <p className="mt-4 text-xl text-white/70">{t.subtitle}</p>
          </motion.div>
        </Container>
      </section>

      <Section spacing="lg">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.steps.map((step, index) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><step.icon className="h-6 w-6" /></div>
                <p className="mt-5 text-xs font-bold text-primary">0{index + 1}</p>
                <h2 className="mt-2 text-xl font-bold text-foreground">{step.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner title={t.ctaTitle} subtitle={t.ctaSubtitle} />
    </div>
  );
}
