"use client";
import React, { useState } from "react";
import CalendlyWidget from "@/components/vetLogin/CalendlyWidget";
import { Plus } from "lucide-react";

export default function CitasPage() {
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end px-4 pt-4">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Agendar turno nuevo</span>
        </button>
      </div>
      <CalendlyWidget key={key} />
    </div>
  );
}
