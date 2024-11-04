import api from "./api";

// Interfaces que coinciden con tu API
export interface Vet {
  id: number;
  statusCode: number;
  message: string;
  email: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  cuit: string;
  address: string;
  district: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: Vet;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const userApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/vet/login", credentials);

      // Guardar datos del usuario en localStorage
      if (response.data.user) {
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem("cuit", response.data.user.lastName);
        localStorage.setItem("userRole", response.data.user.role);
      }

      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  // Obtener usuario por email
  getVetByEmail: async (email: string): Promise<Vet> => {
    try {
      console.log("Solicitando usuario con email:", email);
      const response = await api.get(`/vet/searchVet/${email}`);
      console.log("Respuesta de la API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en getVetByEmail:", error);
      throw error;
    }
  },

  // Obtener usuario actual
  getCurrentUser: async (): Promise<Vet | null> => {
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) return null;

      const response = await api.get(`/vet/searchVet/${email}`);

      // Si la petición es exitosa, actualizar el localStorage con los datos más recientes
      if (response.data && response.data.statusCode === 200) {
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("userLastName", response.data.lastName);
        localStorage.setItem("userRole", response.data.role);
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await api.post("/auth/logout");
      // Limpiar localStorage
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      localStorage.removeItem("userLastName");
      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },

  // Registro de usuario
  register: async (
    userData: Omit<Vet, "id" | "statusCode" | "message" | "pets">
  ) => {
    try {
      const response = await api.post("/vet/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (userId: number, userData: Partial<Vet>) => {
    try {
      const response = await api.put(`/vet/updateUser/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
};

export default userApi;
