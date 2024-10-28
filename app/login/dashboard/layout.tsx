import Content from "@/components/userLogin/Content";
import NavbarDashboard from "@/components/userLogin/NavbarDashboard";
import Sidebar from "@/components/userLogin/Sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarDashboard />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-64">
          {" "}
          {/* Añadimos ml-64 para compensar el ancho del sidebar */}
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
