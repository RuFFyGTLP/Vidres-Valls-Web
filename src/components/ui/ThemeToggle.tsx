"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useParams } from "next/navigation";

export default function ThemeToggle() {
  const params = useParams();
  const locale = (params.locale as string) || "ca";
  const { theme, toggleTheme } = useTheme();

  const label = locale === "ca" ? "Canviar tema" : "Cambiar tema";

  return (
    <button
      onClick={toggleTheme}
      className="theme-track relative w-14 h-7 rounded-full border border-border flex items-center justify-between px-1 transition-colors"
      aria-label={label}
    >
      {/* Sun */}
      <motion.div
        animate={{ opacity: theme === "light" ? 1 : 0, scale: theme === "light" ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
        className="absolute left-1 w-5 h-5 flex items-center justify-center"
      >
        <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      </motion.div>

      {/* Moon */}
      <motion.div
        animate={{ opacity: theme === "dark" ? 1 : 0, scale: theme === "dark" ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
        className="absolute right-1 w-5 h-5 flex items-center justify-center"
      >
        <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </motion.div>

      {/* Toggle indicator */}
      <motion.div
        animate={{ x: theme === "light" ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="theme-thumb w-5 h-5 rounded-full shadow-md z-10"
      />
    </button>
  );
}
