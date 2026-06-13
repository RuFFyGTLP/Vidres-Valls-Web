"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { ShieldCheck, UserCog, Database, Scale } from "lucide-react";

export default function PrivacidadPage() {
  const t = useTranslations("privacy");

  return (
    <div>
      {/* Hero */}
      <section className="page-hero page-hero--privacy py-20 md:py-28">
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

      {/* Content */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Controller */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  {t("controller")}
                </h2>
                <div className="bg-surface rounded-2xl p-6 border border-border space-y-2">
                  <p className="font-semibold text-foreground">Vidres Valls SCP</p>
                  <p className="text-text-muted">Ctra. del Pla, 225, NAVE 21</p>
                  <p className="text-text-muted">43800 Valls, Tarragona</p>
                  <p className="text-text-muted">
                    Email:{" "}
                    <a href="mailto:vidresvalls@vidresvalls.es" className="text-primary hover:underline">
                      vidresvalls@vidresvalls.es
                    </a>
                  </p>
                  <p className="text-text-muted">
                    Telèfon:{" "}
                    <a href="tel:616887438" className="text-primary hover:underline">
                      616 88 74 38
                    </a>
                  </p>
                </div>
              </section>

              {/* Purpose */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary" />
                  {t("purpose")}
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Les dades personals que ens proporcionis a través del formulari de contacte, email, o telèfon seran tractades amb les següents finalitats:
                </p>
                <ul className="mt-3 space-y-2 text-text-muted list-disc list-inside">
                  <li>Gestionar i respondre la teva sol·licitud de contacte o pressupost.</li>
                  <li>Proporcionar-te informació sobre els nostres serveis.</li>
                  <li>Gestionar la relació contractual amb els nostres clients.</li>
                  <li>Enviar-te comunicacions comercials, només si has donat el teu consentiment.</li>
                </ul>
              </section>

              {/* Legal Basis */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
                  {t("basis")}
                </h2>
                <p className="text-text-muted leading-relaxed">
                  El tractament de les teves dades es realitza sobre la base legal del teu consentiment exprés, que ens atorgues en enviar-nos un missatge o emplenar el formulari de contacte. Per a la gestió de serveis contractats, el tractament és necessari per a l&apos;execució del contracte.
                </p>
                <p className="text-text-muted leading-relaxed mt-3">
                  No cedim les teves dades a tercers, excepte obligació legal o quan sigui necessari per prestar el servei sol·licitat (per exemple, asseguradores en casos de sinistres).
                </p>
              </section>

              {/* Retention */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
                  {t("retention")}
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Les teves dades es conservaran mentre mantinguis una relació amb nosaltres o mentre no sol·licitis la seva supressió. En el cas de dades de clients, es conservaran durant el temps necessari per complir amb les obligacions fiscals i comptables vigents (mínim 5 anys).
                </p>
              </section>

              {/* Rights */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4 flex items-center gap-3">
                  <UserCog className="w-6 h-6 text-primary" />
                  {t("rights")}
                </h2>
                <p className="text-text-muted leading-relaxed mb-3">
                  En qualsevol moment pots exercir els teus drets d&apos;accés, rectificació, supressió, limitació del tractament, portabilitat i oposició enviant-nos un email a{" "}
                  <a href="mailto:vidresvalls@vidresvalls.es" className="text-primary hover:underline">
                    vidresvalls@vidresvalls.es
                  </a>{" "}
                  o trucant al{" "}
                  <a href="tel:616887438" className="text-primary hover:underline">
                    616 88 74 38
                  </a>
                  .
                </p>
                <p className="text-text-muted leading-relaxed">
                  Tens dret a presentar una reclamació davant l&apos;Autoritat Catalana de Protecció de Dades (APDCAT) si consideres que el tractament de les teves dades no s&apos;ajusta a la normativa vigent.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-primary" />
                  Cookies
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Aquesta pàgina web utilitza cookies pròpies i de tercers per millorar l&apos;experiència de navegació. Pots configurar el teu navegador per bloquejar cookies, però algunes funcionalitats podrien no funcionar correctament.
                </p>
                <p className="text-text-muted leading-relaxed mt-3">
                  No utilitzem cookies de publicitat ni de seguiment. Les úniques cookies que fem servir són les estrictament necessàries per al funcionament de la web (preferències de llengua, tema visual).
                </p>
              </section>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
