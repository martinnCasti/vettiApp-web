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
  specialty: string;
  available: boolean;
  email: string;
  phone: string;
  location: string;
  schedule: string;
  image: string;
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
    specialty: "Cirugía y Ortopedia",
    available: true,
    email: "maria.gonzalez@vetti.com",
    phone: "+54 11 1234-5678",
    location: "Consultorio 101",
    schedule: "Lun - Vie: 9:00 - 17:00",
    image: "/placeholder-vet-1.jpg",
  },
  {
    id: 2,
    name: "Dr. Carlos Ruiz",
    specialty: "Medicina Interna",
    available: false,
    email: "carlos.ruiz@vetti.com",
    phone: "+54 11 2345-6789",
    location: "Consultorio 102",
    schedule: "Lun - Vie: 11:00 - 19:00",
    image: "/placeholder-vet-2.jpg",
  },
  {
    id: 3,
    name: "Dra. Laura Martínez",
    specialty: "Dermatología",
    available: true,
    email: "laura.martinez@vetti.com",
    phone: "+54 11 3456-7890",
    location: "Consultorio 103",
    schedule: "Mar - Sab: 8:00 - 16:00",
    image: "/placeholder-vet-3.jpg",
  },
  {
    id: 4,
    name: "Dr. Juan Pérez",
    specialty: "Cardiología",
    available: true,
    email: "juan.perez@vetti.com",
    phone: "+54 11 4567-8901",
    location: "Consultorio 104",
    schedule: "Lun - Vie: 10:00 - 18:00",
    image: "/placeholder-vet-4.jpg",
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
    href: "/login/dashboard/citas",
    icon: <Clipboard className="h-5 w-5 mr-3" />,
    title: "Citas y Recordatorios",
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
