import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-400 text-white flex flex-col">
      <div className="py-4 px-6 text-xl font-bold">VettiApp</div>
      <nav className="flex-1 px-4">
        <ul>
          <li className="py-2 px-4">
            <a href="/login/dashboard">Inicio</a>
          </li>
          <li className="py-2 px-4">
            <a href="/login/dashboard/mascota">Mis mascotas</a>
          </li>
          <li className="py-2 px-4">
            <a href="/login/dashboard/turnos">Turnos</a>
          </li>
          <li className="py-2 px-4">
            <a href="/login/dashboard/vets">Veterinarios</a>
          </li>
          <li className="py-2 px-4">
            <a href="/login/dashboard/citas">Citas y Recordatorios</a>
          </li>
          <li className="py-2 px-4">
            <a href="/login/dashboard/calendario">Calendario</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
