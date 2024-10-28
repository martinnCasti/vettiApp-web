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
        {" "}
        {/* Agregamos pt-16 para el espacio del navbar fijo */}
        <Sidebar />
        <div className="flex-1">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
