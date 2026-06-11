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

  return {
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        ca: `${base}/ca`,
        es: `${base}/es`,
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

  if (!routing.locales.includes(locale as "ca" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ToastProvider>
        <ThemeProvider>
          <AnalyticsProvider>
            <ErrorTrackingProvider>
              <ScrollProgress />
              <Header locale={locale} />
              <main id="main-content" aria-label="Contingut principal" className="flex-1">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
              <WhatsAppButton />
            </ErrorTrackingProvider>
          </AnalyticsProvider>
        </ThemeProvider>
      </ToastProvider>
    </NextIntlClientProvider>
  );
}