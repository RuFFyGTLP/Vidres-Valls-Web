"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CTABanner from "@/components/sections/CTABanner";

const team = [
  {
    name: "Joan Martí",
    role: "Director general",
    bio: "Més de 25 anys en el sector del vidre i l'alumini. Fundador de Vidres Valls amb una passió per les solucions innovadores.",
    initials: "JM",
    color: "from-primary to-primary-dark",
  },
  {
    name: "Anna García",
    role: "Cap d'instal·lacions",
    bio: "Especialista en instal·lacions de baranes i mampares. Certificació europea en tractament de vidre de seguretat.",
    initials: "AG",
    color: "from-secondary to-secondary-dark",
  },
  {
    name: "Marc López",
    role: "Assessor comercial",
    bio: "Expert en pressupostos i assessorament personalitzat. Et ajuda a trobar la millor solució per al teu projecte.",
    initials: "ML",
    color: "from-accent to-accent-dark",
  },
  {
    name: "Laia Ferrer",
    role: "Administració",
    bio: "Gestió de comandes, pressupostos i atenció al client. El rostre amigable de Vidres Valls.",
    initials: "LF",
    color: "from-success to-emerald-600",
  },
];

const certifications = [
  { name: "Cristales para ti", desc: "Xarxa de cristalleries de confiança" },
  { name: "ISO 9001", desc: "Gestió de qualitat certificada" },
  { name: "CE Marking", desc: "Certificació de seguretat europea" },
  { name: "AENOR", desc: "Associació Espanyola de Normalització" },
];

export default function SobreNosotrosPage() {
  const t = useTranslations("about");

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark-bg via-[#1a1035] to-dark-bg py-20 md:py-28">
        <div className="absolute inset-0">
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

      {/* History */}
      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                La nostra història
              </span>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-6">
                Més de 20 anys de dedicació
              </h2>
              <p className="text-foreground-muted text-lg leading-relaxed mb-6">
                {t("history")}
              </p>
              <p className="text-foreground-muted leading-relaxed">
                {t("history2")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl">🏆</span>
                  <p className="mt-4 text-foreground font-semibold">Des de 2004</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 px-6 py-3 bg-primary text-white rounded-xl shadow-xl">
                <span className="text-2xl font-bold">20+</span>
                <span className="block text-sm text-white/80">anys d'experiència</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section spacing="lg" className="bg-surface border-t border-border">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
              El nostre equip
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Professionals compromesos amb la qualitat i el servei al client
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-border hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl font-bold`}
                >
                  {member.initials}
                </div>
                <h3 className="font-bold font-[family-name:var(--font-manrope)] text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-xs text-text-muted leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section spacing="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
              {t("values.title")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {(["quality", "experience", "trust", "speed"] as const).map((value, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-6 rounded-2xl bg-surface border border-border"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {value === "quality" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {value === "experience" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                    {value === "trust" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />}
                    {value === "speed" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                  </svg>
                </div>
                <h3 className="font-bold font-[family-name:var(--font-manrope)] text-foreground mb-1">
                  {t(`values.${value}`)}
                </h3>
                <p className="text-sm text-text-muted">{t(`values.${value}Desc`)}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Certifications */}
      <Section spacing="lg" dark>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-white mb-4">
              Certificacions i afiliacions
            </h2>
            <p className="text-white/60">Compromís amb l'excel·lència i la qualitat</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-dark-card border border-white/10 text-center"
              >
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-bold font-[family-name:var(--font-manrope)] text-white mb-1">
                  {cert.name}
                </h3>
                <p className="text-sm text-text-muted">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Vol conèixer l'equip en persona?"
        subtitle="Truca'ns o visitans a les nostres instal·lacions. Et rebran amb un somriure."
      />
    </div>
  );
}