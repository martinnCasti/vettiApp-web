import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 z-30 bg-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="w-[80px] h-[69px] relative">
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className="text-gray-700 hover:text-gray-900 flexCenter transition-all hover:font-bold"
                >
                  {link.label}
                </Link>
              ))}
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              type="button"
              title="Login"
              icon="/profile.png"
              variant="btn_dark_green"
              href="/login"
            />
            <Button
              type="button"
              title="Sign Up"
              icon="/profile.png"
              variant="btn_dark_green"
              href="/signup"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Image
              src="/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
