"use client";
import { useState, useEffect } from "react";
import { Check, CalendarDays, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getVetServices, type Service } from "@/src/services/userServices";
import ServicesPageSkeleton from "@/components/vetLogin/Loadings/ServiceLoading";

const ServiceList = () => {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const data = await getVetServices();
        setServices(data);
      } catch (err) {
        setError(err as Error);
        console.error("Error al cargar los servicios:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleScheduleAppointment = () => {
    router.push("/login/dashboard/calendario");
  };

  const handleAddService = () => {
    router.push("/login/dashboard/servicios/create");
  };

  const handleDeleteService = (serviceId: number) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este servicio?")) {
      // Aquí iría la lógica para eliminar el servicio
      console.log("Eliminar servicio:", serviceId);
    }
  };

  if (isLoading) {
    return <ServicesPageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">
        Error al cargar los servicios: {error.message}
      </div>
    );
  }

  return (
    <div className="h-full w-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Lista de Servicios
          </h1>
          <p className="text-gray-600 mt-1">
            {services.length} servicios disponibles
          </p>
        </div>
        <button
          onClick={handleAddService}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Agregar Servicio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Header con nombre, estado y botón de eliminar */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <Check className="w-4 h-4 mr-1" />
                    Activo
                  </span>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Eliminar servicio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Descripción */}
              {service.description && (
                <div className="text-sm text-gray-600">
                  {service.description}
                </div>
              )}

              {/* Botón de agendar */}
              <button
                onClick={handleScheduleAppointment}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <CalendarDays className="w-4 h-4" />
                Agendar Turno
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
