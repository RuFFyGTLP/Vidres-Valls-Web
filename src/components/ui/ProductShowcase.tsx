"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import { X, ChevronLeft, ChevronRight, Maximize2, Filter } from "lucide-react";

interface Product {
  id: string;
  name: string;
  nameEs: string;
  category: "ventanas" | "puertas" | "cristaleras" | "facanas";
  subcategory: string;
  description: string;
  descriptionEs: string;
  features: string[];
  image: string;
  thumbnail: string;
}

const products: Product[] = [
  {
    id: "v1",
    name: "Finestra Corredera Premium",
    nameEs: "Ventana Corredera Premium",
    category: "ventanas",
    subcategory: "Alumini",
    description: "Finestra corredera d'alumini d'alta eficiencia amb trencament de pont tèrmic. Sistemes d'estanqueïtat superiors.",
    descriptionEs: "Ventana corredera de aluminio de alta eficiencia con rotura de puente térmico. Sistemas de estanqueidad superiores.",
    features: ["Aïllament tèrmic", "Estanqueïtat", "Disseny minimalista"],
    image: "/galeria/ventana-1.jpg",
    thumbnail: "/galeria/ventana-1.jpg",
  },
  {
    id: "v2",
    name: "Finestra Batent",
    nameEs: "Ventana Batiente",
    category: "ventanas",
    subcategory: "PVC",
    description: "Finestra batent amb bisagres de precision, obertura parcial o total.",
    descriptionEs: "Ventana batiente con bisagras de precisión, apertura parcial o total.",
    features: ["Obertura total", "Bxes de seguretat", "Aïllament acústic"],
    image: "/galeria/ventana-2.jpg",
    thumbnail: "/galeria/ventana-2.jpg",
  },
  {
    id: "p1",
    name: "Porta Corredera de Cristall",
    nameEs: "Puerta Corredera de Cristal",
    category: "puertas",
    subcategory: "Automàtica",
    description: "Porta corredera de cristall templat amb sistema automàtic. Sensor de moviment integrat.",
    descriptionEs: "Puerta corredera de cristal templado con sistema automático. Sensor de movimiento integrado.",
    features: ["Sensor de moviment", "Cristall templat 10mm", "Obertura automàtica"],
    image: "/galeria/fachada-1.jpg",
    thumbnail: "/galeria/fachada-1.jpg",
  },
  {
    id: "p2",
    name: "Porta Pivotant",
    nameEs: "Puerta Pivotante",
    category: "puertas",
    subcategory: "Disseny",
    description: "Porta pivotant d'alta gama amb frontisses invisibles. disseny modern i elegant.",
    descriptionEs: "Puerta pivotante de alta gama con bisagras invisibles. Diseño moderno y elegante.",
    features: ["Frontisses invisibles", "Fulla de 12mm", "Tancament multipunt"],
    image: "/galeria/edificio-1.jpg",
    thumbnail: "/galeria/edificio-1.jpg",
  },
  {
    id: "c1",
    name: "Cristalera Terraza",
    nameEs: "Cristalera Terraza",
    category: "cristaleras",
    subcategory: "Tancaments",
    description: "Tancament de terrassa amb estructures de cristall sense perfils visibles.",
    descriptionEs: "Cierre de terraza con estructuras de cristal sin perfiles visibles.",
    features: ["Sense perfils", "Màxima visibilitat", "Estanqueïtat total"],
    image: "/galeria/edificio-2.jpg",
    thumbnail: "/galeria/edificio-2.jpg",
  },
  {
    id: "c2",
    name: "Perxada Cristina",
    nameEs: "Pergola Cristina",
    category: "cristaleras",
    subcategory: "Exterior",
    description: "Perxada amb sostre de cristall retràctil. Control de llum i temperatura.",
    descriptionEs: "Pérgola con techo de cristal retráctil. Control de luz y temperatura.",
    features: ["Sostre retràctil", "Control climàtic", "LED integrat"],
    image: "/galeria/cristal-1.jpg",
    thumbnail: "/galeria/cristal-1.jpg",
  },
  {
    id: "f1",
    name: "Fachada Cristall",
    nameEs: "Fachada Cristal",
    category: "facanas",
    subcategory: "Estructura",
    description: "Fachada de cristall amb estructura d'alumini. Màxima transparència i eficiència.",
    descriptionEs: "Fachada de cristal con estructura de aluminio. Máxima transparencia y eficiencia.",
    features: ["Estructura alumini", "Cristall triple", "Aïllament tèrmic"],
    image: "/galeria/barandilla-1.jpg",
    thumbnail: "/galeria/barandilla-1.jpg",
  },
];

const categories = [
  { key: "all", labelCa: "Tots", labelEs: "Todos" },
  { key: "ventanas", labelCa: "Finestres", labelEs: "Ventanas" },
  { key: "puertas", labelCa: "Portes", labelEs: "Puertas" },
  { key: "cristaleras", labelCa: "Cristalleres", labelEs: "Cristaleras" },
  { key: "facanas", labelCa: "Façanes", labelEs: "Fachadas" },
];

export default function ProductShowcase({ locale = "ca" }: { locale?: string }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const openProduct = (product: Product, index: number) => {
    setSelectedProduct(product);
    setSelectedIndex(index);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const nextProduct = () => {
    const nextIndex = (selectedIndex + 1) % filteredProducts.length;
    setSelectedIndex(nextIndex);
    setSelectedProduct(filteredProducts[nextIndex]);
  };

  const prevProduct = () => {
    const prevIndex = (selectedIndex - 1 + filteredProducts.length) % filteredProducts.length;
    setSelectedIndex(prevIndex);
    setSelectedProduct(filteredProducts[prevIndex]);
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
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
            {locale === "es" ? cat.labelEs : cat.labelCa}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                  {product.subcategory}
                </span>
              </div>
              {/* Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-foreground dark:text-white mb-2">
                {locale === "es" ? product.nameEs : product.name}
              </h3>
              <p className="text-sm text-text-muted line-clamp-2 mb-4">
                {locale === "es" ? product.descriptionEs : product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 3).map((feature, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-primary/5 text-primary text-xs rounded-md"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Click overlay */}
            <button
              onClick={() => openProduct(product, index)}
              className="absolute inset-0 w-full h-full cursor-pointer"
              aria-label={`Ver ${product.name}`}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeProduct}
          >
            {/* Close */}
            <button
              onClick={closeProduct}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Tancar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav */}
            <button
              onClick={(e) => { e.stopPropagation(); prevProduct(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextProduct(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Següent"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Product */}
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-card rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 h-full">
                {/* Image */}
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Info */}
                <div className="p-8 overflow-y-auto">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    {selectedProduct.subcategory}
                  </span>
                  <h2 className="text-2xl font-bold text-foreground dark:text-white mt-4 mb-4">
                    {locale === "es" ? selectedProduct.nameEs : selectedProduct.name}
                  </h2>
                  <p className="text-text-muted mb-6 leading-relaxed">
                    {locale === "es" ? selectedProduct.descriptionEs : selectedProduct.description}
                  </p>
                  <h3 className="font-semibold text-foreground dark:text-white mb-3">Característiques:</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedProduct.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-text-muted">
                        <svg className="w-5 h-5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <Link
                      href="/contacto"
                      className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-xl text-center hover:bg-primary-dark transition-colors"
                    >
                      Demanar pressupost
                    </Link>
                    <Link
                      href="/presupuesto"
                      className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      Calcula preu
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
              {selectedIndex + 1} / {filteredProducts.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
