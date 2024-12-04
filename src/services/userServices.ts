import { AxiosError } from "axios";
import api from "../api";

export interface Vet {
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

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  email: string;
  code: string;
  newPassword: string;
}

export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      throw new Error("No user email found");
    }

    const response = await api.get(`/vet/searchVetByEmail/${userEmail}`);

    const isEnabled =
      response.data.status === "enabled" && response.data.payment === "paid";

    return isEnabled;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error checking subscription:", axiosError);
    return false;
  }
};

export const getCurrentUser = async (): Promise<Vet> => {
  try {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      throw new Error("No user email found");
    }

    const response = await api.get(`/vet/searchVetByEmail/${userEmail}`);

    const userData: Vet = {
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

export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    await api.post("api/password/request/email", { email });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

export const resetPassword = async (
  resetData: PasswordReset
): Promise<void> => {
  try {
    await api.post("api/password/reset", resetData);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
