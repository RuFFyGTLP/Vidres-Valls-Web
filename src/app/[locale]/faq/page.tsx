"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CTABanner from "@/components/sections/CTABanner";

type Category = "general" | "services" | "technical" | "warranty" | "urgency";

interface FAQItem {
  q: string;
  a: string;
  category: Category;
}

const faqs: FAQItem[] = [
  {
    q: "Quin temps de lliurament té un pressupost?",
    a: "Els pressupostos s'entreguen en 24-48h laborables. El temps d'instal·lació depèn del projecte, però normalment entre 3 i 7 dies laborables des de l'aprovació del pressupost.",
    category: "general",
  },
  {
    q: "Oferiu garanties en els vostres treballs?",
    a: "Sí, tots els nostres treballs inclouen garantia de 2 anys en materials i mà d'obra. Els cristalls de seguretat tenen garantia del fabricant.",
    category: "warranty",
  },
  {
    q: "Treballeu amb assegurances?",
    a: "Sí, col·laborem amb les principals companyies d'assegurances. Pots consultar-nos sense compromís per a qualsevol treball relacionat amb danys propis o de tercers.",
    category: "services",
  },
  {
    q: "Atendeu reparacions urgents?",
    a: "Atendemos sustituciones y reparaciones. Llámanos al 616 88 74 38 para consultar disponibilidad y explicar el incidente.",
    category: "urgency",
  },
  {
    q: "Quins tipus de cristall recomaneu per a finestres?",
    a: "Depèn de les teves necessitats. Per aïllament tèrmic recomanem doble vidre baix-emissiu. Per a seguretat, cristal templat o laminat. Per aïllament acústic, recomanem vidre gruixut laminat. T'assessorem gratuïtament.",
    category: "technical",
  },
  {
    q: "Podeu fer treballs a mida?",
    a: "Sí, som especialistes en treballs a mida. Cada projecte és únic i dissenyem solucions personalitzades per a les teves necessitats específiques.",
    category: "services",
  },
  {
    q: "Amb quins materials treballeu?",
    a: "Treballem amb cristalls de tota mena: temperat, laminat, baix-emissiu, decoratius, etc. També treballem amb alumini per a finestres i portes, i acer per a baranes i estructures.",
    category: "technical",
  },
  {
    q: "Ofereiu finançament?",
    a: "Sí, disposem de opcions de finançament per a projectes de major envergadura. Consulta'ns sense compromís per conèixer les condicions disponibles.",
    category: "general",
  },
  {
    q: "Quina és la vostra àrea de servei?",
    a: "Donem servei a tota la comarca del Tarragonès i les comarques veïnes: Valls, Tarragona, Reus, Constantí, Altafulla, Torredembarra, i molts més. Consulta'ns per al teu poble.",
    category: "services",
  },
  {
    q: "Com puc demanar un pressupost?",
    a: "Pots demanar pressupost a través del nostre formulari web, trucant al 616 88 74 38, enviant un email a vidresvalls@vidresvalls.es, o enviant-nos un missatge per WhatsApp.",
    category: "general",
  },
  {
    q: "Què passa si el cristall es trenca fora de l'horari?",
    a: "En caso de rotura, llámanos y explica la situación. Revisaremos la disponibilidad y la solución más adecuada para asegurar la zona y sustituir el vidrio.",
    category: "urgency",
  },
  {
    q: "Els cristalls de seguretat realment són segurs?",
    a: "Els cristalls temperats són fins a 5 vegades més resistents que el vidre convencional i, en trencar-se, es fragmenten en pieces petites menys perilloses. El cristalls laminats porten una capa interior que manté el vidre unit en cas de trencament.",
    category: "technical",
  },
];

const categories: { key: Category; label: string }[] = [
  { key: "general", label: "general" },
  { key: "services", label: "services" },
  { key: "technical", label: "technical" },
  { key: "warranty", label: "warranty" },
  { key: "urgency", label: "urgency" },
];

function FAQAccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-b border-border last:border-0">
      <button
        id={buttonId}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-primary transition-colors"
        aria-expanded={open}
        aria-controls={contentId}
      >
        <span className="font-semibold text-foreground pr-4">{item.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-primary"
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-text-muted leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const t = useTranslations("faq");
  const tCta = useTranslations("cta");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = activeCategory === "all"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="page-hero page-hero--faq py-20 md:py-28">
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

      {/* FAQ Content */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === "all"
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface border border-border text-text-muted hover:border-primary/30 hover:text-primary"
                }`}
              >
                Tots
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat.key
                      ? "bg-primary text-white shadow-md"
                      : "bg-surface border border-border text-text-muted hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {t(cat.label)}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="divide-y divide-border"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filtered.map((item, i) => (
                    <FAQAccordionItem key={i} item={item} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </Container>
      </Section>

      <CTABanner
        title={tCta("title")}
        subtitle={tCta("subtitle")}
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
