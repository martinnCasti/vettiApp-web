import { ReactNode } from "react";
import {
  Home,
  Users,
  Calendar,
  Clock,
  Settings,
  Clipboard,
} from "lucide-react";

// Construccion Sidebar
export interface MenuItem {
  href: string;
  icon: ReactNode;
  title: string;
}
// Construccion de veterinarios
export interface Veterinarian {
  id: number;
  name: string;
  available: boolean;
  schedule: string;
}
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

// Datos de veterinarios
export const VETERINARIANS_LIST: Veterinarian[] = [
  {
    id: 1,
    name: "Dra. María González",
    available: true,
    schedule: "Lun - Vie: 9:00 - 17:00",
  },
  {
    id: 2,
    name: "Baño de Perros",
    available: false,
    schedule: "Lun - Vie: 11:00 - 19:00",
  },
  {
    id: 3,
    name: "Dra. Laura Martínez",
    available: true,
    schedule: "Mar - Sab: 8:00 - 16:00",
  },
  {
    id: 4,
    name: "Dr. Juan Pérez",
    available: true,
    schedule: "Lun - Vie: 10:00 - 18:00",
  },
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
export const MENU_ITEMS: MenuItem[] = [
  {
    href: "/login/dashboard",
    icon: <Home className="h-5 w-5 mr-3" />,
    title: "Inicio",
  },
  {
    href: "/login/dashboard/vets",
    icon: <Users className="h-5 w-5 mr-3" />,
    title: "Lista de Veterinarios",
  },
  {
    href: "/login/dashboard/turnos",
    icon: <Clock className="h-5 w-5 mr-3" />,
    title: "Turnos",
  },
  {
    href: "/login/dashboard/calendario",
    icon: <Calendar className="h-5 w-5 mr-3" />,
    title: "Calendario",
  },
  {
    href: "/login/dashboard/userConfig",
    icon: <Settings className="h-5 w-5 mr-3" />,
    title: "Configuración de usuario",
  },
];
