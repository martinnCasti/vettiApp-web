"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User as UserIcon, LogOut } from "lucide-react";
import { userApi, Vet } from "@/src/userApi";
import cookie from "js-cookie";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import Link from "next/link";
import { menuItems } from "@/constants";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<Vet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isStatusDisabled } = useSubscriptionStatus();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("vetId");

        if (!userId) {
          router.push("/login/dashboard");
          return;
        }

        const userData = await userApi.getVetById(parseInt(userId));

        if (userData && userData.statusCode === 200) {
          setUser(userData);
        } else {
          router.push("/login/dashboard");
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

  const handleLogout = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    localStorage.clear();
    cookie.remove("access_token");
    cookie.remove("refresh_token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("user-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = !isSidebarOpen ? "hidden" : "unset";
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <nav className="bg-slate-400 shadow-lg fixed top-0 left-0 right-0 z-50 h-16">
        <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y Botón de Menú */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-md hover:bg-gray-700/10 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6 text-gray-800" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-800" />
                )}
              </button>

              <div className="flex items-center gap-2">
                <img
                  src="/logo_Vetti.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                {isStatusDisabled && (
                  <span className="hidden sm:inline-block text-sm text-white bg-yellow-500 px-2 py-1 rounded-full whitespace-nowrap">
                    Cuenta en revisión
                  </span>
                )}
              </div>
            </div>

            {/* Sección de usuario */}
            <div className="flex items-center">
              {/* Usuario Desktop */}
              <div className="hidden md:block">
                <div id="user-dropdown" className="relative">
                  <button
                    className="flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
                    <span className="text-gray-700">
                      Bienvenido{user ? `, ${user.name}` : ""}
                    </span>
                    <ChevronDown
                      className={`ml-2 h-4 w-4 text-gray-500 transform transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`
                      absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1
                      transform transition-all duration-200 origin-top
                      ${
                        isDropdownOpen
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none"
                      }
                    `}
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full transition-colors duration-200"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>

              {/* Usuario Mobile */}
              <div className="flex md:hidden items-center gap-2">
                {isStatusDisabled && (
                  <span className="text-xs text-white bg-yellow-500 px-2 py-1 rounded-full whitespace-nowrap">
                    En revisión
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="p-1.5 flex items-center gap-1.5 bg-red-500 hover:bg-red-500 text-white rounded text-sm transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Salir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar móvil */}
      <div
        className={`
          fixed inset-y-0 left-0 w-64 bg-white shadow-xl md:hidden
          transform transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-16 bg-slate-400 w-full" />

        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col w-full">
            <div className="relative">
              {menuItems.map((item) => {
                const isAllowed = !isStatusDisabled || item.allowedWhenDisabled;

                return (
                  <Link
                    key={item.href}
                    href={isAllowed ? item.href : "#"}
                    className={`
                      flex items-center px-6 py-3 w-full
                      text-gray-700 bg-white
                      transition-all duration-200
                      relative
                      ${
                        !isAllowed
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100 cursor-pointer"
                      }
                    `}
                    onClick={() => {
                      if (isAllowed) {
                        setIsSidebarOpen(false);
                      }
                    }}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    <span className="font-medium">{item.name}</span>
                    {!isAllowed && (
                      <span className="ml-2 text-xs text-gray-500">
                        (No disponible)
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarDashboard;
