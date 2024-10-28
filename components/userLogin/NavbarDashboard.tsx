"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, User as UserIcon, LogOut } from "lucide-react";
import { userApi, User } from "@/src/userApi";
import cookie from "js-cookie";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-600 text-lg mt-4">Cargando...</p>
      </div>
    </div>
  );
};

const NavbarDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
          router.push("/login");
          return;
        }

        const userData = await userApi.getUserByEmail(userEmail);

        if (userData && userData.statusCode === 200) {
          setUser(userData);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        router.push("/login");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    try {
      localStorage.clear();
      cookie.remove("access_token");
      cookie.remove("refresh_token");
      router.push("/login");
    } catch (error) {
      console.error("Error durante el logout:", error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <nav className="bg-slate-400 shadow-md fixed w-full z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute left-0 flex items-center h-full pl-4">
            <img
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <div className="absolute right-0 h-full pr-4 flex items-center">
            <div className="hidden md:flex items-center">
              <div className="relative">
                <button
                  className="flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
                  <span className="text-gray-700">
                    Bienvenido
                    {user ? `, ${user.name} ${user.lastName}` : ""}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                </button>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center md:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <UserIcon className="h-10 w-10 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user?.name} {user?.lastName}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarDashboard;
