"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  // Lista de rutas donde no queremos mostrar el Navbar principal
  const excludedRoutes = [
    "/login/dashboard",
    // Agrega aquí otras rutas donde no quieras mostrar el Navbar principal
  ];

  // Verificar si la ruta actual comienza con alguna de las rutas excluidas
  const shouldHideNavbar = excludedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Si no debemos ocultar el navbar, lo mostramos
  return !shouldHideNavbar ? <Navbar /> : null;
};

export default NavbarWrapper;
