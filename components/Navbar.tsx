import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Button from "./Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cerrar el menú cuando se hace clic en cualquier lugar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const menu = document.getElementById("mobile-menu");
        const hamburgerButton = document.getElementById("hamburger-button");

        // Si el clic no fue en el menú ni en el botón hamburguesa, cerrar el menú
        if (
          menu &&
          hamburgerButton &&
          !menu.contains(event.target as Node) &&
          !hamburgerButton.contains(event.target as Node)
        ) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <nav className="w-full fixed top-0 z-30 bg-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar principal */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-[80px] h-[69px] relative">
                <Image
                  src="/public/logo_vetti.png"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Links de navegación desktop */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className="text-gray-700 hover:text-gray-900 flexCenter transition-all hover:font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </ul>
          </div>

          {/* Botones desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              type="button"
              title="Logearse"
              icon="/profile.png"
              variant="btn_dark_green"
              href="/login"
              onClick={() => setIsMenuOpen(false)}
            />
            <Button
              type="button"
              title="Registrate"
              icon="/profile.png"
              variant="btn_dark_green"
              href="/signup"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>

          {/* Botón hamburguesa */}
          <button
            id="hamburger-button"
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <Image
              src="/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer transition-transform duration-200 ease-in-out"
              style={{ transform: isMenuOpen ? "rotate(90deg)" : "rotate(0)" }}
            />
          </button>
        </div>

        {/* Menú móvil */}
        <div
          id="mobile-menu"
          className={`
            lg:hidden fixed inset-0 top-16 bg-slate-400
            transform transition-all duration-300 ease-in-out
            ${
              isMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }
          `}
        >
          <div className="px-4 pt-4 pb-6 space-y-4">
            {/* Links de navegación móvil */}
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-300 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Botones móvil */}
            <div className="space-y-2 pt-4">
              <Button
                type="button"
                title="Logearse"
                icon="/profile.png"
                variant="btn_dark_green"
                href="/login"
                fullWidth
                onClick={() => setIsMenuOpen(false)}
              />
              <Button
                type="button"
                title="Registrate"
                icon="/profile.png"
                variant="btn_dark_green"
                href="/signup"
                fullWidth
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
