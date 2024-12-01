"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Edit,
} from "lucide-react";
import { userApi, type Vet } from "@/src/userApi";
import { useRouter } from "next/navigation";

const SkeletonLoading = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      {/* Avatar skeleton */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-gray-200 rounded-full w-24 h-24 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información Personal skeleton */}
        <div className="space-y-6">
          <div className="h-7 bg-gray-200 rounded w-48 animate-pulse mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-36 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ubicación y Documentación skeleton */}
        <div className="space-y-6">
          <div className="h-7 bg-gray-200 rounded w-48 animate-pulse mb-6"></div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-36 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserConfig = () => {
  const [user, setUser] = useState<Vet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("vetId");

        if (!userId) {
          router.push("/login");
          return;
        }

        const userData = await userApi.getCurrentUser();

        if (isMounted && userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        if (isMounted) {
          const localData: Vet = {
            id: parseInt(localStorage.getItem("vetId") || "0"),
            statusCode: 200,
            message: "",
            email: localStorage.getItem("userEmail") || "",
            name: localStorage.getItem("userName") || "",
            phoneNumber: localStorage.getItem("phoneNumber") || "",
            role: localStorage.getItem("userRole") || "",
            cuit: localStorage.getItem("cuit") || "",
            address: localStorage.getItem("address") || "",
            district: localStorage.getItem("district") || "",
            status: localStorage.getItem("status") || "",
            payment: localStorage.getItem("payment") || "",
          };
          setUser(localData);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleEdit = () => {
    const userId = localStorage.getItem("vetId");
    if (userId) {
      router.push(`/login/dashboard/userConfig/edit-profile/${userId}`);
    }
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto relative">
        {/* Botón de editar */}
        <button
          onClick={handleEdit}
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Edit className="h-4 w-4" />
          Editar
        </button>

        {/* Header con avatar */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-100 rounded-full p-4">
            <User className="h-16 w-16 text-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información Personal */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Información Personal
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Nombre Veterinaria</p>
                  <p className="font-medium">{user?.name || "No disponible"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">
                    {user?.email || "No disponible"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">
                    {user?.phoneNumber || "No disponible"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Ubicación y Documentación */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Ubicación y Documentación
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Dirección</p>
                  <p className="font-medium">
                    {user?.address || "No disponible"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">CUIT</p>
                  <p className="font-medium">{user?.cuit || "No disponible"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConfig;
