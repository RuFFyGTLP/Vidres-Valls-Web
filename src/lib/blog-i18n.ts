type BlogLocale = "ca" | "es" | "en";

type BlogPostCopy = {
  slug: string;
  title: string;
  titleEs: string;
  excerpt: string;
  excerptEs: string;
  category: string;
};

const englishCopy: Record<string, { title: string; excerpt: string }> = {
  "elegir-cristall-adequat": {
    title: "How to choose the right glass for your windows",
    excerpt:
      "A practical guide to double glazing, low-emissivity, tempered and acoustic glass, with clear criteria for each home.",
  },
  "tendencias-mamparas-bano-2024": {
    title: "Current trends in shower screens",
    excerpt:
      "Walk-in layouts, frameless glass, black hardware, textured finishes and accessible details for modern bathrooms.",
  },
  "mantenimiento-cristales-guia-practica": {
    title: "Glass maintenance: a practical guide",
    excerpt:
      "How to keep glass clean, safe and in good condition, and when it is better to call a professional glazier.",
  },
  "barandillas-cristal-seguretat-disseny": {
    title: "Glass balustrades: safety and design",
    excerpt:
      "Key points for stairs, balconies and terraces: laminated safety glass, fixing systems, maintenance and visual impact.",
  },
  "diferencias-cristal-templado-laminado": {
    title: "Tempered vs laminated glass: what changes?",
    excerpt:
      "A compact guide to safety glass: how each one breaks, where each one works best and how to choose properly.",
  },
  "innovaciones-cristal-inteligente-2024": {
    title: "Practical applications of smart glass",
    excerpt:
      "Switchable, frosted and solar-control glass for offices, homes and spaces that need light and privacy.",
  },
  "reformas-con-cristal-ahorrar-energia": {
    title: "How glass upgrades can save energy",
    excerpt:
      "Windows, low-e glass and better glazing choices that improve comfort and reduce energy loss at home.",
  },
  "espejos-decorativos-tendencias": {
    title: "Decorative mirrors: trends and inspiration",
    excerpt:
      "Custom mirrors, LED lighting, organic shapes and placement ideas that bring light and depth to interiors.",
  },
};

const categoryLabels: Record<BlogLocale, Record<string, string>> = {
  ca: {
    Tots: "Tots",
    Consells: "Consells",
    "Tendències": "Tendències",
    Manteniment: "Manteniment",
    Productes: "Productes",
    Novetats: "Novetats",
    Disseny: "Disseny",
  },
  es: {
    Tots: "Todos",
    Consells: "Consejos",
    "Tendències": "Tendencias",
    Manteniment: "Mantenimiento",
    Productes: "Productos",
    Novetats: "Novedades",
    Disseny: "Diseño",
  },
  en: {
    Tots: "All",
    Consells: "Advice",
    "Tendències": "Trends",
    Manteniment: "Maintenance",
    Productes: "Products",
    Novetats: "Innovation",
    Disseny: "Design",
  },
};

export const blogCategoryKeys = ["Tots", "Consells", "Tendències", "Manteniment", "Productes", "Novetats", "Disseny"];

export function normalizeBlogLocale(locale: string): BlogLocale {
  return locale === "es" || locale === "en" ? locale : "ca";
}

export function getBlogTitle(post: BlogPostCopy, locale: string) {
  const normalized = normalizeBlogLocale(locale);
  if (normalized === "es") return post.titleEs;
  if (normalized === "en") return englishCopy[post.slug]?.title ?? post.title;
  return post.title;
}

export function getBlogExcerpt(post: BlogPostCopy, locale: string) {
  const normalized = normalizeBlogLocale(locale);
  if (normalized === "es") return post.excerptEs;
  if (normalized === "en") return englishCopy[post.slug]?.excerpt ?? post.excerpt;
  return post.excerpt;
}

export function getBlogCategoryLabel(category: string, locale: string) {
  const normalized = normalizeBlogLocale(locale);
  return categoryLabels[normalized][category] ?? category;
}
