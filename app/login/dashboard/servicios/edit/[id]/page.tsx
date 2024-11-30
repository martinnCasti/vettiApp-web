"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditProfileForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clinicName: "",
    email: "",
    phone: "",
    address: "",
    cuit: "",
  });

  // Resetear el formulario cuando el componente se monta
  useEffect(() => {
    setFormData({
      clinicName: "",
      email: "",
      phone: "",
      address: "",
      cuit: "",
    });
  }, []); // La dependencia vacía asegura que solo se ejecute al montar el componente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aquí iría la lógica para guardar los cambios
      console.log("Datos a guardar:", formData);

      // Resetear el formulario después de enviar
      setFormData({
        clinicName: "",
        email: "",
        phone: "",
        address: "",
        cuit: "",
      });

      router.push("/dashboard"); // O la ruta que corresponda después de guardar
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleCancel = () => {
    // Resetear el formulario antes de volver
    setFormData({
      clinicName: "",
      email: "",
      phone: "",
      address: "",
      cuit: "",
    });
    router.back();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Editar Perfil</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        key="edit-profile-form"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Veterinaria
          </label>
          <input
            type="text"
            name="clinicName"
            value={formData.clinicName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CUIT
          </label>
          <input
            type="text"
            name="cuit"
            value={formData.cuit}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            autoComplete="off"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
