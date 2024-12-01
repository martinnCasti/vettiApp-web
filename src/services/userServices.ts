import api from "../api";

export interface User {
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  address?: string;
  district?: string;
  cuit?: string;
  status?: string;
  payment?: string;
  isEmergencyVet?: boolean;
}

export const getCurrentUser = async (): Promise<User> => {
  try {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      throw new Error("No user email found");
    }

    const response = await api.get("/user/searchUserByEmail", {
      params: {
        email: userEmail,
      },
    });

    // Asegúrate de que los datos coincidan con la interfaz User
    const userData: User = {
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
      phoneNumber: response.data.phoneNumber,
      address: response.data.address,
      district: response.data.district,
      cuit: response.data.cuit,
      status: response.data.status,
      payment: response.data.payment,
      isEmergencyVet: response.data.isEmergencyVet,
    };

    return userData;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    // Aquí puedes agregar la llamada a tu API de logout si existe
    localStorage.removeItem("userEmail");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
