"use client";
import {
  Clock,
  Calendar,
  Check,
  X,
  Edit,
  Trash2,
  Plus,
  InfoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import ServicesPageSkeleton from "@/components/vetLogin/Loadings/ServiceLoading";

interface Service {
  id: number;
  name: string;
  timeAvailability: string;
  daysAvailable: string[];
  description: string;
  active: boolean;
}
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

const ServicesList = () => {
  const router = useRouter();
  const { loading } = useSubscriptionStatus();

  const handleEdit = (serviceId: number) => {
    router.push(`/login/dashboard/services/edit/${serviceId}`);
  };

  const handleDelete = async (serviceId: number) => {
    if (window.confirm("¿Está seguro que desea eliminar este servicio?")) {
      try {
        console.log("Servicio eliminado:", serviceId);
      } catch (error) {
        console.error("Error al eliminar servicio:", error);
      }
    }
  };

  const handleAddService = () => {
    router.push("/login/dashboard/servicios/create");
  };

  if (loading) {
    return <ServicesPageSkeleton />;
  }
  const SERVICES_LIST: Service[] = [
    {
      id: 1,
      name: "Consulta General",
      timeAvailability: "9:00 AM - 6:00 PM",
      daysAvailable: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
      description:
        "Consulta veterinaria general para revisión y diagnóstico de mascotas",
      active: true,
    },
    {
      id: 2,
      name: "Vacunación",
      timeAvailability: "10:00 AM - 4:00 PM",
      daysAvailable: ["Lunes", "Miércoles", "Viernes"],
      description:
        "Servicio de vacunación y refuerzos para mascotas según calendario",
      active: true,
    },
  ];
  return (
    <div className="h-full w-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Lista de Servicios
          </h1>
          <p className="text-gray-600 mt-1">
            {SERVICES_LIST.length} servicios disponibles
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
        {SERVICES_LIST.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.name}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    service.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <div className="flex items-center">
                    {service.active ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Activo
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 mr-1" />
                        Inactivo
                      </>
                    )}
                  </div>
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{service.timeAvailability}</span>
                </div>

                <div className="flex items-start text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 mt-1" />
                  <div className="flex flex-wrap gap-1">
                    {service.daysAvailable.map((day, index) => (
                      <span
                        key={index}
                        className="text-sm px-2 py-1 bg-gray-100 rounded"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-start text-gray-600">
                  <InfoIcon className="w-4 h-4 mr-2 mt-1" />
                  <p className="text-sm">{service.description}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleEdit(service.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
