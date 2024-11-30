"use client";

import React, { useState } from "react";
import { Clock, Calendar, X, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import scheduleApi from "@/src/services/scheduleApi";

interface TimeSlot {
  from: string;
  to: string;
}

const ServiceForm = () => {
  const router = useRouter();
  const [serviceName, setServiceName] = useState("");
  const [scheduleData, setScheduleData] = useState<Record<string, TimeSlot[]>>({
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
    domingo: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const addTimeSlot = (day: string) => {
    setScheduleData((prev) => ({
      ...prev,
      [day]: [...prev[day], { from: "", to: "" }],
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    setScheduleData((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const updateTimeSlot = (
    day: string,
    index: number,
    field: "from" | "to",
    value: string
  ) => {
    setScheduleData((prev) => ({
      ...prev,
      [day]: prev[day].map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      ),
    }));
  };

  const formatDataForApi = () => {
    const vetEmail = localStorage.getItem("userEmail");
    const vetName = localStorage.getItem("userName");

    const days = Object.entries(scheduleData)
      .filter(([_, timeSlots]) => timeSlots.length > 0)
      .map(([day, timeSlots]) => ({
        day,
        timeSlots: timeSlots.filter((slot) => slot.from && slot.to),
      }));

    return {
      vetEmail,
      vetName,
      service: serviceName,
      days,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formattedData = formatDataForApi();
      await scheduleApi.createSchedule(formattedData);

      alert("Servicio agregado exitosamente");
      router.push("/login/dashboard/servicios");
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Sesión expirada. Por favor, vuelve a iniciar sesión.");
        router.push("/login");
      } else {
        alert("Error al guardar el servicio. Por favor, intenta nuevamente.");
      }
      console.error("Error al guardar el servicio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/login/dashboard/servicios");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Agregar Servicio
            </h2>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-2">
              Nombre del Servicio
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md"
              placeholder="Ej: Consulta General"
              required
            />
          </div>

          <div className="space-y-3">
            {Object.entries(scheduleData).map(([day, timeSlots]) => (
              <div key={day} className="border border-gray-100 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium capitalize flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {day}
                  </h3>
                  <button
                    type="button"
                    onClick={() => addTimeSlot(day)}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs"
                  >
                    <Plus className="w-3 h-3" />
                    Agregar Horario
                  </button>
                </div>

                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center gap-3 mt-2">
                    <div className="flex-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div className="flex items-center gap-2">
                        <select
                          value={slot.from}
                          onChange={(e) =>
                            updateTimeSlot(day, index, "from", e.target.value)
                          }
                          className="p-1 border border-gray-200 rounded text-sm w-32"
                          required
                        >
                          <option value="">Selecionar</option>
                          {timeOptions.map((time) => (
                            <option key={`from-${time}`} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <span className="text-gray-400 text-sm">a</span>
                        <select
                          value={slot.to}
                          onChange={(e) =>
                            updateTimeSlot(day, index, "to", e.target.value)
                          }
                          className="p-1 border border-gray-200 rounded text-sm w-32"
                          required
                        >
                          <option value="">Selecionar</option>
                          {timeOptions.map((time) => (
                            <option key={`to-${time}`} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(day, index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Guardando..." : "Guardar Servicio"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
