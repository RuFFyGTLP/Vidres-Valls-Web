"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSearchParams, useParams } from "next/navigation";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { Input, Textarea } from "@/components/ui/Input";
import { Link } from "@/navigation";
import { getLeadAttribution } from "@/lib/lead-client";
import { trackEvent } from "@/components/providers/AnalyticsProvider";
import {
  AppWindow, DoorOpen, ShowerHead, Mountain,
  Glasses, Sparkles, Wrench, Hammer,
  CheckCircle, ArrowRight, ArrowLeft, Phone, Mail, MessageSquare, LucideIcon
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

const services = [
  { key: "ventanas" },
  { key: "puertas" },
  { key: "mamparas" },
  { key: "barandillas" },
  { key: "espejos" },
  { key: "decorativos" },
  { key: "herreria" },
  { key: "reparacion" },
];

const steps = ["step1", "step2", "step3", "step4"];

export default function PresupuestoPage() {
  const params = useParams();
  const locale = (params.locale as string) || "ca";
  const t = useTranslations("presupuesto");
  const tSrv = useTranslations("services");
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: searchParams.get("servicio") ?? "",
    propertyType: "",
    description: "",
    urgency: "",
    name: "",
    email: "",
    phone: "",
    preferredContact: "",
    preferredTime: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canProceed = () => {
    if (step === 1) return !!form.service;
    if (step === 2) return !!form.propertyType && !!form.description;
    if (step === 3) {
      if (!form.name.trim()) return false;
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return false;
      return true;
    }
    return true;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "El nom és obligatori";
    if (!form.email.trim()) newErrors.email = "L'email és obligatori";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Email invàlid";
    if (form.phone && !/^[\d\s\+\-]{6,}$/.test(form.phone)) newErrors.phone = "Telèfon invàlid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (form.honeypot) return; // bot detected
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: `[Pressupost] ${form.service}\nTipus: ${form.propertyType}\nUrgència: ${form.urgency}\n\n${form.description}`,
          service: form.service,
          urgency: form.urgency,
          locale,
          source: "quote_wizard",
          ...getLeadAttribution(),
        }),
      });
      if (!response.ok) throw new Error("Lead delivery failed");
      setSubmitted(true);
      trackEvent("generate_lead", { source: "quote_wizard", locale, service: form.service });
    } catch (err) {
      console.error("Presupuesto submission error:", err);
      setErrors({ submit: locale === "en" ? "We could not send your request. Please try again." : locale === "es" ? "No hemos podido enviar la solicitud. Inténtalo de nuevo." : "No hem pogut enviar la sol·licitud. Torna-ho a provar." });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-3">
            Sol·licitud rebuda!
          </h2>
          <p className="text-text-muted mb-6">
            Revisarem la sol·licitud i et contactarem tan aviat com sigui possible. Gràcies per confiar en Vidres Valls.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Tornar a l&apos;inici
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="page-hero page-hero--budget py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
        </div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-manrope)] text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-white/60">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      <Section spacing="lg">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-12">
              {steps.map((_, i) => {
                const n = i + 1;
                const active = n === step;
                const done = n < step;
                return (
                  <div key={n} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        done
                          ? "bg-success text-white"
                          : active
                          ? "bg-primary text-white shadow-lg shadow-primary/30"
                          : "bg-surface border border-border text-text-muted"
                      }`}
                    >
                      {done ? <CheckCircle className="w-5 h-5" /> : n}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-12 h-0.5 transition-colors ${done ? "bg-success" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* STEP 1: Service selection */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground">
                      {t("step1")}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {services.map((srv) => {
                        const Icon = iconMap[srv.key] ?? Sparkles;
                        const selected = form.service === srv.key;
                        return (
                          <button
                            key={srv.key}
                            onClick={() => update("service", srv.key)}
                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                              selected
                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                                : "border-border bg-card hover:border-primary/30 hover:shadow-md"
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              selected ? "bg-primary/20" : "bg-surface"
                            }`}>
                              <Icon className={`w-6 h-6 ${selected ? "text-primary" : "text-text-muted"}`} />
                            </div>
                            <span className={`text-xs font-semibold text-center leading-tight ${
                              selected ? "text-primary" : "text-foreground"
                            }`}>
                              {tSrv(`${srv.key}.title`)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: Project details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground">
                      {t("step2")}
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t("propertyType")}</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["residential", "commercial", "industrial"].map((type) => (
                          <button
                            key={type}
                            onClick={() => update("propertyType", type)}
                            className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                              form.propertyType === type
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-card text-text-muted hover:border-primary/30"
                            }`}
                          >
                            {t(type)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t("urgency")}</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["routine", "urgent", "emergency"].map((urg) => (
                          <button
                            key={urg}
                            onClick={() => update("urgency", urg)}
                            className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                              form.urgency === urg
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-card text-text-muted hover:border-primary/30"
                            }`}
                          >
                            {t(urg)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Textarea
                      label={t("description")}
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Descriu les mides, tipus de cristall, colors, o qualsevol detall rellevant..."
                      rows={5}
                    />

                    {/* Honeypot - hidden from real users */}
                    <input
                      type="text"
                      name="website"
                      value={form.honeypot}
                      onChange={(e) => update("honeypot", e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px]"
                    />
                  </div>
                )}

                {/* STEP 3: Contact info */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground">
                      {t("step3")}
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label={t("name") ?? "Nom"}
                        value={form.name}
                        onChange={(e) => { update("name", e.target.value); setErrors((e) => ({ ...e, name: "" })); }}
                        placeholder="Marc García"
                        required
                        error={errors.name}
                      />
                      <Input
                        label={t("email") ?? "Email"}
                        type="email"
                        value={form.email}
                        onChange={(e) => { update("email", e.target.value); setErrors((e) => ({ ...e, email: "" })); }}
                        placeholder="marc@exemple.com"
                        required
                        error={errors.email}
                      />
                    </div>

                    <Input
                      label={t("phone") ?? "Telèfon"}
                      type="tel"
                      value={form.phone}
                      onChange={(e) => { update("phone", e.target.value); setErrors((e) => ({ ...e, phone: "" })); }}
                      placeholder="600 123 456"
                      error={errors.phone}
                    />

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t("preferredContact")}</label>
                      <div className="flex gap-3">
                        {[
                          { key: "phone", icon: Phone, label: t("phone") ?? "Telèfon" },
                          { key: "email", icon: Mail, label: t("email") ?? "Email" },
                          { key: "whatsapp", icon: MessageSquare, label: "WhatsApp" },
                        ].map(({ key, icon: Icon, label }) => (
                          <button
                            key={key}
                            onClick={() => update("preferredContact", key)}
                            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                              form.preferredContact === key
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-card text-text-muted hover:border-primary/30"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">{t("preferredTime")}</label>
                      <div className="flex flex-wrap gap-3">
                        {["morning", "afternoon"].map((time) => (
                          <button
                            key={time}
                            onClick={() => update("preferredTime", time)}
                            className={`flex-1 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                              form.preferredTime === time
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-card text-text-muted hover:border-primary/30"
                            }`}
                          >
                            {t(time)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Confirmation */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground">
                      {t("step4")}
                    </h2>

                    <div className="bg-surface rounded-2xl p-6 border border-border space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <span className="text-text-muted text-sm">{t("service")}</span>
                        <span className="font-semibold text-foreground text-sm">
                          {tSrv(`${form.service}.title`)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <span className="text-text-muted text-sm">{t("propertyType")}</span>
                        <span className="font-semibold text-foreground text-sm">{t(form.propertyType)}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <span className="text-text-muted text-sm">{t("urgency")}</span>
                        <span className="font-semibold text-foreground text-sm">{t(form.urgency)}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <span className="text-text-muted text-sm">{t("description")}</span>
                        <span className="font-semibold text-foreground text-sm text-right max-w-[60%]">{form.description}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border">
                        <span className="text-text-muted text-sm">{t("name")}</span>
                        <span className="font-semibold text-foreground text-sm">{form.name}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-text-muted text-sm">{t("email")}</span>
                        <span className="font-semibold text-foreground text-sm">{form.email}</span>
                      </div>
                    </div>

                    <p className="text-sm text-text-muted text-center">
                      En fer clic a &ldquo;{t("send")}&rdquo;, acceptes la nostra{" "}
                      <Link href="/privacidad" className="text-primary underline">política de privacitat</Link>.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {errors.submit && (
              <p role="alert" className="mt-6 rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
                {errors.submit}
              </p>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-10">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border text-text-muted font-semibold hover:border-primary/30 hover:text-primary transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t("back")}
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={() => {
                    if (step === 3 && !validateStep3()) return;
                    setStep((s) => s + 1);
                  }}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                    canProceed()
                      ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark hover:shadow-primary/50"
                      : "bg-surface border border-border text-text-muted cursor-not-allowed"
                  }`}
                >
                  {t("nextStep")}
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-8 py-3 bg-success text-white rounded-xl font-semibold shadow-lg shadow-success/30 hover:bg-success/90 transition-all"
                >
                  <CheckCircle className="w-5 h-5" />
                  {t("send")}
                </button>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
