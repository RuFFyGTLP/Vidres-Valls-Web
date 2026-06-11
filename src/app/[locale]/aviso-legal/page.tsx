"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Building2, MapPin, Phone, Mail } from "lucide-react";

export default function AvisoLegalPage() {
  const t = useTranslations("legal");

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark-bg via-[#0f172a] via-primary/20 to-dark-bg py-20 md:py-28">
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
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Company Info */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
                  {t("company")}
                </h2>
                <div className="bg-surface rounded-2xl p-6 border border-border space-y-3">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Vidres Valls SCP</p>
                      <p className="text-sm text-text-muted">{t("cif")}: J-43XXXXXX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground">Ctra. del Pla, 225, NAVE 21</p>
                      <p className="text-sm text-text-muted">43800 Valls, Tarragona, Espanya</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <a href="tel:616887438" className="text-primary hover:underline">
                        616 88 74 38
                      </a>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p>
                      <a href="mailto:vidresvalls@vidresvalls.es" className="text-primary hover:underline">
                        vidresvalls@vidresvalls.es
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
                  {t("intellectual")}
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Tots els continguts d&apos;aquesta pàgina web, incloent sense limitació els textos, fotografies, gràfics, imatges, logos, icones, i qualsevol altre contingut, estan protegits per la legislació vigent en matèria de propietat intel·lectual. Queda prohibida la seva reproducció, distribució, comunicació pública o transformació sense l&apos;autorització prèvia expressa de Vidres Valls SCP.
                </p>
                <p className="text-text-muted leading-relaxed mt-3">
                  Les marques i logos d&apos;aquesta web estan registrats i la seva utilització sense autorització està estrictament prohibida.
                </p>
              </section>

              {/* Liability */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
                  {t("liability")}
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Vidres Valls SCP no es fa responsable dels danys derivats de l&apos;ús d&apos;aquesta pàgina web, incloent sense limitació errors o omissions en els continguts, falta de disponibilitat del portal, o transmissió de virus o programari maliciós.
                </p>
                <p className="text-text-muted leading-relaxed mt-3">
                  Els enllaços externs que apareixen a aquesta web s&apos;inclouen exclusivament per a la comoditat de l&apos;usuari. Vidres Valls SCP no assumeix cap responsabilitat sobre ells ni sobre els continguts als quals accedeixin.
                </p>
              </section>

              {/* Applicable Law */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
                  {t("law")}
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Aquesta pàgina web es regeix per la legislació espanyola vigent. Per a qualsevol controvèrsia derivada de l&apos;ús d&apos;aquesta web, les parts se sotmeten als jutjats i tribunals de Tarragona, amb renúncia expressa a qualsevol altre fur que pogués correspond&apos;ls.
                </p>
              </section>

              {/* Industry Registration */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
                  Activitat professional
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Vidres Valls SCP és una societat civil particular dedicada a la fabricació, instal·lació i reparació de productes de cristalleria i alumini. L&apos;activitat es desenvolupa principalment a la comarca del Tarragonès, a la província de Tarragona, Regne d&apos;Espanya.
                </p>
              </section>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
