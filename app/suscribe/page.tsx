"use client";
import { Check, X } from "lucide-react";
import Link from "next/link";

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

const PricingPage = () => {
  const premiumPlan = {
    name: "Plan Premium",
    price: "19.99", // Actualizado al precio de la imagen
    description: "Para clínicas que buscan crecer",
    features: [
      { name: "Perfil básico de veterinaria", included: true },
      { name: "Listado en el directorio", included: true },
      { name: "Citas ilimitadas", included: true },
      { name: "Gestión avanzada de turnos", included: true },
      { name: "Soporte prioritario 24/7", included: true },
      { name: "Estadísticas avanzadas", included: true },
      { name: "Notificaciones push", included: true },
      { name: "Marketing y promociones", included: true },
      { name: "Gestión de historias clínicas", included: true },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Asociate con un solo clic
          </h2>
        </div>

        {/* Single Centered Card */}
        <div className="flex justify-center max-w-2xl mx-auto">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full">
            <div className="p-8 flex flex-col items-center">
              {/* Plan Header */}
              <div className="mb-8 text-center w-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {premiumPlan.name}
                </h3>
                <p className="text-gray-600">{premiumPlan.description}</p>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${premiumPlan.price}
                  </span>
                  <span className="text-gray-600 ml-1">/mes</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8 w-full max-w-md">
                {premiumPlan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center text-gray-600"
                  >
                    <div className="flex items-center w-full max-w-xs">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-900">{feature.name}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="w-full max-w-md">
                <Link href="/signup" className="block w-full">
                  <button className="w-full rounded-lg px-6 py-3 text-center text-lg font-medium transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600">
                    Comenzar 14 días gratis
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Todos los precios están en USD y no incluyen impuestos si son
            aplicables.
            <br />
            Puede cancelar su suscripción en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
