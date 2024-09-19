import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
} from "axios";
import cookie from "js-cookie";

const BASE_URL = "https://vetti-app.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor to add token to every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = cookie.get("access_token");

    // Ensure headers exist using AxiosHeaders
    if (token) {
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        config.headers = new AxiosHeaders({
          Authorization: `Bearer ${token}`,
        });
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define the structure expected when refreshing the token
interface RefreshTokenResponse {
  access_token: string;
}

// Function to refresh the token if it has expired
const refreshToken = async (): Promise<string> => {
  const refresh_token = cookie.get("refresh_token");

  if (refresh_token) {
    const response = await axios.post<RefreshTokenResponse>(
      `${BASE_URL}/oauth/token`,
      {
        grant_type: "client_credentials",
        client_id: "Dgd31Xpn0ppSkXsDV3hWLGWlBoS96Mnr",
        client_secret:
          "cpKh3VKN_-trH6OCOUgWMYkQHBu9_C5ywqByFefrdCZjMGFfK8IdxB9gMW63tYS7",
        audience: "https://dev-k1n7shfb1jvuxkvz.us.auth0.com/api/v2/",
        refresh_token,
      }
    );

    const { access_token } = response.data;
    cookie.set("access_token", access_token);

    return access_token;
  }

  throw new Error("No refresh token available");
};

// Interceptor to handle token expiration
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;

    // Check if the token has expired and try to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
