"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useParams } from "next/navigation";
import {
  AppWindow,
  DoorOpen,
  ShowerHead,
  Mountain,
  Glasses,
  Sparkles,
  Wrench,
  Hammer,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ventanas: AppWindow,
  puertas: DoorOpen,
  mamparas: ShowerHead,
  barandillas: Mountain,
  espejos: Glasses,
  decorativos: Sparkles,
  herreria: Hammer,
  reparacion: Wrench,
};

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  delay?: number;
}

export default function ServiceCard({
  icon,
  title,
  description,
  href = "/servicios",
  delay = 0,
}: ServiceCardProps) {
  const params = useParams();
  const locale = (params.locale as string) || "ca";
  const viewDetailText = locale === "ca" ? "Veure detall" : "Ver detalle";

  const IconComponent = iconMap[icon] ?? Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={href}
        className="group relative flex flex-col h-full p-6 rounded-2xl border border-border bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        aria-label={`${title} - ${description}`}
      >
        {/* Glass shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 shadow-md shadow-primary/10 group-hover:shadow-primary/20">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>

          <h3 className="text-lg font-bold font-[family-name:var(--font-manrope)] text-foreground group-hover:text-primary transition-colors mb-2">
            {title}
          </h3>

          <p className="text-sm text-text-muted leading-relaxed group-hover:text-foreground transition-colors">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            <span>{viewDetailText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
