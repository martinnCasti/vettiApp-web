import Button from "@/components/Button";
import React from "react";

const Home = () => {
  return (
    <section className="max-container padding-container gap-20 py-10 pb-32 md:gap-28 lg:p-40 ">
      <div className="main-container text-wrap ">
        <h1 className="bold-20 align aling-center lg:bold-40 text-center">
          VettiApp - Lorem ipsum dolor
        </h1>
        <p className="text-center py-10 px-20 regular-20">
          Tu aplicación de gestión de turnos, diseñada para que los clientes que
          necesiten un veterinario especifico
        </p>
      </div>
      <div className="flex flex-col w-full ml-5 py-5 gap-3 sm:flex-row">
        <Button type="button" title="Descargar App" variant="btn_blue" />
        <Button
          type="button"
          title="Que es VettiApp?"
          icon="/play.png"
          variant="btn_bluegray"
        />
      </div>
    </section>
  );
};

export default Home;
