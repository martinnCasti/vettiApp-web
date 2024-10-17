import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="bg-slate-400 min-h-screen flex flex-col">
      <Navbar />
      {children}{" "}
      {/* Los children ahora contendrán el layout de dashboard si accedes a esa ruta */}
    </div>
  );
};

export default LoginLayout;
