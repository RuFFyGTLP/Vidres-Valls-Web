"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type ToastType = "success" | "error" | "loading";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  loading: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss for success and error (not loading)
    if (type !== "loading") {
      setTimeout(() => removeToast(id), 5000);
    }
  }, [removeToast]);

  const success = useCallback((message: string) => showToast(message, "success"), [showToast]);
  const error = useCallback((message: string) => showToast(message, "error"), [showToast]);
  const loading = useCallback((message: string) => showToast(message, "loading"), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, loading }}>
      {children}
      {/* Toast Container */}
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`
                flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl backdrop-blur-sm
                ${toast.type === "success" ? "bg-success/10 border border-success/20 text-success" : ""}
                ${toast.type === "error" ? "bg-error/10 border border-error/20 text-error" : ""}
                ${toast.type === "loading" ? "bg-surface border border-border text-foreground" : ""}
              `}
            >
              {toast.type === "success" && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              {toast.type === "loading" && <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin" />}
              <span className="font-medium">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 p-1 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Tancar notificació"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}