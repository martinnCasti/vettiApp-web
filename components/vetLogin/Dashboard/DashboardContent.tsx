"use client";
import { Users, Calendar, Activity, Syringe, Stethoscope } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getVetEvents,
  getPendingAppointments,
  getCompletedAppointments,
  filterTodayAppointments,
  type CalendlyEventCount,
} from "@/src/services/userServices";
import { type Appointment } from "@/src/services/scheduleApi";

interface DashboardContentProps {
  isDisabled: boolean;
  isPaymentPending: boolean;
}

interface StatItem {
  title: string;
  value: string;
  icon: JSX.Element;
  description: string;
  hideChange?: boolean;
  showLink?: boolean;
  requiresEnabled?: boolean;
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

const DashboardContent: React.FC<DashboardContentProps> = ({ isDisabled }) => {
  const [eventsData, setEventsData] = useState<CalendlyEventCount | null>(null);
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>(
    []
  );
  const [completedAppointments, setCompletedAppointments] = useState<
    Appointment[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const results = await Promise.all([
          getVetEvents(),
          getPendingAppointments(),
          getCompletedAppointments(),
        ] as const);

        const [eventsResult, pendingResult, completedResult] = results;

        setEventsData(eventsResult);
        setPendingAppointments(pendingResult);
        setCompletedAppointments(completedResult);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar datos");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const stats: StatItem[] = [
    {
      title: "Tipo de Servicios",
      value: eventsData ? String(eventsData.totalEvents) : "-",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      description: isLoading
        ? "Cargando..."
        : error
        ? "Error al cargar servicios"
        : `${eventsData?.events.map((e) => e.eventName).join(", ")}`,
      hideChange: true,
      showLink: true,
    },
    {
      title: "Turnos Agendados",
      value: isLoading ? "..." : String(pendingAppointments.length),
      icon: <Calendar className="w-8 h-8 text-green-500" />,
      description: "Turnos pendientes",
      requiresEnabled: true,
    },
    {
      title: "Atenciones del Día",
      value: isLoading
        ? "..."
        : String(filterTodayAppointments(completedAppointments).length),
      icon: <Activity className="w-8 h-8 text-orange-500" />,
      description: "Completados",
      requiresEnabled: true,
    },
  ];

  const todayAppointments = filterTodayAppointments(pendingAppointments);

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
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
              </div>
              <div className="space-y-2">
                {" "}
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
                <p className="text-xs text-gray-500 mb-8">{stat.description}</p>{" "}
                {index === 0 && (
                  <Link
                    href="/login/dashboard/servicios"
                    className="block mt-auto"
                  >
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                      Ver servicios
                    </button>
                  </Link>
                )}
                {index === 1 && (
                  <Link
                    href="/login/dashboard/turnos"
                    className="block mt-auto"
                  >
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                      Ver turnos
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!isDisabled ? (
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-6">
            {" "}
            {/* Aumentado el padding */}
            <div className="flex items-center justify-between mb-6">
              {" "}
              {/* Aumentado el margin bottom */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Próximos Turnos
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Turnos agendados para hoy
                </p>
              </div>
              <Stethoscope className="w-6 h-6 text-blue-500" />{" "}
              {/* Cambiado el color y tamaño */}
            </div>
            <div className="space-y-4">
              {" "}
              {/* Aumentado el espacio entre items */}
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <p className="text-gray-500">Cargando turnos...</p>
                </div>
              ) : error ? (
                <div className="flex justify-center py-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : todayAppointments.length > 0 ? (
                todayAppointments.map((appointment) => (
                  <div
                    key={appointment.eventId}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                        <Syringe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {appointment.invitees[0]?.name || "Sin nombre"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.eventName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">
                        {new Date(appointment.startTime).toLocaleTimeString(
                          "es-ES",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.vetName}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-600 font-medium">
                    No hay turnos pendientes para hoy
                  </p>
                  <p className="text-sm text-gray-500">
                    Agenda un nuevo turno para comenzar
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6">
              {" "}
              {/* Aumentado el margin top */}
              <Link href="/login/dashboard/calendario">
                <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-200 font-medium">
                  Agendar turno nuevo
                </button>
              </Link>
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
