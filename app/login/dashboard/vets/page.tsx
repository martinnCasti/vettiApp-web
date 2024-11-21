"use client";
import {
  Clock,
  Mail,
  Phone,
  MapPin,
  Check,
  X,
  Edit,
  Trash2,
} from "lucide-react";
import { VETERINARIANS_LIST, type Veterinarian } from "@/constants";
import { useRouter } from "next/navigation";

// Componente Card personalizado
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

const VeterinariansList = () => {
  const router = useRouter();

  const handleEdit = (vetId: number) => {
    router.push(`/login/dashboard/vets/edit/${vetId}`);
  };

  const handleDelete = async (vetId: number) => {
    if (window.confirm("¿Está seguro que desea eliminar este veterinario?")) {
      try {
        // Aquí irá la lógica de eliminación
        // await userApi.deleteVet(vetId);
        // Recargar la lista después de eliminar
        console.log("Veterinario eliminado:", vetId);
      } catch (error) {
        console.error("Error al eliminar veterinario:", error);
      }
    }
  };

  return (
    <div className="h-full w-full space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Lista de Veterinarios
          </h1>
          <p className="text-gray-600 mt-1">
            {VETERINARIANS_LIST.length} veterinarios disponibles
          </p>
        </div>
      </div>

      {/* Grid de tarjetas de veterinarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {VETERINARIANS_LIST.map((vet) => (
          <Card
            key={vet.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              {/* Encabezado de la tarjeta */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {vet.name}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    vet.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <div className="flex items-center">
                    {vet.available ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Disponible
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 mr-1" />
                        No Disponible
                      </>
                    )}
                  </div>
                </span>
              </div>

              {/* Información de contacto */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{vet.schedule}</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleEdit(vet.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(vet.id)}
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

export default VeterinariansList;
