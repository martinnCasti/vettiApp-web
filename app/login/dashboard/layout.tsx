"use client";
import { useEffect, ReactNode } from "react";
import NavbarDashboard from "@/components/vetLogin/Dashboard/NavbarDashboard";
import Sidebar from "@/components/vetLogin/Sidebar";
import DisabledBanner from "@/components/vetLogin/DisabledBanner";
import { usePathname, useRouter } from "next/navigation";
import { userApi } from "@/src/userApi";
import React from "react";
import PaymentBanner from "@/components/vetLogin/Payment/PaymentBanner";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";

const ALLOWED_DISABLED_ROUTES = [
  "/login/dashboard/servicios",
  "/login/dashboard/userConfig",
  "/login/dashboard",
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isStatusDisabled, checkStatus } = useSubscriptionStatus();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const vetId = localStorage.getItem("vetId");

        if (!vetId) {
          router.push("/login");
          return;
        }

        const userData = await userApi.getVetById(parseInt(vetId));

        if (!userData || userData.statusCode !== 200) {
          router.push("/login");
          return;
        }

        checkStatus();
      } catch (error) {
        console.error("Error validando usuario:", error);
        router.push("/login");
      }
    };

    validateUser();
  }, [router, checkStatus]);

  const isRouteAllowed = () => {
    if (!isStatusDisabled) return true;
    return ALLOWED_DISABLED_ROUTES.some((route) => pathname?.startsWith(route));
  };

  const shouldShowContent = () => {
    if (pathname === "/login/dashboard" && isStatusDisabled) {
      return true;
    }
    return isRouteAllowed();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <NavbarDashboard />
      <div className="flex-1 pt-16 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 md:pl-64 transition-all duration-300 flex flex-col min-h-0">
          <DisabledBanner />
          <PaymentBanner />
          <div className="flex-1 overflow-y-auto bg-gray-100">
            <div className="p-4 md:p-6 min-h-full">
              {shouldShowContent() ? (
                children
              ) : (
                <div className="text-center p-4 md:p-8">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-700">
                    Esta sección no está disponible mientras tu cuenta está en
                    revisión
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 mt-2">
                    Por favor, completa tu perfil y agrega tus servicios
                    mientras tanto.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
