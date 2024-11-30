// Construccion de Planes
export interface PlanFeature {
  name: string;
  included: boolean;
}
export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  buttonStyle: string;
  popular?: boolean;
}

// Navegacion pagina principal
export const NAV_LINKS = [
  { href: "/", key: "how_vettiapp_work", label: "Que es VettiApp?" },
  { href: "/work", key: "work", label: "Servicios" },
  { href: "/aboutUs", key: "about_us", label: "Sobre nosotros" },
  { href: "/suscribe", key: "subscribe", label: "Asociate" },
  { href: "/getApp", key: "getApp", label: "Descarga la App" },
  // { href: "/", key: "pricing ", label: "Pricing " },
];

// Tipos de planes y sus caracteristicas
export const PREMIUM_PLAN = {
  name: "Plan Premium",
  price: "29.99",
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
