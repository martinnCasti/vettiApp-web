"use client";
import React, { useEffect, useState } from "react";
import { userApi } from "@/src/userApi";
import { useRouter } from "next/navigation";

const EditProfile = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    cuit: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Intentar obtener datos del localStorage primero
        const localData = {
          name: localStorage.getItem("userName") || "",
          email: "",
          phoneNumber: localStorage.getItem("phoneNumber") || "",
          address: localStorage.getItem("address") || "",
          cuit: localStorage.getItem("cuit") || "",
        };

        setFormData(localData);

        // Intentar obtener datos actualizados del servidor
        const userData = await userApi.getCurrentUser();
        if (userData) {
          setFormData({
            name: userData.name || localData.name,
            email: userData.email || localData.email,
            phoneNumber: userData.phoneNumber || localData.phoneNumber,
            address: userData.address || localData.address,
            cuit: userData.cuit || localData.cuit,
          });
        }
      } catch (err) {
        console.error(err);
        // No establecemos error aquí ya que tenemos los datos del localStorage
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await userApi.updateVet(Number(params.id), formData);

      // Actualizar localStorage manualmente
      localStorage.setItem("userName", formData.name);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("phoneNumber", formData.phoneNumber);
      localStorage.setItem("address", formData.address);
      localStorage.setItem("cuit", formData.cuit);

      setSuccessMessage("Datos actualizados correctamente");

      // Esperar un momento antes de redirigir
      setTimeout(() => {
        router.push("/login/dashboard/userConfig");
      }, 1500);
    } catch (err) {
      setError("Error al actualizar los datos. Por favor, intente nuevamente.");
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nombre Veterinaria
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre de la veterinaria"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingrese su email"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Ingrese su teléfono"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Ingrese su dirección"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">CUIT</label>
            <input
              type="text"
              name="cuit"
              value={formData.cuit}
              onChange={handleChange}
              placeholder="Ingrese su CUIT"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
