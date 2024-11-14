"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/api";

interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  district: string;
  cuit: string;
  role: string;
}

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<CreateUserRequestBody>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    district: "",
    cuit: "",
    role: "2",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trim() });
  };

  const validateForm = () => {
    if (!form.name) return "El nombre es requerido";
    if (!form.email) return "El email es requerido";
    if (!form.password) return "La contraseña es requerida";
    if (!form.cuit) return "El CUIT es requerido";
    if (!form.phoneNumber) return "El número de teléfono es requerido";
    if (!form.address) return "La dirección es requerida";
    if (!form.district) return "El distrito es requerido";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Email inválido";

    const cuitRegex = /^\d{11}$/;
    if (!cuitRegex.test(form.cuit))
      return "CUIT inválido (debe tener 11 dígitos)";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/vet/register", form);
      console.log("Usuario registrado exitosamente:", response.data);
      setSuccess(true);

      // Esperar un momento antes de redirigir
      setTimeout(() => {
        router.push("/dashboard"); // O la ruta que corresponda a tu dashboard
      }, 1500);
    } catch (err: any) {
      console.error(
        "Error al registrar usuario:",
        err.response ? err.response.data : err.message
      );
      setError(err.response?.data?.message || "Error al registrar el usuario.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Registrarse
        </h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && (
          <div className="text-green-600 mb-4">
            Usuario registrado correctamente!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre nombre de la veterinaria"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cuit"
            >
              CUIT
            </label>
            <input
              type="text"
              name="cuit"
              value={form.cuit}
              onChange={handleChange}
              placeholder="Ingrese su CUIT"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Direccion
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Ingrese la direccion"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Numero de Telefono
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="1212121212"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Mail
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ingrese su mail"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="district"
            >
              Distrito
            </label>
            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="Ingrese su distrito"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
