"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import TrustBar from "@/components/sections/TrustBar";
import ServiceCard from "@/components/sections/ServiceCard";
import TestimonialCard from "@/components/sections/TestimonialCard";
import CTABanner from "@/components/sections/CTABanner";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { AppWindow, DoorOpen, ShowerHead, Mountain, Glasses, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const GlassExperience = dynamic(() => import("@/components/three/GlassExperience"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gradient-to-br from-dark-bg via-sage-900/50 to-dark-bg" />
});

const iconMap: Record<string, React.ElementType> = {
  ventanas: AppWindow,
  puertas: DoorOpen,
  mamparas: ShowerHead,
  barandillas: Mountain,
  espejos: Glasses,
  decorativos: Sparkles,
};

const services = [
  { key: "ventanas" },
  { key: "puertas" },
  { key: "mamparas" },
  { key: "barandillas" },
  { key: "espejos" },
  { key: "decorativos" },
];

const whyUsPoints = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titleCa: "Qualitat garantida",
    titleEs: "Calidad garantizada",
    descCa: "Materials premium i acabats impecables en cada projecte",
    descEs: "Materiales premium y acabados impecables en cada proyecto",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titleCa: "Rapidesa d&apos;execució",
    titleEs: "Rapidez de ejecución",
    descCa: "Terminis de lliurament ràpids sense comprometre la qualitat",
    descEs: "Plazos de entrega rápidos sin comprometer la calidad",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    titleCa: "Assessoria personalitzada",
    titleEs: "Asesoría personalizada",
    descCa: "Et guiem per triar la millor solució per al teu espai",
    descEs: "Te guiamos para elegir la mejor solución para tu espacio",
  },
];

const galleryPreviews = [
  { title: "Finestra corredera", color: "from-sage-500 to-sage-700" },
  { title: "Mampara de dutxa", color: "from-primary-light to-sage-600" },
  { title: "Barana de cristall", color: "from-amber-400 to-orange-500" },
  { title: "Porta automàtica", color: "from-emerald-400 to-teal-600" },
];

export default function HomePage() {
  const params = useParams();
  const locale = (params.locale as string) || "ca";
  const t = useTranslations();
  const tServices = useTranslations("services");
  const tHome = useTranslations("home");
  const tAbout = useTranslations("about");
  const tTestimonials = useTranslations("testimonials");
  const tCta = useTranslations("cta");

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Stats Counter */}
      <StatsBar />

      {/* 3.5 3D Glass Experience */}
      <section className="relative h-[500px] overflow-hidden">
        <GlassExperience className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      </section>

      {/* 4. Featured Services */}
      <Section spacing="lg" id="servicios">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
              {tHome("featuredTitle")}
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              {tHome("featuredDesc")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard
                key={s.key}
                icon={s.key}
                title={tServices(`${s.key}.title`)}
                description={tServices(`${s.key}.description`)}
                delay={i * 0.08}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              {tHome("viewAllServices")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </Container>
      </Section>

      {/* 5. Why Choose Us - Dark section */}
      <Section dark spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)] text-white mb-4">
              {tHome("whyUs")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyUsPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-dark-card border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary-light">
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-manrope)] text-white mb-3">
                  {locale === "es" ? point.titleEs : point.titleCa}
                </h3>
                <p className="text-text-muted">{locale === "es" ? point.descEs : point.descCa}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Gallery Preview */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
              {tHome("galleryPreview")}
            </h2>
            <p className="text-foreground-muted text-lg">{tHome("galleryPreviewDesc")}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryPreviews.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} cursor-pointer`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/80 font-semibold text-center px-4">
                    {item.title}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {tHome("galleryPreviewCta")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all"
            >
              {t("gallery.cta")}
            </Link>
          </motion.div>
        </Container>
      </Section>

      {/* 7. Testimonials */}
      <Section spacing="lg" dark>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <a
              href="https://www.google.com/maps/place/Vidres+Valls/@41.2866,1.2499,15z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4 hover:bg-accent/20 transition-colors"
            >
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm font-semibold text-accent">
                {tTestimonials("googleRating")} — 4.8/5
              </span>
            </a>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)] text-white mb-4">
              {tTestimonials("title")}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tTestimonials.raw("reviews").map((review: any, i: number) => (
              <TestimonialCard
                key={i}
                name={review.name}
                text={review.text}
                rating={review.rating}
                delay={i * 0.08}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 8. Coverage Area */}
      <Section spacing="lg" className="bg-surface border-t border-border">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
              {tHome("coverageTitle")}
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              {tHome("coverageDesc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "Valls", "Tarragona", "Reus", "Constantí", "Altafulla",
              "Torredembarra", "Rourell", "Nou de Gaià", "La Pobla de Mafumet",
              "El Morell", "Borges del Camp", "Duesaigües", "Alió", "Bràfim",
              "Figuerola del Camp", "Montferri", "Vallmoll", "Vila-rodona",
              "Aiguamúrcia", "Santes Masses"
            ].map((town) => (
              <span
                key={town}
                className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
              >
                {town}
              </span>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* 9. CTA Banner */}
      <CTABanner title={tCta("title")} subtitle={tCta("subtitle")} />

      {/* 9. Map + Contact Info */}
      <Section spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden h-80 lg:h-96 shadow-xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.8378744866287!2d1.2499154761079298!3d41.28661247131064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a479268338afdf%3A0x7b33c1c6d3c82f3!2sCtra.%20del%20Pla%2C%20225%2C%2043800%20Valls%2C%20Tarragona!5e0!3m2!1sen!2ses!4v1704067200000!5m2!1sen!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vidres Valls - ubicación"
              />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-foreground">
                {t("contact.title")}
              </h2>
              <p className="text-foreground-muted">{t("contact.subtitle")}</p>

              <div className="space-y-4">
                <a
                  href="tel:616887438"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface hover:bg-primary/5 border border-border hover:border-primary/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{t("contact.phone")}</p>
                    <p className="font-bold text-lg text-foreground">616 88 74 38</p>
                  </div>
                </a>

                <a
                  href="mailto:vidresvalls@vidresvalls.es"
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface hover:bg-primary/5 border border-border hover:border-primary/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{t("contact.email")}</p>
                    <p className="font-semibold text-foreground">vidresvalls@vidresvalls.es</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{t("contact.address")}</p>
                    <p className="font-semibold text-foreground whitespace-pre-line">
                      {t("contact.addressValue")}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all mt-2"
              >
                {t("hero.cta")}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}