// app/dashboard/layout.tsx
import NavbarDashboard from "@/components/vetLogin/NavbarDashboard";
import Sidebar from "@/components/vetLogin/Sidebar";
import AnalyticsLoader from "@/components/vetLogin/AnalyticsLoader";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AnalyticsLoader />
      <NavbarDashboard />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 pt-16">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
