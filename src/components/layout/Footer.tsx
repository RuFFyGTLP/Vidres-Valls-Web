import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const services = [
  "ventanas",
  "puertas",
  "mamparas",
  "barandillas",
  "espejos",
  "decorativos",
  "herreria",
  "reparacion",
];

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white">
                <Image src="/logo-vidres-valls.png" alt="Vidres Valls" fill className="object-contain" />
              </div>
              <span className="font-bold text-lg text-white">VIDRES VALLS</span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="mt-4 flex gap-3">
              <a href="tel:616887438" aria-label="Trucar a Vidres Valls" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a href="mailto:vidresvalls@vidresvalls.es" aria-label="Enviar email a Vidres Valls" className="text-slate-300 hover:text-white transition-colors">
                <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {(["inicio", "nosotros", "servicios", "galeria", "blog", "contacto"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={key === "inicio" ? "/" : `/${key === "nosotros" ? "sobre-nosotros" : key}`}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service}>
                  <span className="text-sm text-slate-300">
                    {t(`services.${service}.title`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("footer.contactInfo")}</h3>
            <address className="not-italic text-sm text-slate-300 space-y-3">
              <p className="whitespace-pre-line">{t("contact.addressValue")}</p>
              <p>
                <a href="tel:616887438" className="hover:text-white transition-colors">
                  616 88 74 38
                </a>
              </p>
              <p>
                <a href="mailto:vidresvalls@vidresvalls.es" className="hover:text-white transition-colors">
                  vidresvalls@vidresvalls.es
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-dark flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {year} Vidres Valls. {t("footer.rights")}.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="/aviso-legal" className="hover:text-slate-300 transition-colors">
              {t("footer.legal")}
            </Link>
            <Link href="/privacidad" className="hover:text-slate-300 transition-colors">
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
