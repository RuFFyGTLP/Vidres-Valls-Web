import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import { ServiceWorkerRegistration } from "@/components/providers/ServiceWorkerRegistration";
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
    { media: "(prefers-color-scheme: light)", color: "#15723a" },
    { media: "(prefers-color-scheme: dark)", color: "#050d08" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vidres-valls-web.vercel.app"),
  title: {
    default: "Vidres Valls | Cristalleria professional a Valls, Tarragona",
    template: "%s | Vidres Valls",
  },
  description:
    "Solucions professionals en vidre i alumini per a llars i negocis. Més de 20 anys d'experiència a Valls, Tarragona.",
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
    locale: "ca_ES",
    url: "https://vidres-valls-web.vercel.app",
    siteName: "Vidres Valls",
    title: "Vidres Valls | Cristalleria professional a Valls, Tarragona",
    description:
      "Solucions professionals en vidre i alumini. Més de 20 anys d'experiència.",
    images: [
      {
        url: "/logo-vidres-valls.png",
        width: 512,
        height: 512,
        alt: "Vidres Valls - Cristalleria professional a Valls, Tarragona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidres Valls | Cristalleria professional",
    description: "Solucions professionals en vidre i alumini a Tarragona.",
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
      en: "https://vidres-valls-web.vercel.app/en",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Vidres Valls",
  "image": "https://vidres-valls-web.vercel.app/logo-vidres-valls.png",
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
      { "@type": "Offer", "name": "Reparació i manteniment", "description": "Substitució i manteniment de vidres" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" suppressHydrationWarning className={`${manrope.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-vidres-valls.png" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#15723a" />
        <meta name="apple-mobile-web-app-title" content="Vidres Valls" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
