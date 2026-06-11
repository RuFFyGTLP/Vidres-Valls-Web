import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all",
  secondary:
    "bg-secondary text-white hover:bg-secondary-dark shadow-lg shadow-secondary/25 hover:shadow-secondary/40 active:scale-[0.98] transition-all",
  ghost:
    "bg-transparent text-foreground hover:bg-surface active:scale-[0.98] transition-all",
  outline:
    "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-[0.98] transition-all",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-3 text-sm rounded-lg gap-1.5 min-h-[44px]", // 44px min height
  md: "px-6 py-3.5 text-base rounded-xl gap-2 min-h-[48px]", // 48px min height
  lg: "px-8 py-4 text-lg rounded-xl gap-2.5 min-h-[52px]", // 52px min height
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", isLoading, className = "", children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center font-semibold
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Carregant...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
export type { ButtonProps, Variant, Size };