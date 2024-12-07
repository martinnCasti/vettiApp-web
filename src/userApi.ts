import api from "./api";

// Interfaces que coinciden con tu API
export interface Vet {
  calendlyCalendar: string;
  id: number;
  statusCode: number;
  message: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  cuit: string;
  address: string;
  district: string;
  status: string;
  payment: string;
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

const storage = {
  updateUserData: (user: Partial<Vet>) => {
    // Actualiza solo los campos que vienen en el objeto user
    if (user.id) localStorage.setItem("vetId", user.id.toString());
    if (user.email) localStorage.setItem("userEmail", user.email);
    if (user.name) localStorage.setItem("userName", user.name);
    if (user.role) localStorage.setItem("userRole", user.role);
    if (user.cuit) localStorage.setItem("cuit", user.cuit);
    if (user.address) localStorage.setItem("address", user.address);
    if (user.district) localStorage.setItem("district", user.district);
    if (user.status) localStorage.setItem("stattus", user.status);
    if (user.payment) localStorage.setItem("payment", user.payment);
  },

  clearUserData: () => {
    localStorage.removeItem("vetId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("cuit");
    localStorage.removeItem("address");
    localStorage.removeItem("district");
    localStorage.removeItem("status");
    localStorage.removeItem("payment");
  },
};

export const userApi = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/vet/login", credentials);

      if (response.data.user) {
        storage.updateUserData(response.data.user);
      }

      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  // Obtener usuario por email
  getVetById: async (id: number): Promise<Vet> => {
    try {
      console.log("Solicitando usuario con el id:", id);
      const response = await api.get(`/vet/searchVetById/${id}`);
      console.log("Respuesta de la API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en getVetById:", error);
      throw error;
    }
  },

  // Obtener usuario actual
  getCurrentUser: async (): Promise<Vet | null> => {
    try {
      const email = localStorage.getItem("userEmail");
      // Agregamos validación para el ID
      const id = localStorage.getItem("vetId");

      if (!email || !id) return null;

      // Cambiamos para usar el ID en lugar del email
      const response = await api.get(`/vet/searchVetById/${id}`);

      if (response.data) {
        storage.updateUserData(response.data);
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
      storage.clearUserData();
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },

  // Actualizar usuario
  updateVet: async (userId: number, userData: Partial<Vet>) => {
    try {
      const response = await api.patch(`/vet/updateVet/${userId}`, userData);

      // Actualizar localStorage con los nuevos datos
      if (response.data && response.data.statusCode === 200) {
        storage.updateUserData(response.data);

        // Forzar actualización de datos completos
        await userApi.getCurrentUser();
      }

      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Obtener datos del usuario del localStorage
  getUserData: () => {
    return {
      id: localStorage.getItem("vetId"),
      email: localStorage.getItem("userEmail"),
      name: localStorage.getItem("userName"),
      lastName: localStorage.getItem("userLastName"),
      role: localStorage.getItem("userRole"),
      cuit: localStorage.getItem("cuit"),
      address: localStorage.getItem("address"),
      district: localStorage.getItem("district"),
    };
  },
};

export default userApi;
