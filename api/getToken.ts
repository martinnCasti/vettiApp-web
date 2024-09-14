import axios from "axios";

// Definir la URL del token (la misma que aparece en la imagen)
const tokenUrl = "https://dev-k1n7shfb1jvuxkvz.us.auth0.com/oauth/token";

// Definir los parámetros necesarios en el body de la solicitud
const tokenRequestData = {
  grant_type: "client_credentials",
  client_id: "Dgd31Xpn0ppSkXsDV3hWLGWlBoS96Mnr", // Reemplaza por tu client_id
  client_secret:
    "cpKh3VKN_-trH6OCOUgWMYkQHBu9_C5ywqByFefrdCZjMGFfK8IdxB9gMW63tYS7", // Reemplaza por tu client_secret
  audience: "https://dev-k1n7shfb1jvuxkvz.us.auth0.com/api/v2/", // Reemplaza por tu audiencia
};

// Hacer la solicitud POST para obtener el token
export const fetchToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams(tokenRequestData),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const token = response.data.access_token;

    if (!token) {
      console.error("No se encontró el access_token en la respuesta.");
      return null;
    }

    console.log("Token obtenido en getToken:", token); // Verifica que el token se imprime aquí
    return token;
  } catch (error) {
    console.error("Error obteniendo el token", error);
    return null;
  }
};
