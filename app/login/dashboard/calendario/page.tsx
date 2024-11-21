// app/citas/page.tsx
import React from "react";
import CalendlyWidget from "@/components/vetLogin/CalendlyWidget";

export const metadata = {
  title: "Agenda tu cita",
  description: "Programa una cita con nosotros",
};

export default function CitasPage() {
  return <CalendlyWidget />;
}
