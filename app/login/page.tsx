"use client";
import { useState } from "react";
import api from "@/src/api";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import Link from "next/link";

interface SignInRequestBody {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  message: string;
  statusCode: number;
  role: string;
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  cuit: string;
  address: string;
  status: string;
}

const SignIn = () => {
  const [form, setForm] = useState<SignInRequestBody>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post<LoginResponse>("/vet/login", form);
      console.log("User signed in successfully:", response.data);

      // Guardar tokens
      const { access_token, refresh_token } = response.data;
      cookie.set("access_token", access_token);
      cookie.set("refresh_token", refresh_token);

      // Guardar datos del usuario en localStorage
      localStorage.setItem("userEmail", form.email);

      // Guardar datos adicionales de la respuesta
      localStorage.setItem("vetId", response.data.id.toString());
      localStorage.setItem("vetEmail", response.data.email);
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("vetCuit", response.data.cuit);
      localStorage.setItem("vetAddress", response.data.address);
      localStorage.setItem("vetPhone", response.data.phoneNumber);

      if (response.data.status) {
        localStorage.setItem("userStatus", response.data.status);
      }

      setSuccess(true);
      router.push("/login/dashboard");
    } catch (err: any) {
      console.error(
        "Error signing in:",
        err.response ? err.response.data : err.message
      );
      setError(
        err.response?.data?.message ||
          "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Iniciar Sesión
        </h1>
        {error && (
          <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-lg text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="text-black mb-4 p-3 bg-green-400 rounded-lg text-center">
            ¡Inicio de sesión exitoso!
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ingresa tu email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Iniciar Sesión
          </button>
          <div className="mt-4 text-center">
            <Link
              href="/login/forgot-password"
              className="text-blue-500 hover:text-blue-600 text-sm font-medium transition duration-200"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
