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
          Registro de Veterinaria
        </h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  ¡Registro exitoso! Redirigiendo...
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Los inputs permanecen iguales, solo agregamos disabled={isLoading} */}
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
              disabled={isLoading}
              placeholder="Ingrese el nombre de la veterinaria"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          {/* Repetir el patrón para los demás inputs... */}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-2 px-4 rounded-lg ${
              isLoading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            } text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
