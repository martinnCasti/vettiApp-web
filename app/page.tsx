import Button from "@/components/Button";
import React from "react";

export const metadata = {
  title: "VettiApp - Home",
  description: "VettiApp tu gestion de turnos preferida",
};

const Home = () => {
  return (
    <section className="max-container padding-container gap-20 py-10 pb-32 md:gap-28 lg:p-40">
      <div className="main-container text-wrap">
        <h1 className="bold-20 align text-center lg:bold-40">
          VettiApp - Gestiona tu clinica facilmente
        </h1>
        <p className="text-center py-10 px-4 md:px-20 regular-20">
          Tu aplicación de gestión de turnos, diseñada para que los clientes que
          necesiten un veterinario especifico
        </p>
      </div>
      <div className="flex flex-col items-center w-full gap-3 sm:flex-row sm:justify-center px-4">
        <Button type="button" title="Descargar App" variant="btn_blue" />
      </div>
    </section>
  );
};

export default Home;
