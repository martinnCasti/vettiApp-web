"use client";

import { apiUrl, setAuthToken } from "@/api/api";
import { useState } from "react";
// Import axios instance and token handling

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await apiUrl.post("/user/login", form); // Sign In endpoint
      const token = response.data.token; // Assuming the token comes in the response
      localStorage.setItem("token", token); // Store the token in localStorage
      setAuthToken(token); // Set token in Authorization header for future requests

      setSuccess(true);
    } catch (err) {
      console.error("Error signing in:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Iniciar Sesion
        </h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">Sesion iniciada!</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Usuario
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ingrese su usuario o email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
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

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Iniciar sesion
          </button>
          {error && <p>{error}</p>}
          {success && <p>Usuario Logueado!</p>}
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            No tenes cuenta?{" "}
            <a href="/signup" className="text-indigo-500 hover:text-indigo-600">
              Registrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
