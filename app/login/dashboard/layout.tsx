"use client";
import { useEffect, useState, ReactNode } from "react";
import NavbarDashboard from "@/components/vetLogin/NavbarDashboard";
import Sidebar from "@/components/vetLogin/Sidebar";
import AnalyticsLoader from "@/components/vetLogin/AnalyticsLoader";
import DisabledBanner from "@/components/vetLogin/DisabledBanner"; // actualizamos la importación
import { usePathname, useRouter } from "next/navigation";
import { userApi } from "@/src/userApi";
import React from "react";

const ALLOWED_DISABLED_ROUTES = [
  "/login/dashboard/servicios",
  "/login/dashboard/userConfig",
  "/login/dashboard",
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

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

        const status = localStorage.getItem("userStatus");
        setIsDisabled(status === "disabled");
        setIsLoading(false);
      } catch (error) {
        console.error("Error validando usuario:", error);
        router.push("/login");
      }
    };

    validateUser();
  }, [router]);

  const isRouteAllowed = () => {
    if (!isDisabled) return true;
    return ALLOWED_DISABLED_ROUTES.some((route) => pathname?.startsWith(route));
  };

  const shouldShowContent = () => {
    if (pathname === "/login/dashboard" && isDisabled) {
      return true;
    }
    return isRouteAllowed();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnalyticsLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavbarDashboard isDisabled={isDisabled} />
      <div className="pt-16">
        <Sidebar isDisabled={isDisabled} />
        <main className="pl-64">
          {isDisabled && <DisabledBanner />}
          <div className="bg-gray-100 min-h-[calc(100vh-4rem)]">
            <div className="p-6">
              {shouldShowContent() ? (
                React.cloneElement(children as React.ReactElement, {
                  isDisabled,
                })
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
