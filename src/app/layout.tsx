import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0EA5E9" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vidres-valls-web.vercel.app"),
  title: {
    default: "Vidres Valls | Cristalería profesional en Valls, Tarragona",
    template: "%s | Vidres Valls",
  },
  description:
    "Soluciones profesionales en cristal y aluminio para hogares y negocios. Más de 20 años de experiencia en Valls, Tarragona. Ventanas, puertas, mamparas, barandillas.",
  keywords: [
    "cristalería",
    "vidrio",
    "aluminio",
    "ventanas",
    "puertas",
    "mamparas",
    "barandillas",
    "Valls",
    "Tarragona",
    "cristal templado",
    "doble acristalamiento",
  ],
  authors: [{ name: "Vidres Valls" }],
  creator: "Vidres Valls",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://vidres-valls-web.vercel.app",
    siteName: "Vidres Valls",
    title: "Vidres Valls | Cristalería profesional en Valls, Tarragona",
    description:
      "Soluciones profesionales en cristal y aluminio. Más de 20 años de experiencia.",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Vidres Valls - Cristalería profesional en Valls, Tarragona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidres Valls | Cristalería profesional",
    description: "Soluciones profesionales en cristal y aluminio en Tarragona.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vidres-valls-web.vercel.app",
    languages: {
      ca: "https://vidres-valls-web.vercel.app/ca",
      es: "https://vidres-valls-web.vercel.app/es",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Vidres Valls",
  "image": "https://vidres-valls-web.vercel.app/logo.jpg",
  "description": "Cristalería profesional en Valls, Tarragona. Más de 20 años de experiencia en cristal y aluminio.",
  "url": "https://vidres-valls-web.vercel.app",
  "telephone": "+34-616-88-74-38",
  "email": "vidresvalls@vidresvalls.es",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ctra. del Pla, 225, NAVE 21",
    "addressLocality": "Valls",
    "addressRegion": "Tarragona",
    "postalCode": "43800",
    "addressCountry": "ES",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.2866",
    "longitude": "1.2499",
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "15:00",
    },
  ],
  "priceRange": "€€",
  "areaServed": [
    { "@type": "City", "name": "Valls" },
    { "@type": "City", "name": "Tarragona" },
    { "@type": "City", "name": "Reus" },
    { "@type": "AdministrativeArea", "name": "Tarragonès" },
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1",
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serveis de cristalleria",
    "itemListElement": [
      { "@type": "Offer", "name": "Finestres de cristall", "description": "Doble vidre, baix-emissiu, templat" },
      { "@type": "Offer", "name": "Portes de cristall", "description": "Correderes, batents, automàtiques" },
      { "@type": "Offer", "name": "Mampares de bany", "description": "Dutxa, angulars, walk-in" },
      { "@type": "Offer", "name": "Baranes de cristall", "description": "Escaleres, balcons, terrasses" },
      { "@type": "Offer", "name": "Miralls a mida", "description": "LED, decoratius, bany" },
      { "@type": "Offer", "name": "Cristalls decoratius", "description": "Serigrafiats, gravats, de color" },
      { "@type": "Offer", "name": "Ferreria i alumini", "description": "Estructures, finestres, portes" },
      { "@type": "Offer", "name": "Reparació i manteniment", "description": "Servei tècnic 24h" },
    ],
  },
  "sameAs": [
    "https://www.facebook.com/vidresvalls",
    "https://www.instagram.com/vidresvalls",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.jpg" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0EA5E9" />
        <meta name="apple-mobile-web-app-title" content="Vidres Valls" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-to-content">
          Saltar al contingut
        </a>
        {children}
      </body>
    </html>
  );
}