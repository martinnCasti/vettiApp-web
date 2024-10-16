import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-20">
      <div className="container mx-auto text-center">
        <p className="mb-2">© 2024 VettiApp. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            Términos de servicio
          </a>
          <a href="#" className="hover:underline">
            Política de privacidad
          </a>
          <a href="#" className="hover:underline">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
