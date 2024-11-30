"use client";
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
      <body
        className={`min-h-screen flex flex-col ${
          !isDashboard && "bg-slate-400 pt-10"
        }`}
      >
        {!isDashboard && <NavbarWrapper />}
        <main className="flex-1 flex flex-col">{children}</main>
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
