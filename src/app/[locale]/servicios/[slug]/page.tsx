import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ServiceDetailClient from "./ServiceDetailClient";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export const services = {
  ventanas: {
    icon: "🪟",
    titleCa: "Finestres de cristall",
    titleEs: "Ventanas de cristal",
    descriptionCa: "Oferim finestres de cristall de màxima qualitat per a habitatges i negocis. Des del doble vidre fins al cristall temperat, cada solució està dissenyada per proporcionar-li el millor aïllament tèrmic i acústic.",
    descriptionEs: "Ofrecemos ventanas de cristal de máxima calidad para hogares y negocios. Desde el doble vidrio hasta el cristal templado, cada solución está diseñada para proporcionarle el mejor aislamiento térmico y acústico.",
    features: [
      { title: "Doble acristalamiento", desc: "Màxima eficiència energètica amb cambra d'aire entre vidres" },
      { title: "Baix-emissiu", desc: "Reflecteix la calor interior mantenint la llum natural" },
      { title: "Cristall temperat", desc: "6 vegades més resistent que el cristall convencional" },
      { title: "Aïllament acústic", desc: "Redueix fins a 40dB de soroll exterior" },
      { title: "Seguretat reforçada", desc: "Opcions antibandal·lics i anti-intrussió" },
      { title: "Finishes premium", desc: "Marcos d'alumini i PVC amb tractament anticorrosió" },
    ],
    applications: ["Habitatges unifamiliars", "Pisos i apartaments", "Oficines", "Locals comercials", "Industries"],
    badge: "Més venut",
  },
  puertas: {
    icon: "🚪",
    titleCa: "Portes de cristall",
    titleEs: "Puertas de cristal",
    descriptionCa: "Portes de cristall dissenyades per a cada espai. Correderes, batents o automàtiques, totes amb materials premium i acabats impecables.",
    descriptionEs: "Puertas de cristal diseñadas para cada espacio. Correderas, batientes o automáticas, todas con materiales premium y acabados impecables.",
    features: [
      { title: "Sistemes correderes", desc: "Estalvi d'espai amb obertura suau i silenciosa" },
      { title: "Portes batents", desc: "Disseny clàssic amb frontisses de precisió" },
      { title: "Automàtiques", desc: "Sensor de moviment i seguretat integrada" },
      { title: "Cerrajería de qualitat", desc: "Pany, tancament i fulla de cristall de 10-12mm" },
      { title: "Perfileria d'alumini", desc: "Disseny minimalista amb perfileria vista o oculta" },
      { title: "Personalització", desc: "Mides, colors i acabats segons les teves necessitats" },
    ],
    applications: ["Entrades principals", "Portes interiors", "Terrasses i patis", "Locals comercials", " hospitals"],
    badge: "Popular",
  },
  mamparas: {
    icon: "🚿",
    titleCa: "Mampares de bany",
    titleEs: "Mamparas de baño",
    descriptionCa: "Mampares de dutxa a mida amb dissenys moderns i materials resistents. De la simple mampara angular a la complexa solució walk-in.",
    descriptionEs: "Mamparas de ducha a medida con diseños modernos y materiales resistentes. De la simple mampara angular a la compleja solución walk-in.",
    features: [
      { title: "Cristall templat 6-8mm", desc: "Màxima seguretat amb vidre d'alta resistència" },
      { title: "Antical integrat", desc: "Revestiment que facilita la neteja i prevé taques" },
      { title: "Perfils d'alumini", desc: "Estructures resistents a la corrosió" },
      { title: "Estanqueitat total", desc: "Junts de silicona de qualitat i ajust perfecte" },
      { title: "Disseny minimalista", desc: "Sense marcs visibles, línies netes i elegants" },
      { title: "Fàcil instal·lació", desc: "Sistema modular per a qualsevol bany" },
    ],
    applications: ["Banys residencials", "Hotels i hostaleria", "Gimnasos i spas", "Centres comercials"],
    badge: "",
  },
  barandillas: {
    icon: "🏔️",
    titleCa: "Baranes de cristall",
    titleEs: "Barandillas de cristal",
    descriptionCa: "Baranes de cristall templat que combinen elegància i seguretat. Ideals per a escales, balcons, terrasses i piscines.",
    descriptionEs: "Barandillas de cristal templado que combinan elegancia y seguridad. Ideales para escaleras, balcones, terrazas y piscinas.",
    features: [
      { title: "Cristall templat 12mm+", desc: "Resistència excepcional a impactes" },
      { title: "Sistemes de fixació", desc: "Puntuals, amb perfil o enganxades per major transparència" },
      { title: "Acabat biselat", desc: "Vores polides per a màxima seguretat" },
      { title: "Passamanos integrat", desc: "Opcions d'acer inoxidable, fusta o cristall" },
      { title: "Disseny sense barriers", desc: "Transparència màxima per a vistes sense interrupcions" },
      { title: "Certificació CE", desc: "Compliment de totes les normatives europees" },
    ],
    applications: ["Escales interiors", "Balcons", "Terrasses", "Piscines", "Escaparatges"],
    badge: "Premium",
  },
  espejos: {
    icon: "🪞",
    titleCa: "Miralls a mida",
    titleEs: "Espejos a medida",
    descriptionCa: "Miralls decoratius i funcionals fabricats segons les teves especificacions. Des del simple mirall de bany fins a parets senceres de mirall.",
    descriptionEs: "Espejos decorativos y funcionales fabricados según tus especificaciones. Desde el simple espejo de baño hasta paredes enteras de espejo.",
    features: [
      { title: "Fabricació a mida", desc: "Qualsevol forma i dimensió fins a 300x200cm" },
      { title: "LED integrable", desc: "Il·luminació perimetral o retroil·luminada" },
      { title: "Antihumitat", desc: "Tratament específic per a banys i espais humits" },
      { title: "Acabat biselat", desc: "Vores polides amb diferents tipus de bisell" },
      { title: "Vidre de seguretat", desc: "Làmina de seguretat posterior per evitar trencament" },
      { title: "Decoració personalitzada", desc: "Sandblasting, gravats i serigrafia disponible" },
    ],
    applications: ["Banys", "Dormitoris", "Vestidors", "Commerce", " Restaurants"],
    badge: "",
  },
  decorativos: {
    icon: "✨",
    titleCa: "Cristalls decoratius",
    titleEs: "Cristales decorativos",
    descriptionCa: "Cristalls amb personalitat: serigrafiats, gravats, de color i fosa. Transforma qualsevol espai en alguna cosa única.",
    descriptionEs: "Cristales con personalidad: serigrafiados, grabados, de color y fundidos. Transforma cualquier espacio en algo único.",
    features: [
      { title: "Serigrafia digital", desc: "Qualsevol disseny, des de logotips fins a imatges" },
      { title: "Gravat làser", desc: "Precision i detall en el disseny" },
      { title: "Cristall de color", desc: "Amplia gamma de colors i tonalitats" },
      { title: "Fusionats i laminats", desc: "Capes de color amb efectes de profunditat" },
      { title: "Efecte zen", desc: "Motius inspirats en la naturalesa i abstractes" },
      { title: "Privacitat decorativa", desc: "Finestres i particions amb estil propi" },
    ],
    applications: ["Portes interiors", "Finestres", "Particions", "Escaparatges", " Restaurants"],
    badge: "Artístic",
  },
  herreria: {
    icon: "⚙️",
    titleCa: "Ferreria i alumnini",
    titleEs: "Herrería y aluminios",
    descriptionCa: "Estrutures d'alumini i ferro per a tot tipus de projectes. Finestres, portes, tancaments i estructures a mesura.",
    descriptionEs: "Estructuras de aluminio y hierro para todo tipo de proyectos. Ventanas, puertas, cerramientos y estructuras a medida.",
    features: [
      { title: "Alumini de qualitat", desc: "Perfileries de primera qualitat sense plom" },
      { title: "Pintura hornejada", desc: "Acabats Durabilidade i resistents a la corrosió" },
      { title: "Rotlles tèrmics", desc: "Barrera tèrmica per a millor aïllament" },
      { title: "Clients a mida", desc: "Disseny personalitzat per a cada projecte" },
      { title: "Finestres i portes", desc: "Des de finestres oscilo-batents fins a portes d'entrada" },
      { title: "Tancaments", desc: "Terrasses, porxos i hivernacles" },
    ],
    applications: ["Habitatges", "Comerços", "Naus industrials", "Edificis público"],
    badge: "",
  },
  reparacion: {
    icon: "🔧",
    titleCa: "Reparació i manteniment",
    titleEs: "Reparación y mantenimiento",
    descriptionCa: "Servei tècnic especialitzat en reparació i manteniment de tot tipus d'instal·lacions de cristall i alumini. Resolem qualsevol incidència.",
    descriptionEs: "Servicio técnico especializado en reparación y mantenimiento de todo tipo de instalaciones de cristal y aluminio. Resolvemos cualquier incidencia.",
    features: [
      { title: "Reparació i substitució", desc: "Consulta disponibilitat per a incidències" },
      { title: "Substitució de vidres", desc: "Canvi de vidres trencats o deteriorats" },
      { title: "Ajust de portes i finestres", desc: "Reixiu el funcionament de les teves obertures" },
      { title: "Canvi de juntes", desc: "Restablim l'estanqueïtat i aïllament" },
      { title: "Manteniment preventiu", desc: "Revisions periòdiques per evitar averies" },
      { title: "Assegurances", desc: "Treballem amb les principals companyies" },
    ],
    applications: ["Habitatges particulars", "Comunitats de veins", "Empreses", "Administracions"],
    badge: "Reparació",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) return { title: "Servei no trobat" };

  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t(`${slug}.title`), description: t(`${slug}.description`) };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const service = services[slug as keyof typeof services];
  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} slug={slug} allServices={services} />;
}
