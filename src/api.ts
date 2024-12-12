import axios from "axios";
import { fetchNewAccessToken } from "./auth"; // Función que obtiene el token

const api = axios.create({
  baseURL: "https://vetti-app.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "*",
  },
  withCredentials: false,
});

api.interceptors.request.use(
  async (config) => {
    let token = "";

    // Verifica si ya tienes el token almacenado
    token = await fetchNewAccessToken(); // Obtenemos el token usando la función que hayas definido

    if (token) {
      config.headers.Authorization = `${token}`;
    } else {
      console.error("El token no está disponible");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
