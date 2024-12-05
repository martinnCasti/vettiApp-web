// Construccion de Planes

// Navegacion pagina principal
export const NAV_LINKS = [
  { href: "/", key: "how_vettiapp_work", label: "Que es VettiApp?" },
  { href: "/work", key: "work", label: "Servicios" },
  { href: "/aboutUs", key: "about_us", label: "Sobre nosotros" },
  { href: "/suscribe", key: "subscribe", label: "Asociate" },
  { href: "/getApp", key: "getApp", label: "Descarga la App" },
  // { href: "/", key: "pricing ", label: "Pricing " },
];

export interface PlanFeature {
  name: string;
  included: boolean;
}
export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  buttonText?: string; // Hacemos estas propiedades opcionales
  buttonStyle?: string;
  popular?: boolean;
}
// Tipos de planes y sus caracteristicas
export const PREMIUM_PLAN: PricingPlan = {
  name: "Plan Premium",
  price: "$30.000",
  description: "Para clínicas que buscan crecer",
  features: [
    { name: "Perfil básico de veterinaria", included: true },
    { name: "Listado en el directorio", included: true },
    { name: "Citas ilimitadas", included: true },
    { name: "Gestión avanzada de turnos", included: true },
    { name: "Soporte prioritario 24/7", included: true },
    { name: "Estadísticas avanzadas", included: true },
    { name: "Notificaciones push", included: true },
    { name: "Marketing y promociones", included: true },
    { name: "Gestión de historias clínicas", included: true },
  ],
  // Agregamos estas propiedades
  buttonText: "Suscribite",
  buttonStyle:
    "block w-full rounded-lg px-6 py-3 text-center text-lg font-medium transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  popular: true,
};
//Menu sideBar Dashboard
interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  allowedWhenDisabled: boolean;
}

export const menuItems: MenuItem[] = [
  {
    name: "Home",
    href: "/login/dashboard",
    allowedWhenDisabled: true,
  },
  {
    name: "Servicios",
    href: "/login/dashboard/servicios",
    allowedWhenDisabled: true,
  },
  {
    name: "Calendario",
    href: "/login/dashboard/calendario",
    allowedWhenDisabled: false,
  },
  {
    name: "Turnos",
    href: "/login/dashboard/turnos",
    allowedWhenDisabled: false,
  },
  {
    name: "Mi Perfil",
    href: "/login/dashboard/userConfig",
    allowedWhenDisabled: true,
  },
];

export const VETERINARY_SERVICES = [
  "Consulta general",
  "Vacunación y/o desparasitación",
  "Cardiología veterinaria",
  "Oftalmología",
  "Dermatología",
  "Neurología",
  "Oncología",
  "Ortopedia y traumatología",
  "Rehabilitación y fisioterapia",
  "Endocrinología",
  "Cirugías",
  "Castración",
  "Radiografías",
  "Ecografías",
  "Análisis de laboratorio",
  "Servicios Baño y Corte",
  "Microchip y Emisión de certificados",
] as const;

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Consultas generales":
    "Evaluación completa del estado de salud de tu mascota, incluyendo examen físico y recomendaciones generales",
  "Vacunación y/o desparasitación":
    "Aplicación de vacunas según calendario y tratamientos antiparasitarios internos y externos",
  "Cardiología veterinaria":
    "Diagnóstico y tratamiento de enfermedades cardíacas en mascotas",
  Oftalmología:
    "Atención especializada en problemas oculares y enfermedades de la visión",
  Dermatología:
    "Tratamiento de problemas de piel, alergias y afecciones del pelaje",
  Neurología: "Diagnóstico y tratamiento de trastornos del sistema nervioso",
  Oncología:
    "Diagnóstico y tratamiento de diferentes tipos de cáncer en mascotas",
  "Ortopedia y traumatología":
    "Atención de problemas musculoesqueléticos, fracturas y rehabilitación",
  "Rehabilitación y fisioterapia":
    "Terapias físicas para recuperación post-operatoria y tratamiento de lesiones",
  Endocrinología:
    "Diagnóstico y tratamiento de trastornos hormonales y metabólicos",
  Cirugías: "Procedimientos quirúrgicos generales y especializados",
  Castración:
    "Cirugía de esterilización para prevención de reproducción y beneficios de salud",
  Radiografías: "Estudios de diagnóstico por imagen para evaluación interna",
  Ecografías: "Estudios ecográficos para diagnóstico de órganos internos",
  "Análisis de laboratorio":
    "Pruebas diagnósticas de sangre, orina y otros estudios clínicos",
  "Servicios Baño y Corte":
    "Servicios de higiene y estética para el cuidado de tu mascota",
  "Microchip y Emisión de certificados":
    "Identificación electrónica y documentación oficial para mascotas",
};
