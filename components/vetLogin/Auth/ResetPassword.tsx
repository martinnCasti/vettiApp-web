"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/src/services/userServices";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await resetPassword(formData);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(
        "Ocurrió un error al resetear la contraseña. Por favor verifica el código e intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-medium text-gray-800 mb-6 text-center">
          Resetear Contraseña
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">
              Código de Verificación
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, code: e.target.value }))
              }
              placeholder="Ingresa el código recibido"
              className="px-4 py-3 border border-gray-200 rounded-lg"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">
              Nueva Contraseña
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              placeholder="Ingresa tu nueva contraseña"
              className="px-4 py-3 border border-gray-200 rounded-lg"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 text-sm bg-green-50 p-3 rounded-lg">
              ¡Contraseña actualizada exitosamente! Redirigiendo...
            </div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="bg-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Resetear Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
