"use client";
import { Clock, Mail, Phone, MapPin, Check, X } from "lucide-react";
import { VETERINARIANS_LIST, type Veterinarian } from "@/constants";

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
                  <p className="text-sm text-gray-600">{vet.specialty}</p>
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
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{vet.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{vet.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{vet.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{vet.schedule}</span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-6 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Ver Perfil
                </button>
                <button className="flex-1 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                  Agendar Cita
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
