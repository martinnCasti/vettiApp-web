"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();

  // No mostrar el Navbar principal en rutas que empiecen con /dashboard
  const shouldShowNavbar =
    !pathname.startsWith("/dashboard") && !pathname.startsWith("/login");

  return shouldShowNavbar ? <Navbar /> : null;
};

export default NavbarWrapper;
