"use client";

import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { userApi } from "@/src/userApi"; // Ajusta la ruta según tu estructura
import { Vet } from "@/src/userApi";

const CalendlyWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVetData = async () => {
      try {
        // Obtener el ID del veterinario desde localStorage
        const userData = userApi.getUserData();
        const vetId = userData.id;

        if (!vetId) {
          setError("No se encontró ID del veterinario");
          setIsLoading(false);
          return;
        }

        const vetData = await userApi.getVetById(Number(vetId));

        if (vetData.calendlyCalendar) {
          setCalendlyUrl(vetData.calendlyCalendar);
        } else {
          setError("Este veterinario no tiene un calendario configurado");
        }
      } catch (error) {
        console.error("Error al obtener datos del veterinario:", error);
        setError("Error al cargar el calendario");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVetData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-center items-center h-[700px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !calendlyUrl) {
    return (
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-center items-center h-[700px]">
          <p className="text-gray-500">
            {error || "No se encontró el calendario del veterinario"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <InlineWidget
        url={calendlyUrl}
        styles={{
          height: "700px",
          width: "100%",
        }}
        prefill={{}}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "00a2ff",
          textColor: "4d5055",
        }}
      />
    </div>
  );
};

export default CalendlyWidget;
