import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, Mail, MapPin } from "lucide-react";
import { scheduleApi, Appointment } from "@/src/services/scheduleApi";

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="rounded-lg bg-white shadow-lg overflow-hidden animate-pulse"
        >
          <div className="bg-gray-100 p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>

            <div className="mt-2">
              <div className="h-6 bg-gray-200 rounded-full w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const AppointmentCard = ({
  appointment,
  onCancelSuccess,
}: {
  appointment: Appointment;
  onCancelSuccess: (id: string) => void;
}) => {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelAppointment = async () => {
    const isConfirmed = window.confirm(
      "¿Estás seguro que deseas cancelar este turno? Esta acción no se puede deshacer."
    );

    if (!isConfirmed) return;

    try {
      setIsCancelling(true);
      await scheduleApi.cancelAppointment(appointment.eventId);
      onCancelSuccess(appointment.eventId);
      alert("Turno cancelado exitosamente");
    } catch (err) {
      alert("No se pudo cancelar el turno. Por favor, intente nuevamente.");
    } finally {
      setIsCancelling(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="bg-blue-50 p-4">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Calendar className="h-5 w-5 text-blue-600" />
          {formatDate(appointment.startTime)}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span>
            {formatTime(appointment.startTime)} -{" "}
            {formatTime(appointment.endTime)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-gray-500" />
          <span className="font-medium">{appointment.invitees[0]?.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">
            {appointment.invitees[0]?.email}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">{appointment.location}</span>
        </div>

        <div className="mt-2">
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Veterinaria:</span>{" "}
            {appointment.vetName}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Servicio:</span>{" "}
            {appointment.eventName}
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            {appointment.status}
          </span>
        </div>

        <button
          onClick={handleCancelAppointment}
          disabled={isCancelling}
          className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isCancelling ? "Cancelando..." : "Cancelar Turno"}
        </button>
      </div>
    </div>
  );
};
const TurnosComponent = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await scheduleApi.getAppointments();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        if (
          err instanceof Error &&
          err.message === "No se encontró el email del usuario"
        ) {
          setError("Por favor, inicie sesión para ver sus turnos");
        } else {
          setError("No existen turnos agendados.");
        }
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelSuccess = (appointmentId: string) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((apt) => apt.eventId !== appointmentId)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mb-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-48" />
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Turnos Programados</h1>
        <p className="text-gray-600">{localStorage.getItem("userEmail")}</p>
      </div>

      {appointments.length === 0 ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-lg font-medium text-gray-600">
            No hay turnos agendados
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.eventId}
              appointment={appointment}
              onCancelSuccess={handleCancelSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TurnosComponent;
