"use client";
import {
  Users,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown,
  Syringe,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface DashboardContentProps {
  isDisabled: boolean;
  isPaymentPending: boolean;
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

const DashboardContent: React.FC<DashboardContentProps> = ({
  isDisabled,
  isPaymentPending,
}) => {
  const stats = [
    {
      title: "Total de Veterinarios",
      value: "12",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      change: "+2",
      trend: "up",
      description: "activos este mes",
    },
    {
      title: "Citas Pendientes",
      value: "24",
      icon: <Calendar className="w-8 h-8 text-green-500" />,
      change: "+5",
      trend: "up",
      description: "para hoy",
      requiresEnabled: true,
    },
    {
      title: "Atenciones del Día",
      value: "45",
      icon: <Activity className="w-8 h-8 text-orange-500" />,
      change: "+12",
      trend: "up",
      description: "completadas",
      requiresEnabled: true,
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      petName: "Max",
      ownerName: "Juan Pérez",
      service: "Vacunación",
      time: "14:30",
      doctor: "Dra. María González",
      status: "Pendiente",
    },
    {
      id: 2,
      petName: "Luna",
      ownerName: "Ana García",
      service: "Control",
      time: "15:00",
      doctor: "Dr. Carlos Ruiz",
      status: "Confirmada",
    },
    {
      id: 3,
      petName: "Rocky",
      ownerName: "Pedro López",
      service: "Emergencia",
      time: "15:30",
      doctor: "Dra. Laura Martínez",
      status: "En proceso",
    },
  ];

  return (
    <div className="h-full w-full max-w-[calc(100vw-16rem)] space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`p-4 hover:shadow-lg transition-shadow duration-200 ${
              stat.requiresEnabled && isDisabled ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
              <span
                className={`flex items-center text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-600">
                {stat.title}
                {stat.requiresEnabled && isDisabled && (
                  <span className="ml-2 text-xs text-red-500">
                    (No disponible)
                  </span>
                )}
              </h3>
              <p className="text-2xl font-bold">
                {stat.requiresEnabled && isDisabled ? "-" : stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {!isDisabled ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Próximas Citas</h2>
              <Stethoscope className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-slate-400 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Syringe className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.petName}</p>
                      <p className="text-sm text-gray-700">
                        {appointment.service}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.time}</p>
                    <p className="text-sm text-gray-700">
                      {appointment.doctor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/login/dashboard/turnos">
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  Ver todos los turnos
                </button>
              </Link>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Resumen de Actividad</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Citas Completadas</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ocupación de Turnos</span>
                  <span className="font-medium">72%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Satisfacción de Clientes
                  </span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="text-center p-6 bg-yellow-50 rounded-lg">
          <p className="text-yellow-800">
            Las funcionalidades de citas y calendario estarán disponibles una
            vez que tu cuenta sea activada.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
