"use client";
import { Check } from "lucide-react";
import Link from "next/link";
import { PREMIUM_PLAN } from "@/constants";

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
  return (
    <div className="min-h-screen bg-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Asociate con un solo clic
          </h2>
        </div>

        <div className="flex justify-center max-w-2xl mx-auto">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full">
            <div className="p-8 flex flex-col items-center">
              <div className="mb-8 text-center w-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {PREMIUM_PLAN.name}
                </h3>
                <p className="text-gray-600">{PREMIUM_PLAN.description}</p>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {PREMIUM_PLAN.price}
                  </span>
                  <span className="text-gray-600 ml-1">/mes</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 w-full max-w-md">
                {PREMIUM_PLAN.features.map((feature, index) => (
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

              <div className="w-full max-w-md">
                <Link href="/signup" className="block w-full">
                  <button className={PREMIUM_PLAN.buttonStyle}>
                    {PREMIUM_PLAN.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Los precios son expresados en Pesos Argentinos incluyendo el IVA
            <br />
            Puede cancelar su suscripción en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
