import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { ErrorTrackingProvider } from "@/components/providers/ErrorTrackingProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { ToastProvider } from "@/components/ui/Toast";
import PageTransition from "@/components/ui/PageTransition";
import LocaleDocumentSync from "@/components/providers/LocaleDocumentSync";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://vidres-valls-web.vercel.app";
  const copy = {
    ca: {
      title: "Vidres Valls | Cristalleria professional a Valls, Tarragona",
      description: "Solucions professionals en vidre i alumini per a llars i negocis a Valls i Tarragona.",
      ogLocale: "ca_ES",
    },
    es: {
      title: "Vidres Valls | Cristalería profesional en Valls, Tarragona",
      description: "Soluciones profesionales en cristal y aluminio para hogares y negocios en Valls y Tarragona.",
      ogLocale: "es_ES",
    },
    en: {
      title: "Vidres Valls | Professional Glassworks in Valls, Tarragona",
      description: "Professional glass and aluminium solutions for homes and businesses in Valls and Tarragona.",
      ogLocale: "en_US",
    },
  }[locale as "ca" | "es" | "en"] ?? {
    title: "Vidres Valls",
    description: "Cristalleria professional a Valls, Tarragona.",
    ogLocale: "ca_ES",
  };

  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: copy.title,
      description: copy.description,
      locale: copy.ogLocale,
      url: `${base}/${locale}`,
    },
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        ca: `${base}/ca`,
        es: `${base}/es`,
        en: `${base}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ca" | "es" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const skipLabel = locale === "en" ? "Skip to content" : locale === "es" ? "Saltar al contenido" : "Saltar al contingut";
  const mainLabel = locale === "en" ? "Main content" : locale === "es" ? "Contenido principal" : "Contingut principal";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleDocumentSync locale={locale} />
      <ToastProvider>
        <ThemeProvider>
          <AnalyticsProvider>
            <ErrorTrackingProvider>
              <ScrollProgress />
              <a href="#main-content" className="skip-to-content">
                {skipLabel}
              </a>
              <Header locale={locale} />
              <main id="main-content" aria-label={mainLabel} className="flex-1">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
              <WhatsAppButton locale={locale} />
            </ErrorTrackingProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </ToastProvider>
    </NextIntlClientProvider>
  );
}
