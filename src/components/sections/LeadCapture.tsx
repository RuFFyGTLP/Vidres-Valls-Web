"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { trackEvent } from "@/components/providers/AnalyticsProvider";
import { getLeadAttribution } from "@/lib/lead-client";

const copy = {
  ca: { eyebrow: "Resposta personalitzada", title: "Explica'ns què necessites", body: "Amb tres dades podem orientar-te i preparar el següent pas sense fer-te perdre temps.", name: "Nom", phone: "Telèfon", service: "Què necessites?", submit: "Vull que em contacteu", success: "Sol·licitud rebuda. Et contactarem aviat.", consent: "En enviar acceptes la política de privacitat.", error: "No s'ha pogut enviar. Torna-ho a provar.", services: { ventanas: "Finestres", mamparas: "Mampares", barandillas: "Baranes", puertas: "Portes", otro: "Altres solucions" } },
  es: { eyebrow: "Respuesta personalizada", title: "Cuéntanos qué necesitas", body: "Con tres datos podemos orientarte y preparar el siguiente paso sin hacerte perder tiempo.", name: "Nombre", phone: "Teléfono", service: "¿Qué necesitas?", submit: "Quiero que me contacten", success: "Solicitud recibida. Te contactaremos pronto.", consent: "Al enviar aceptas la política de privacidad.", error: "No se ha podido enviar. Inténtalo de nuevo.", services: { ventanas: "Ventanas", mamparas: "Mamparas", barandillas: "Barandillas", puertas: "Puertas", otro: "Otra solución" } },
  en: { eyebrow: "Personal response", title: "Tell us what you need", body: "Three details are enough for us to recommend the next step without wasting your time.", name: "Name", phone: "Phone", service: "What do you need?", submit: "Request a callback", success: "Request received. We will contact you shortly.", consent: "By submitting you accept the privacy policy.", error: "We could not send it. Please try again.", services: { ventanas: "Windows", mamparas: "Shower screens", barandillas: "Balustrades", puertas: "Doors", otro: "Other solution" } },
};

export default function LeadCapture() {
  const locale = ((useParams().locale as string) || "ca") as keyof typeof copy;
  const t = copy[locale] || copy.ca;
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(formData: FormData) {
    setState("sending");
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: "",
      service: formData.get("service"),
      message: `Quick callback request: ${formData.get("service")}`,
      source: "homepage_quick_lead",
      locale,
      honeypot: formData.get("website"),
      ...getLeadAttribution(),
    };
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (response.ok) {
      setState("success");
      trackEvent("generate_lead", { source: "homepage_quick_lead", locale, service: String(payload.service || "") });
    } else setState("error");
  }

  return (
    <section className="bg-dark-bg py-16 md:py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">{t.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">{t.title}</h2>
          <p className="mt-4 max-w-lg text-white/65">{t.body}</p>
          <a href="tel:616887438" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary-light"><PhoneCall className="h-5 w-5" />616 88 74 38</a>
        </div>
        {state === "success" ? (
          <div className="flex min-h-52 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10 p-8 text-center">
            <div><CheckCircle2 className="mx-auto h-10 w-10 text-primary-light" /><p className="mt-4 text-lg font-semibold">{t.success}</p></div>
          </div>
        ) : (
          <form action={submit} className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-2 md:p-7">
            <input name="name" required minLength={2} aria-label={t.name} placeholder={t.name} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/45" />
            <input name="phone" required minLength={6} aria-label={t.phone} placeholder={t.phone} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/45" />
            <select name="service" required aria-label={t.service} className="rounded-xl border border-white/15 bg-dark-card px-4 py-3 text-white sm:col-span-2">
              <option value="">{t.service}</option>
              <option value="ventanas">{t.services.ventanas}</option>
              <option value="mamparas">{t.services.mamparas}</option>
              <option value="barandillas">{t.services.barandillas}</option>
              <option value="puertas">{t.services.puertas}</option>
              <option value="otro">{t.services.otro}</option>
            </select>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button disabled={state === "sending"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary-dark disabled:opacity-60 sm:col-span-2">
              {t.submit}<ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-xs text-white/45 sm:col-span-2">{state === "error" ? t.error : t.consent}</p>
          </form>
        )}
      </div>
    </section>
  );
}
