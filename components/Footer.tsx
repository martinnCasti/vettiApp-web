const Footer = () => {
  return (
    <footer className="mt-auto bottom-0 left-0 w-full bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center mt-5">
        <p className="mb-5">© 2024 VettiApp. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-5 mb-10">
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
