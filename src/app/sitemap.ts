import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vidres-valls-web.vercel.app";
  const lastModified = new Date();

  const routes = [
    "",
    "/ca",
    "/es",
    "/sobre-nosotros",
    "/servicios",
    "/galeria",
    "/blog",
    "/contacto",
    "/faq",
    "/testimonios",
    "/presupuesto",
    "/privacidad",
    "/aviso-legal",
  ];

  const locales = ["ca", "es", "en"];

  const sitemap: MetadataRoute.Sitemap = [];

  // Root routes
  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: "weekly",
      priority: route === "" ? 1 : 0.8,
    });
  });

  // Locale-specific routes
  locales.forEach((locale) => {
    routes.slice(1).forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: "weekly",
        priority: route === "/servicios" || route === "/contacto" ? 0.9 : 0.7,
      });
    });
  });

  // Service detail pages
  const services = ["ventanas", "puertas", "mamparas", "barandillas", "espejos", "decorativos", "herreria", "reparacion"];
  services.forEach((service) => {
    locales.forEach((locale) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/servicios/${service}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  // Blog posts
  const blogSlugs = [
    "elegir-cristall-adequat",
    "tendencias-mamparas-bano-2024",
    "mantenimiento-cristales-guia-practica",
    "barandillas-cristal-seguretat-disseny",
    "diferencias-cristal-templado-laminado",
    "innovaciones-cristal-inteligente-2024",
    "reformas-con-cristal-ahorrar-energia",
    "espejos-decorativos-tendencias",
  ];
  blogSlugs.forEach((slug) => {
    locales.forEach((locale) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  return sitemap;
}
