"use client";
import { useEffect, ReactNode } from "react";
import NavbarDashboard from "@/components/vetLogin/NavbarDashboard";
import Sidebar from "@/components/vetLogin/Sidebar";
import DisabledBanner from "@/components/vetLogin/DisabledBanner";
import { usePathname, useRouter } from "next/navigation";
import { userApi } from "@/src/userApi";
import React from "react";
import PaymentBanner from "@/components/vetLogin/PaymentBanner";
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
  const { isStatusDisabled, isPaymentPending, checkStatus } =
    useSubscriptionStatus();

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

        // Actualizar el estado global
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
    <div className="min-h-screen bg-white">
      <NavbarDashboard />
      <div className="pt-16">
        <Sidebar />
        <main className="pl-64">
          <DisabledBanner />
          <PaymentBanner />
          <div className="bg-gray-100 min-h-[calc(100vh-4rem)]">
            <div className="p-6">
              {shouldShowContent() ? (
                children
              ) : (
                <div className="text-center p-8">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Esta sección no está disponible mientras tu cuenta está en
                    revisión
                  </h2>
                  <p className="text-gray-600 mt-2">
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
