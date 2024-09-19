import axios from "axios";
import cookie from "js-cookie"; // Para manejar cookies en el lado del cliente

const TOKENURL = "https://dev-k1n7shfb1jvuxkvz.us.auth0.com/oauth/token";

// Definir la estructura esperada de la respuesta
interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export const getToken = async (): Promise<string> => {
  try {
    const response = await axios.post<TokenResponse>(TOKENURL, {
      grant_type: "client_credentials",
      client_id: "Dgd31Xpn0ppSkXsDV3hWLGWlBoS96Mnr",
      client_secret:
        "cpKh3VKN-trH6OCOUgWMYkQHBu9_C5ywqByFefrdCZjMGFfK8IdxB9gMW63tYS7",
      audience: "https://dev-k1n7shfb1jvuxkvz.us.auth0.com/api/v2/",
    });

    const { access_token, refresh_token } = response.data;

    // Guardar el token en cookies
    cookie.set("access_token", access_token);
    cookie.set("refresh_token", refresh_token);

    return access_token;
  } catch (error: any) {
    console.error("Error obtaining token:", error);
    throw error;
  }
};
