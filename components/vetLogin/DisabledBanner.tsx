// components/vetLogin/Banner.tsx
const DisabledBanner = () => {
  return (
    <div className="px-6 py-4 bg-gray-100">
      <div className="bg-yellow-100 py-2 px-4 rounded-lg border border-yellow-400">
        <p className="text-center text-gray-800">
          Tu cuenta está pendiente de activación. Esto podría tardar unas 24hs
          aproximadamente. Una vez activada la cuenta debera cerrar sesion e
          iniciar sesion de nuevo.
        </p>
        <p className="text-center text-gray-800">
          Mientras tanto, podra cargar los Servicios que va a brindar en la
          pestaña de Servicios.
        </p>
      </div>
    </div>
  );
};

export default DisabledBanner;
