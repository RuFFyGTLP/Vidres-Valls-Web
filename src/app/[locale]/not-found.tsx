"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-[#1a1035] to-dark-bg">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary/20 rounded-full animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-secondary/20 rounded-full animate-float-reverse" />
      </div>

      <div className="relative text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-9xl font-bold font-[family-name:var(--font-manrope)] gradient-text block mb-4">
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-4"
        >
          Pàgina no trobada
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 mb-8 max-w-md mx-auto"
        >
          La pàgina que busques no existeix o ha estat moguda. Torna a l&apos;inici per trobar el que necessites.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Tornar a l&apos;inici
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
          >
            Contactar
          </Link>
        </motion.div>

        {/* Decorative glass pane */}
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.3, rotate: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-20 -right-20 w-40 h-52 border border-primary/30 rounded-2xl hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 10 }}
          animate={{ opacity: 0.2, rotate: 5 }}
          transition={{ delay: 0.6 }}
          className="absolute -bottom-20 -left-20 w-36 h-44 border border-secondary/30 rounded-2xl hidden md:block"
        />
      </div>
    </div>
  );
}