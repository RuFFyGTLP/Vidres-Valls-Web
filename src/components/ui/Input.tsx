"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const id = useId();
    const errorId = `${id}-error`;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-primary ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full px-4 py-3 rounded-xl border bg-card
            text-foreground placeholder:text-text-muted
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
            transition-all duration-200
            ${error ? "border-error focus:ring-error/50 focus:border-error" : "border-border hover:border-border-dark"}
            ${className}
          `}
          {...props}
        />
        {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const id = useId();
    const errorId = `${id}-error`;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-primary ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full px-4 py-3 rounded-xl border bg-card resize-none
            text-foreground placeholder:text-text-muted
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
            transition-all duration-200
            ${error ? "border-error focus:ring-error/50 focus:border-error" : "border-border hover:border-border-dark"}
            ${className}
          `}
          rows={4}
          {...props}
        />
        {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
