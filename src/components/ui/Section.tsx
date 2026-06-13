import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
}

const spacingMap = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-28",
  xl: "py-24 md:py-36",
};

export default function Section({
  children,
  className = "",
  dark = false,
  id,
  spacing = "md",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`
        ${dark ? "bg-dark-bg text-white" : "bg-background text-foreground"}
        ${spacingMap[spacing]}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
