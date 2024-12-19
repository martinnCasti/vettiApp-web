import Button from "@/components/Button";
import React from "react";

export const metadata = {
  title: "Vetti - Home",
  description: "Vetti, tu gestion de turnos preferida",
};

const Home = () => {
  return (
    <section className="max-container padding-container gap-20 py-10 pb-32 md:gap-28 lg:p-40">
      <div className="main-container text-wrap">
        <h1 className="bold-20 align text-center lg:bold-40 py-10">Vetti</h1>
        <h3 className="bold-20 align text-center lg:bold-30">
          ¿Tenes mascotas? Gestiona tus turnos veterinarios facilmente.
        </h3>
        <p className="text-center py-10 px-4 md:px-20 regular-20">
          Amantes de mascotas que cuidan su salud, felicidad y bienestar.
        </p>
      </div>
      <div className="flex flex-col items-center w-full gap-3 sm:flex-row sm:justify-center px-4">
        <Button
          type="button"
          title="Descargar App"
          variant="btn_blue"
          href="https://expo.dev/accounts/pmenendezp/projects/vetti/builds/e756815c-4306-48a9-a066-bccf4ac1cd3e"
        />
      </div>
    </section>
  );
};

export default Home;
