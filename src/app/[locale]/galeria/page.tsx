"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import LightboxGallery from "@/components/ui/LightboxGallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Filter } from "lucide-react";

const galleryImages = [
  { title: "Finestra corredera alumini", alt: "Finestra corredera de cristall amb marc d'alumini", category: "ventanas", src: "/galeria/ventana-1.jpg" },
  { title: "Vidreira industrial", alt: "Vidreira industrial amb estructura de cristall", category: "ventanas", src: "/galeria/edificio-1.jpg" },
  { title: "Mampara walk-in", alt: "Mampara de dutxa walk-in amb cristall transparent", category: "mamparas", src: "/galeria/mampara-1.jpg" },
  { title: "Barana escalera cristall", alt: "Barana de cristall per a escales interiors", category: "barandillas", src: "/galeria/barandilla-1.jpg" },
  { title: "Porta corredera cristall", alt: "Porta corredera de cristall per a terrassa", category: "puertas", src: "/galeria/ventana-2.jpg" },
  { title: "Mirall decoratiu amb LED", alt: "Mirall decoratiu amb il·luminació LED", category: "espejos", src: "/galeria/espejo-1.jpg" },
  { title: "Fachada cristall estructura", alt: "Fachada comercial amb estructura de cristall", category: "decorativos", src: "/galeria/fachada-1.jpg" },
  { title: "Finestra alumini alta eficiencia", alt: "Finestra d'alumini d'alta eficiencia energetica", category: "ventanas", src: "/galeria/edificio-2.jpg" },
  { title: "Cristall decoratiu serigrafiat", alt: "Cristall decoratiu amb serigrafia personalitzada", category: "decorativos", src: "/galeria/cristal-1.jpg" },
];

const categories = [
  { key: "all", labelCa: "Tots", labelEs: "Todos" },
  { key: "ventanas", labelCa: "Finestres", labelEs: "Ventanas" },
  { key: "puertas", labelCa: "Portes", labelEs: "Puertas" },
  { key: "mamparas", labelCa: "Mampares", labelEs: "Mamparas" },
  { key: "barandillas", labelCa: "Baranes", labelEs: "Barandillas" },
  { key: "espejos", labelCa: "Miralls", labelEs: "Espejos" },
  { key: "decorativos", labelCa: "Decoratius", labelEs: "Decorativos" },
];

export default function GaleriaPage() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark-bg via-[#0C4A6E] to-dark-bg text-white py-20 md:py-28 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Breadcrumbs items={[{ label: t("title") }]} />
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-manrope)] text-white mb-4 mt-4">
              {t("title")}
            </h1>
            <p className="text-xl text-white/70">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-16 md:py-24 bg-background transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                  flex items-center gap-2
                  ${activeCategory === cat.key
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-surface border border-border text-foreground-muted hover:border-primary/30 hover:text-primary"
                  }
                `}
              >
                {cat.key !== "all" && <Filter className="w-4 h-4" />}
                {cat.labelCa}
              </button>
            ))}
          </div>

          {/* Gallery with Lightbox */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <LightboxGallery images={filteredImages} columns={3} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-text-muted mt-12 text-lg"
          >
            Posa&apos;t en contacte per veure mes projectes del nostre portfolio.
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)] mb-4">
              Tens un projecte en ment?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Els nostres professionals t&apos;ajudaran a fer realitat qualsevol idea en cristall i alumini.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5"
            >
              Demanar pressupost
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
