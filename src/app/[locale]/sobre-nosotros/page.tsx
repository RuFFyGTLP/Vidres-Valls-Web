"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { DraftingCompass, MapPin, Ruler, ShieldCheck, Wrench } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CTABanner from "@/components/sections/CTABanner";

const capabilities = [
  { title: "Medición precisa", description: "Revisamos huecos, soportes y accesos antes de fabricar.", icon: Ruler },
  { title: "Diseño a medida", description: "Adaptamos vidrio, perfilería y herrajes al uso del espacio.", icon: DraftingCompass },
  { title: "Montaje cuidado", description: "Protegemos la zona de trabajo y cuidamos cada remate.", icon: Wrench },
  { title: "Vidrio adecuado", description: "Proponemos soluciones templadas, laminadas o aislantes según el proyecto.", icon: ShieldCheck },
];

export default function SobreNosotrosPage() {
  const t = useTranslations("about");
  const locale = (useParams().locale as string) || "ca";
  const local = locale === "en"
    ? { badge: "Local glazing specialists", heading: "Over 20 years working with glass and aluminium", body: "We handle residential and commercial projects, from replacements and custom mirrors to enclosures, shower screens, balustrades and glass façades.", process: "How we work", processTitle: "From technical detail to a clean finish" }
    : locale === "es"
      ? { badge: "Cristalería de proximidad", heading: "Más de 20 años trabajando vidrio y aluminio", body: "Atendemos proyectos residenciales y comerciales: desde una sustitución o un espejo a medida hasta cerramientos, mamparas, barandillas y fachadas de vidrio.", process: "Cómo trabajamos", processTitle: "Del detalle técnico a un acabado limpio" }
      : { badge: "Cristalleria de proximitat", heading: "Més de 20 anys treballant vidre i alumini", body: "Atenem projectes residencials i comercials: des d'una substitució o un mirall a mida fins a tancaments, mampares, baranes i façanes de vidre.", process: "Com treballem", processTitle: "Del detall tècnic a un acabat net" };

  return (
    <div>
      <section className="page-hero page-hero--about bg-dark-bg py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/90 to-dark-bg/55" />
        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl">
            <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">Vidres Valls</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold font-[family-name:var(--font-manrope)] text-white">{t("title")}</h1>
            <p className="mt-4 text-xl text-white/70">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      <Section spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{local.badge}</span>
              <h2 className="mt-5 text-3xl font-bold font-[family-name:var(--font-manrope)] text-foreground">{local.heading}</h2>
              <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{t("history")}</p>
              <p className="mt-4 leading-relaxed text-foreground-muted">
                {local.body}
              </p>
              <div className="mt-7 flex items-center gap-3 text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-semibold">Ctra. del Pla, 225, NAVE 21 · Valls</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-2xl">
              <Image src="/images/projects/barandilla-terraza.png" alt="Solución residencial de vidrio y aluminio" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-surface border-y border-border">
        <Container>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{local.process}</span>
            <h2 className="mt-3 text-3xl font-bold text-foreground">{local.processTitle}</h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {capabilities.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><item.icon className="h-6 w-6" /></div>
                <h3 className="mt-5 font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" dark>
        <Container>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["Hogar", "Ventanas, mamparas, espejos, barandillas y soluciones decorativas."],
              ["Comercio", "Escaparates, puertas, divisiones y cerramientos para negocios."],
              ["Mantenimiento", "Sustitución de vidrios y revisión de instalaciones existentes."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-dark-card p-7">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-text-muted">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner title="¿Tienes una medida o una idea?" subtitle="Cuéntanos qué necesitas y prepararemos una propuesta adaptada a tu espacio." />
    </div>
  );
}
