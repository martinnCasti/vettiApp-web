"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/api";
import Link from "next/link";
import { DISTRICTS } from "@/constants/index";

interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  district: string;
  cuit: string;
  role: string;
  isEmergencyVet: boolean;
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
    isEmergencyVet: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    let finalValue: string | boolean = value;

    if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (name === "cuit" || name === "phoneNumber") {
      finalValue = value.trim();
    } else if (name === "email") {
      finalValue = value.trim();
    }

    setForm({
      ...form,
      [name]: finalValue,
    });
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

    const cuitRegex = /^\d{8,10}$/;
    if (!cuitRegex.test(form.cuit))
      return "CUIT inválido (debe tener 10 dígitos)";

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
      setTimeout(() => {
        router.push("/login");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg my-8">
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
              className="block font-medium text-base text-gray-700 mb-2"
              htmlFor="district"
            >
              Distrito
            </label>
            <select
              name="district"
              value={form.district}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base font-normal"
            >
              <option value="">Seleccione un distrito</option>
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ¿Tiene Guardia?
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={form.isEmergencyVet}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    isEmergencyVet: !prev.isEmergencyVet,
                  }))
                }
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                  ${form.isEmergencyVet ? "bg-indigo-500" : "bg-gray-200"}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition
                    ${form.isEmergencyVet ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </button>
              <span className="text-sm text-gray-700">
                {form.isEmergencyVet ? "Sí" : "No"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          Ya tenés cuenta?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Iniciá sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
