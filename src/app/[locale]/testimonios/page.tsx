"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Star, ExternalLink, Quote } from "lucide-react";

const allReviews = [
  { name: "Jordi Serra", text: "Van fer la mampara de la dutxa perfectament. Treball net i ràpid. Molt recomanables!", rating: 5, project: "Mampara de dutxa", date: "2024" },
  { name: "Montserrat Ferrer", text: "Excel·lent atenció al client. Van resoldre el meu problema amb la finestra en temps rècord. Professionals de cap a peus.", rating: 5, project: "Finestra de cristall", date: "2024" },
  { name: "David Martín", text: "La barana de cristall de la terrassa queda impressionant. Treball professional i preu just. Recomano 100%.", rating: 5, project: "Barana de cristall", date: "2024" },
  { name: "Laura García", text: "Portes de cristall per al negoci: quedaven perfectes. Finançament i assessorament excel·lents. Molt satisfeta.", rating: 5, project: "Portes de cristall", date: "2023" },
  { name: "Antoni Rovira", text: "Van fer totes les finestres de casa meva. Treball impeccable i preu competitiu. Els recomano sense dubte.", rating: 5, project: " finestres", date: "2023" },
  { name: "Maria Josep Solsona", text: "El mirall a mida del vestidor queda preciós. Van ser molt curosos amb el muntatge. Excel·lent resultat.", rating: 5, project: "Mirall a mida", date: "2023" },
  { name: "Joan Ramon Ortega", text: "Servei d'urgències excel·lent. Van venir en menys d'una hora a tapar un trencament. Professionals de veritat.", rating: 5, project: "Reparació urgent", date: "2024" },
  { name: "Sandra Fernàndez", text: "La barana d'acer i cristall de l'escala queda brutal. Van resoldre un projecte complicat amb habilitat.", rating: 5, project: "Barana mixta", date: "2023" },
];

export default function TestimoniosPage() {
  const t = useTranslations("testimonials");
  const [filter, setFilter] = useState<number | "all">("all");

  const filtered = filter === "all" ? allReviews : allReviews.filter((r) => r.rating === filter);

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
            <p className="text-xl text-white/60 mb-6">{t("subtitle")}</p>

            {/* Google Rating Badge */}
            <a
              href="https://www.google.com/maps/place/Vidres+Valls"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">4.8 / 5</p>
                <p className="text-white/60 text-xs">127 ressenyes a Google</p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/60 ml-1" />
            </a>
          </motion.div>
        </Container>
      </section>

      {/* Reviews */}
      <Section spacing="lg">
        <Container>
          {/* Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === "all"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-surface border border-border text-text-muted hover:border-primary/30 hover:text-primary"
              }`}
            >
              {t("filterAll")}
            </button>
            {[5, 4].map((r) => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  filter === r
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-surface border border-border text-text-muted hover:border-primary/30 hover:text-primary"
                }`}
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                {r} {t("filter5")}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((review, i) => (
              <motion.div
                key={`${review.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.06 }}
                className="group relative p-6 rounded-2xl border border-border bg-white hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`w-4 h-4 ${si < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-foreground leading-relaxed text-sm mb-4">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Meta */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                      {review.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{review.name}</p>
                      <p className="text-xs text-text-muted">{review.project}</p>
                    </div>
                  </div>
                  <span className="text-xs text-text-muted">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
