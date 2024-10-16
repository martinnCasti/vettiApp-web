import Content from "@/components/userLogin/Content";
import NavbarDashboard from "@/components/userLogin/NavbarDashboard";
import Sidebar from "@/components/userLogin/Sidebar";
import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <NavbarDashboard />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-slate-400">
          <Content />
          <div className="p-6 bg-gray-100 flex-1">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
