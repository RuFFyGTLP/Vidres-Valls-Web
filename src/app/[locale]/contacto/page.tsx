"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import CTABanner from "@/components/sections/CTABanner";
import {
  AppWindow, DoorOpen, ShowerHead, Mountain,
  Glasses, Sparkles, Wrench, Hammer,
  Phone, Mail, MapPin, Clock, Zap, LucideIcon
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

const services = ["ventanas", "puertas", "mamparas", "barandillas", "espejos", "decorativos", "herreria", "reparacion"];

const contactSchema = z.object({
  name: z.string().min(2, "El nom és obligatori"),
  email: z.string().email("Email invàlid"),
  phone: z.string().optional(),
  service: z.string().optional(),
  urgency: z.string().optional(),
  message: z.string().min(10, "El missatge ha de tenir almenys 10 caràcters"),
  honeypot: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const faqs = [
  {
    q: "Quin temps de lliurament té un pressupost?",
    a: "Els pressupostos s'entreguen en 24-48h. El temps d'instal·lació depèn del projecte, però normalment entre 3 i 7 dies laborables des de l'aprovació del pressupost.",
  },
  {
    q: "Oferiu garantia en els vostres treballs?",
    a: "Sí, tots els nostres treballs inclouen garantia de 2 anys en materials i mà d'obra. Els cristalls de seguretat tenen garantia del fabricant.",
  },
  {
    q: "Treballeu amb assegurances?",
    a: "Sí, col·laborem amb les principals companyies d'assegurances. Pots consultar-nos sense compromís.",
  },
  {
    q: "Feu servei d'urgències?",
    a: "Sí, disposem de servei d'urgències 24h per a trencalls i incidents. Truca'ns al 616 88 74 38.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left hover:text-primary transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 flex-shrink-0 text-primary"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-text-muted leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactoPage() {
  const t = useTranslations("contact");
  const tSrv = useTranslations("services");
  const tCta = useTranslations("cta");
  const searchParams = useSearchParams();

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const defaultService = searchParams.get("servicio") ?? "";

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: defaultService,
      urgency: "routine",
    },
  });

  const selectedService = watch("service");

  const onSubmit = async (data: ContactForm) => {
    if (data.honeypot) return; // spam detected
    try {
      setServerError("");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error desconegut");
      }
      setSubmitted(true);
    } catch (err: any) {
      setServerError(err.message || t("error"));
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark-bg via-[#0f172a] via-primary/20 to-dark-bg py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
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

      {/* Contact Content */}
      <Section spacing="lg">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="bg-success/10 border border-success/20 rounded-2xl p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center"
                  >
                    <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-2">
                    {t("success")}
                  </h3>
                  <p className="text-text-muted">Et contactarem el més aviat possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {serverError && (
                    <div role="alert" className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl">
                      {serverError}
                    </div>
                  )}

                  {/* Service selector */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      {tSrv("title")}
                    </label>
                    <input type="hidden" {...register("service")} />
                    <div className="grid grid-cols-4 gap-2">
                      {services.map((srv) => {
                        const Icon = iconMap[srv] ?? AppWindow;
                        const selected = selectedService === srv;
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => {
                              const event = { target: { value: srv } };
                              register("service").onChange(event as any);
                            }}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                              selected
                                ? "border-primary bg-primary/5"
                                : "border-border bg-white hover:border-primary/30"
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${selected ? "text-primary" : "text-text-muted"}`} />
                            <span className={`text-xs font-medium leading-tight text-center ${
                              selected ? "text-primary" : "text-foreground"
                            }`}>
                              {tSrv(`${srv}.title`)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label={t("name")}
                      required
                      aria-invalid={!!errors.name}
                      error={errors.name?.message}
                      placeholder="Marc García"
                      {...register("name")}
                    />
                    <Input
                      label={t("email")}
                      type="email"
                      required
                      aria-invalid={!!errors.email}
                      error={errors.email?.message}
                      placeholder="marc@exemple.com"
                      {...register("email")}
                    />
                  </div>

                  <Input
                    label={t("phone")}
                    type="tel"
                    placeholder="600 123 456"
                    {...register("phone")}
                  />

                  {/* Urgency selector */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Urgència</label>
                    <input type="hidden" {...register("urgency")} />
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { key: "routine", label: "Rutina", icon: Clock, color: "text-text-muted" },
                        { key: "urgent", label: "Urgent", icon: Zap, color: "text-amber-500" },
                        { key: "emergency", label: "Emergència", icon: Phone, color: "text-error" },
                      ].map(({ key, label, icon: Icon, color }) => {
                        const selected = watch("urgency") === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              const event = { target: { value: key } };
                              register("urgency").onChange(event as any);
                            }}
                            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                              selected
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-white text-text-muted hover:border-primary/30"
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${color}`} />
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Textarea
                    label={t("message")}
                    required
                    aria-invalid={!!errors.message}
                    error={errors.message?.message}
                    placeholder="Describe el teu projecte o necessitat..."
                    rows={5}
                    {...register("message")}
                  />

                  {/* Honeypot — invisible to real users */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px]"
                    {...register("honeypot")}
                  />

                  <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? t("sending") : t("submit")}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact info cards */}
              <div className="space-y-4">
                <a href="tel:616887438" className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/20 hover:bg-primary/5 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{t("phone")}</p>
                    <p className="font-bold text-lg">616 88 74 38</p>
                  </div>
                </a>

                <a href="mailto:vidresvalls@vidresvalls.es" className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-secondary/30 hover:bg-secondary/5 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{t("email")}</p>
                    <p className="font-semibold">vidresvalls@vidresvalls.es</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{t("address")}</p>
                    <p className="font-semibold leading-relaxed">Ctra. del Pla, 225, NAVE 21{`\n`}43800 Valls, Tarragona</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{t("hours")}</p>
                    <p className="font-semibold">Lun–Vie: 7:00–15:00</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-64 shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.8378744866287!2d1.2499154761079298!3d41.28661247131064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a479268338afdf%3A0x7b33c1c6d3c82f3!2sCtra.%20del%20Pla%2C%20225%2C%2043800%20Valls%2C%20Tarragona!5e0!3m2!1sen!2ses!4v1704067200000!5m2!1sen!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vidres Valls location"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section spacing="lg" className="bg-surface border-t border-border">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-4">
              Preguntes frequents
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="divide-y divide-border">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      <CTABanner title={tCta("title")} subtitle={tCta("subtitle")} />
    </div>
  );
}
