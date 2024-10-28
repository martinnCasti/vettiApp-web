"use client";
import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <html lang="en">
      <body className="bg-slate-400">
        <NavbarWrapper />
        <main className="relative overflow-hidden">{children}</main>
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
