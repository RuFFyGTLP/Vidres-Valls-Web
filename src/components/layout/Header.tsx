"use client";

import { useState } from "react";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navItems = [
  { key: "inicio", href: "/" },
  { key: "nosotros", href: "/sobre-nosotros" },
  { key: "servicios", href: "/servicios" },
  { key: "galeria", href: "/galeria" },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/faq" },
  { key: "contacto", href: "/contacto" },
];

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-dark-surface/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/logo.jpg"
                alt="Vidres Valls"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-foreground dark:text-white tracking-tight">VIDRES VALLS</span>
              <span className="block text-xs text-text-muted -mt-0.5">Cristaleria professional</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors group ${
                  pathname === item.href
                    ? "text-primary dark:text-primary-light"
                    : "text-foreground-muted hover:text-foreground dark:text-white/70 dark:hover:text-white"
                }`}
              >
                {t(item.key)}
                {/* Underline animation */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  pathname === item.href ? "w-full" : ""
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right side: theme + lang */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="hidden sm:flex items-center gap-1">
              <Link
                href={pathname}
                locale="ca"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  locale === "ca"
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface dark:bg-dark-card text-foreground-muted hover:bg-primary/10 hover:text-primary"
                }`}
              >
                CA
              </Link>
              <Link
                href={pathname}
                locale="es"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  locale === "es"
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface dark:bg-dark-card text-foreground-muted hover:bg-primary/10 hover:text-primary"
                }`}
              >
                ES
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href="/presupuesto"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all hover:shadow-primary/50 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Presupuesto
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-foreground-muted hover:bg-surface dark:text-white/70 dark:hover:bg-dark-card transition-colors"
              aria-label="Menu"
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Menu */}
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border dark:border-border-dark bg-white dark:bg-dark-surface"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                        : "text-foreground-muted hover:bg-surface dark:text-white/70 dark:hover:bg-dark-card"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <Link
                  href="/presupuesto"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 mt-4 bg-primary text-white text-sm font-semibold rounded-xl text-center"
                >
                  Demanar pressupost
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
