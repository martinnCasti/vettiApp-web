import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-8">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={84} height={69} />
      </Link>
      <ul className="hidden h-full gap-20 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-green-90 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>
      <div className="lg:flexCenter hidden">
        <Button
          type="button"
          title="Login"
          icon="/profile.png"
          variant="btn_dark_green"
          href="/login"
        />
      </div>
      <div className="lg:flex  hidden">
        <Button
          type="button"
          title="Sign Up"
          icon="/profile.png"
          variant="btn_dark_green"
          href="/signup"
        />
      </div>
      <Image
        src="/menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
