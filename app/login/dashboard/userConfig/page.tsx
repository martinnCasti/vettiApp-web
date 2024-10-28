"use client";
import { useEffect, useState } from "react";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  IdCard,
  User2,
} from "lucide-react";
import { userApi } from "@/src/userApi";

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
}

const UserConfig = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
          // Obtener datos frescos de la API
          const userData = await userApi.getUserByEmail(userEmail);
          console.log("Datos del usuario:", userData); // Para debugging
          setUser(userData);
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-100 rounded-full p-4">
            <UserIcon className="h-16 w-16 text-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>

            <div className="flex items-center space-x-3">
              <User2 className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Nombre Completo</p>
                <p className="font-medium">
                  {user ? `${user.name} ${user.lastName}` : "Cargando..."}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Información de Ubicación y Rol */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Ubicación y Rol</h2>

            <div className="flex items-center space-x-3">
              <User2 className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Rol</p>
                <p className="font-medium">
                  {user?.role === "2" ? "Veterinario" : "Usuario"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConfig;
