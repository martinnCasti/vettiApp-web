import axios from "axios";

// Función para obtener el token
export const fetchNewAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://vetti-app.onrender.com/getToken",
      {},
      {
        headers: {
          Authorization: "2c98a622-b0e2-4b24-8deb-e3a3f4b54b7e",
        },
      }
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error("Error al obtener el token de acceso:", error);
    throw error;
  }
};
