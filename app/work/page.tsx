import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Vetti - Servicios",
  description: "Vetti, tu gestion de turnos preferida",
};

const Services = () => {
  return (
    <section className="max-container padding-container mt-10 lg:flex flex-row size-full">
      <div className="flex justify-center size-full mb-10">
        <Image src="/cards.png" alt="dog&cat" width={600} height={600} />
      </div>
      <div className="p-5 m-10 regular-14 sm:regular-20">
        <div>
          <h1 className="bold-16 sm:bold-20">
            Búsqueda por especialidad Médicos Veterinarios
          </h1>
          <p>
            Permite a los usuarios encontrar fácilmente veterinarios
            especializados según sus necesidades.
          </p>
        </div>
        <div className="py-2">
          <h1 className="bold-16 sm:bold-20">Agenda de Turnos</h1>
          <p>
            Los usuarios pueden ver y seleccionar los horarios disponibles para
            agendar citas, facilitando la organización de sus visitas a la
            clínica.
          </p>
        </div>
        <div className="py-2">
          <h1 className="bold-16 sm:bold-20">Información de Clínicas</h1>
          <p>
            Ofrece detalles sobre las clínicas veterinarias, incluyendo
            direcciones, horarios de atención y contacto, para que los usuarios
            puedan elegir la mejor opción.
          </p>
        </div>
        <div className="py-2">
          <h1 className="bold-16 sm:bold-20">
            Informacion sobre especialidad de veterinarios
          </h1>
          <p>
            Buscas una especialidad en especial? Con Vetti vas a saber donde se
            encuentran los veterinarios de un tipo de especialidad en concreto
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
