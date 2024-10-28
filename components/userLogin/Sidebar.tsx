import Link from "next/link";
import {
  Home,
  Users,
  Calendar,
  Clock,
  Settings,
  Clipboard,
} from "lucide-react";

const menuItems = [
  {
    href: "/login/dashboard", // Ruta absoluta
    icon: <Home className="h-5 w-5 mr-3" />,
    title: "Inicio",
  },
  {
    href: "/login/dashboard/vets", // Ruta absoluta
    icon: <Users className="h-5 w-5 mr-3" />,
    title: "Lista de Veterinarios",
  },
  {
    href: "/login/dashboard/turnos", // Ruta absoluta
    icon: <Clock className="h-5 w-5 mr-3" />,
    title: "Turnos",
  },
  {
    href: "/login/dashboard/citas", // Ruta absoluta
    icon: <Clipboard className="h-5 w-5 mr-3" />,
    title: "Citas y Recordatorios",
  },
  {
    href: "/login/dashboard/calendario", // Ruta absoluta
    icon: <Calendar className="h-5 w-5 mr-3" />,
    title: "Calendario",
  },
  {
    href: "/login/dashboard/userConfig", // Ruta absoluta
    icon: <Settings className="h-5 w-5 mr-3" />,
    title: "Configuración de usuario",
  },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-400 shadow-lg h-[calc(100vh-4rem)] fixed">
      <nav className="mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-slate-300 hover:text-gray-900 transition-colors duration-200"
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
