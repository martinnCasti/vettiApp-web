"use client";
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
          {/* Header Skeleton */}
          <div className="bg-gray-100 p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-4 space-y-4">
            {/* Time */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>

            {/* Name */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>

            {/* Status */}
            <div className="mt-2">
              <div className="h-6 bg-gray-200 rounded-full w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Turnos = () => {
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
          setError("Error al cargar los turnos");
        }
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <div
            key={appointment.createdAt}
            className="rounded-lg bg-white shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-50 p-4">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                {formatDate(appointment.startTime)}
              </div>
            </div>

            {/* Content */}
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
                <span className="font-medium">
                  {appointment.invitees[0]?.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {appointment.invitees[0]?.email}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {appointment.location}
                </span>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Turnos;
