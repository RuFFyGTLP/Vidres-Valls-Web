"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

function useMediaQuery(query: string, defaultState = false) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => defaultState,
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const floatingCardLeftY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const floatingCardRightY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src="/images/projects/cerramiento-terraza.png"
            alt="Vidres Valls - Cristalería profesional"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/95 via-dark-bg/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/50 to-transparent" />
      </div>

      {/* Animated elements */}
      {isDesktop && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating glass cards */}
          <motion.div
            style={{ y: floatingCardLeftY }}
            className="absolute top-20 -left-10 w-64 h-80 border border-primary/20 rounded-3xl animate-float glass"
          />
          <motion.div
            style={{ y: floatingCardRightY }}
            className="absolute bottom-32 -right-16 w-56 h-72 border border-secondary/20 rounded-3xl animate-float-reverse glass"
          />
          <motion.div
            style={{ y }}
            className="absolute top-1/3 right-1/4 w-48 h-60 border border-accent/20 rounded-2xl animate-float"
          />
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      )}

      {/* Content */}
      <motion.div
        style={isDesktop ? { y, opacity } : undefined}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-primary-light">
            {t("badge")}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold font-[family-name:var(--font-manrope)] mb-6 tracking-tight"
        >
          <span className="text-white">Vidres</span>
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">{" "}Valls</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl text-white/80 font-medium mb-4"
        >
          {t("subtitle")}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:bg-primary-dark transition-all hover:scale-105 hover:-translate-y-0.5"
          >
            {t("cta")}
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105 hover:-translate-y-0.5"
          >
            {t("ctaSecondary")}
          </Link>
        </motion.div>

        {/* Quick contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="tel:616887438"
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="font-semibold text-white">616 88 74 38</span>
          </a>
          <span className="hidden sm:block text-white/30">|</span>
          <div className="flex items-center gap-2 text-white/50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{locale === "en" ? "Mon-Fri: 7:00-15:00" : locale === "es" ? "Lun-Vie: 7:00-15:00" : "Dl-Dv: 7:00-15:00"}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {isDesktop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-2 bg-white/50 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
