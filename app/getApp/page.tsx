import React from "react";
import Button from "../../components/Button";

export const metadata = {
  title: "Vetti - Descarga la App",
  description: "Vetti, tu gestion de turnos preferida",
};
const GetApp: React.FC = () => {
  return (
    <div className="m-10">
      <div className="container mx-auto flex flex-col items-center text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Obtén nuestra App!
        </h2>
        <p className="text-gray-600 mb-6">
          Disfruta de todas nuestras características y servicios en tu
          dispositivo móvil. Exclusivo para clientes finales.
        </p>
        <Button
          type="button"
          title="Descargar App"
          variant="btn_blue"
          href="https://expo.dev/accounts/pmenendezp/projects/vetti/builds/e756815c-4306-48a9-a066-bccf4ac1cd3e"
        />
      </div>
    </div>
  );
};

export default GetApp;
