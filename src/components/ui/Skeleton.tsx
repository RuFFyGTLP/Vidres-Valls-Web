"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export default function Skeleton({
  className = "",
  variant = "rectangular",
}: SkeletonProps) {
  const baseClass =
    "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-pulse";

  const variantClass =
    variant === "circular"
      ? "rounded-full"
      : variant === "text"
      ? "rounded-lg h-4"
      : "rounded-xl";

  return <div className={`${baseClass} ${variantClass} ${className}`} />;
}

export function ServiceCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-border bg-white space-y-4">
      <Skeleton className="w-12 h-12" variant="circular" />
      <Skeleton className="w-3/4 h-5" variant="text" />
      <Skeleton className="w-full h-4" variant="text" />
      <Skeleton className="w-full h-4" variant="text" />
    </div>
  );
}

export function TestimonialCardSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-border bg-white space-y-4">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="w-4 h-4" variant="circular" />
        ))}
      </div>
      <Skeleton className="w-full h-16" variant="text" />
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10" variant="circular" />
        <div className="space-y-1.5">
          <Skeleton className="w-24 h-4" variant="text" />
          <Skeleton className="w-16 h-3" variant="text" />
        </div>
      </div>
    </div>
  );
}