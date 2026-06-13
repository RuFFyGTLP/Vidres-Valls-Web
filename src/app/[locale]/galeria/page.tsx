"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import LightboxGallery from "@/components/ui/LightboxGallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Filter } from "lucide-react";

const gallerySets = {
  ventanas: [
    ["Finestral panoràmic", "Ventanales panorámicos", "Panoramic windows"],
    ["Finestra blanca oscil·lobatent", "Ventana blanca oscilobatiente", "White tilt-and-turn window"],
    ["Finestra d'alumini gris", "Ventana de aluminio gris", "Grey aluminium window"],
    ["Tancament de terrassa", "Cerramiento de terraza", "Terrace enclosure"],
    ["Galeria panoràmica", "Galería panorámica", "Panoramic gallery glazing"],
    ["Finestra corredissa urbana", "Ventana corredera urbana", "Urban sliding window"],
    ["Finestra acústica", "Ventana acústica", "Acoustic window"],
    ["Substitució de vidre", "Sustitución de vidrio", "Glass replacement"],
    ["Finestra bronze a mida", "Ventana bronce a medida", "Bespoke bronze window"],
    ["Escaparate comercial", "Escaparate comercial", "Shopfront glazing"],
  ],
  mamparas: [
    ["Mampara walk-in", "Mampara walk-in", "Walk-in shower screen"],
    ["Mampara terratzo verd", "Mampara terrazo verde", "Green terrazzo shower screen"],
    ["Mampara pissarra fosca", "Mampara pizarra oscura", "Dark slate shower screen"],
    ["Perfils negres", "Perfiles negros", "Black hardware shower"],
    ["Ferratges llautó", "Herrajes latón", "Brass hardware shower"],
    ["Vidre estriat", "Vidrio estriado", "Fluted privacy glass"],
    ["Tancament angular", "Cerramiento angular", "Corner shower enclosure"],
    ["Mampara per banyera", "Mampara para bañera", "Bathtub shower screen"],
    ["Dutxa accessible", "Ducha accesible", "Accessible shower screen"],
    ["Bany petit a mida", "Baño pequeño a medida", "Small bathroom screen"],
  ],
  barandillas: [
    ["Terrassa amb vistes", "Terraza con vistas", "Terrace balustrade"],
    ["Escala interior", "Escalera interior", "Interior stair balustrade"],
    ["Balcó de vidre", "Balcón de vidrio", "Glass balcony"],
    ["Protecció de piscina", "Protección de piscina", "Pool glass guard"],
    ["Perfil inferior", "Perfil inferior", "Bottom channel system"],
    ["Fixació puntual", "Fijación puntual", "Point-fixed glass"],
    ["Passamà d'acer", "Pasamanos de acero", "Stainless handrail"],
    ["Perfil negre", "Perfil negro", "Black profile railing"],
    ["Àtic amb barana", "Ático con barandilla", "Rooftop balustrade"],
    ["Altell interior", "Altillo interior", "Mezzanine railing"],
  ],
  puertas: [
    ["Porta automàtica", "Puerta automática", "Automatic glass door"],
    ["Porta batent interior", "Puerta batiente interior", "Interior hinged door"],
    ["Entrada simètrica", "Entrada simétrica", "Symmetrical glass entrance"],
    ["Porta d'oficina", "Puerta de oficina", "Office glass door"],
    ["Entrada comercial", "Entrada comercial", "Commercial entrance"],
    ["Porta pivotant", "Puerta pivotante", "Pivot glass door"],
    ["Balconera d'alumini", "Balconera de aluminio", "Aluminium patio door"],
    ["Porta corredissa amb rail", "Puerta corredera con raíl", "Top-rail sliding glass door"],
    ["Doble entrada", "Doble entrada", "Double entrance"],
    ["Porta minimalista", "Puerta minimalista", "Minimalist glass door"],
  ],
  espejos: [
    ["Mirall LED rodó", "Espejo LED redondo", "Round LED mirror"],
    ["Mirall orgànic", "Espejo orgánico", "Organic mirror"],
    ["Mirall de cos sencer", "Espejo de cuerpo entero", "Full-height mirror"],
    ["Mirall bisellat", "Espejo biselado", "Bevelled mirror"],
    ["Retroil·luminat", "Retroiluminado", "Backlit mirror"],
    ["Paret de mirall", "Pared de espejo", "Mirror wall panel"],
    ["Mirall bronze", "Espejo bronce", "Bronze tinted mirror"],
    ["Paret de mirall per gimnàs", "Pared de espejo para gimnasio", "Gym mirror wall"],
    ["Mirall antibaf", "Espejo antivaho", "Anti-fog bathroom mirror"],
    ["Mirall comercial", "Espejo comercial", "Commercial salon mirror"],
  ],
  decorativos: [
    ["Vidre estriat", "Vidrio estriado", "Fluted glass"],
    ["Vidre gravat", "Vidrio grabado", "Etched privacy glass"],
    ["Porta amb textura", "Puerta texturizada", "Textured glass door"],
    ["Frontal de cuina", "Frontal de cocina", "Kitchen splashback"],
    ["Vinoteca de vidre", "Vinoteca de vidrio", "Glass wine cellar"],
    ["Separador bronze", "Separador bronce", "Bronze glass divider"],
    ["Vidre geomètric", "Vidrio geométrico", "Geometric printed glass"],
    ["Pantalla d'oficina", "Pantalla de oficina", "Office textured screen"],
    ["Restaurant decoratiu", "Restaurante decorativo", "Decorative restaurant glass"],
    ["Vidre de color", "Vidrio de color", "Coloured glass feature"],
  ],
} as const;

const galleryImages = Object.entries(gallerySets).flatMap(([category, items]) =>
  items.map(([title, titleEs, titleEn], index) => ({
    title,
    titleEs,
    titleEn,
    category,
    src: category === "ventanas" && index === 0
      ? "/images/gallery/ventanas-01-hq.jpg"
      : `/images/gallery/${category}-${String(index + 1).padStart(2, "0")}.jpg`,
  }))
);

const rejectedGalleryImages = new Set([
  "barandillas-01.jpg",
  "barandillas-03.jpg",
  "barandillas-06.jpg",
  "barandillas-08.jpg",
  "barandillas-09.jpg",
  "barandillas-10.jpg",
  "decorativos-01.jpg",
  "decorativos-04.jpg",
  "decorativos-05.jpg",
  "decorativos-06.jpg",
  "decorativos-07.jpg",
  "decorativos-08.jpg",
  "espejos-01.jpg",
  "espejos-02.jpg",
  "espejos-04.jpg",
  "espejos-05.jpg",
  "espejos-07.jpg",
  "mamparas-01.jpg",
  "mamparas-06.jpg",
  "mamparas-09.jpg",
  "puertas-01.jpg",
  "puertas-04.jpg",
  "puertas-05.jpg",
  "puertas-07.jpg",
  "puertas-08.jpg",
  "puertas-09.jpg",
  "puertas-10.jpg",
  "ventanas-04.jpg",
  "ventanas-05.jpg",
  "ventanas-07.jpg",
  "ventanas-10.jpg",
]);

const categories = [
  { key: "all", labelCa: "Tots", labelEs: "Todos", labelEn: "All" },
  { key: "ventanas", labelCa: "Finestres", labelEs: "Ventanas", labelEn: "Windows" },
  { key: "puertas", labelCa: "Portes", labelEs: "Puertas", labelEn: "Doors" },
  { key: "mamparas", labelCa: "Mampares", labelEs: "Mamparas", labelEn: "Shower screens" },
  { key: "barandillas", labelCa: "Baranes", labelEs: "Barandillas", labelEn: "Balustrades" },
  { key: "espejos", labelCa: "Miralls", labelEs: "Espejos", labelEn: "Mirrors" },
  { key: "decorativos", labelCa: "Decoratius", labelEs: "Decorativos", labelEn: "Decorative" },
];

const galleryCopy = {
  ca: {
    note: "Imatges conceptuals creades per mostrar tipus de solucions, acabats i aplicacions possibles. El següent salt de confiança serà substituir-les per treballs reals de Vidres Valls.",
    ctaTitle: "Tens un projecte en ment?",
    ctaBody: "T'ajudem a convertir una idea en una solució de vidre ben resolta i fabricada a mida.",
    ctaButton: "Demanar pressupost",
  },
  es: {
    note: "Imágenes conceptuales creadas para mostrar tipos de soluciones, acabados y aplicaciones posibles. El siguiente salto de confianza será sustituirlas por trabajos reales de Vidres Valls.",
    ctaTitle: "¿Tienes un proyecto en mente?",
    ctaBody: "Te ayudamos a convertir una idea en una solución de vidrio bien resuelta y fabricada a medida.",
    ctaButton: "Solicitar presupuesto",
  },
  en: {
    note: "Concept images created to show possible solutions, finishes and applications. The next trust upgrade will be replacing them with real Vidres Valls projects.",
    ctaTitle: "Have a project in mind?",
    ctaBody: "We help turn an idea into a well-resolved, made-to-measure glass solution.",
    ctaButton: "Request a quote",
  },
};

export default function GaleriaPage() {
  const t = useTranslations("gallery");
  const params = useParams();
  const locale = (params.locale as string) || "ca";
  const c = galleryCopy[locale as keyof typeof galleryCopy] ?? galleryCopy.ca;
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages = (activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory))
    .filter((image) => !rejectedGalleryImages.has(image.src.split("/").pop()?.split("?")[0] ?? ""))
    .map((image) => {
      const localizedTitle = locale === "en" ? image.titleEn : locale === "es" ? image.titleEs : image.title;
      const category = categories.find((cat) => cat.key === image.category);
      const localizedLabel = category
        ? locale === "en"
          ? category.labelEn
          : locale === "es"
            ? category.labelEs
            : category.labelCa
        : localizedTitle;
      return { ...image, title: localizedTitle, alt: localizedTitle, label: localizedLabel };
    });

  return (
    <div>
      {/* Hero */}
      <section className="page-hero page-hero--gallery py-20 md:py-28">
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
                {locale === "en" ? cat.labelEn : locale === "es" ? cat.labelEs : cat.labelCa}
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
            {c.note}
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
              {c.ctaTitle}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {c.ctaBody}
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5"
            >
              {c.ctaButton}
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
