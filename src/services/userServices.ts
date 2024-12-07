import { AxiosError } from "axios";
import api from "../api";
import { SERVICE_DESCRIPTIONS } from "@/constants";
import { Appointment } from "@/src/services/scheduleApi";
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

export interface PaymentProcessRequest {
  vetId: number;
  preApprovalId: string;
}

export interface CalendlyEvent {
  eventName: string;
  schedulingUrl: string;
  vetName: string;
}

export interface Service {
  id: number;
  name: string;
  timeAvailability: string;
  daysAvailable: string[];
  description: string;
  active: boolean;
  status: "active" | "pending";
}
export interface CalendlyEventCount {
  totalEvents: number;
  events: CalendlyEvent[];
}
export interface DeleteServiceRequest {
  id: number;
  eventName: string;
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

export const processPaymentStatus = async (
  paymentData: PaymentProcessRequest
): Promise<void> => {
  try {
    await api.post("/mercadopago/processPaymentStatus", paymentData);
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};

export const handleMercadoPagoResponse = async (
  searchParams: URLSearchParams
): Promise<void> => {
  const collection_id = searchParams.get("collection_id");

  if (!collection_id) {
    throw new Error("No se encontró el ID de la operación");
  }

  try {
    const vetId = localStorage.getItem("vetId");
    if (!vetId) {
      throw new Error("No se encontró el ID del veterinario");
    }

    await processPaymentStatus({
      vetId: parseInt(vetId),
      preApprovalId: collection_id,
    });
  } catch (error) {
    console.error("Error processing Mercado Pago response:", error);
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
export const getVetEvents = async (): Promise<CalendlyEventCount> => {
  try {
    const vetId = localStorage.getItem("vetId");
    if (!vetId) {
      throw new Error("No se encontró el ID del veterinario");
    }

    const response = await api.get<CalendlyEvent[]>(
      `/calendly/vet/eventsById/${vetId}`
    );

    return {
      totalEvents: response.data.length,
      events: response.data,
    };
  } catch (error) {
    console.error("Error fetching vet events:", error);
    throw error;
  }
};
export const getPendingAppointments = async (): Promise<Appointment[]> => {
  try {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      throw new Error("No se encontró el email del usuario");
    }

    const response = await api.get<Appointment[]>(
      `/calendly/vet/appointments/${userEmail}`
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener las citas pendientes:", error);
    throw error;
  }
};
export const getCompletedAppointments = async (): Promise<Appointment[]> => {
  try {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      throw new Error("No se encontró el email del usuario");
    }

    const response = await api.get<Appointment[]>(
      `/calendly/vet/appointments/${userEmail}?expired=true`
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener las atenciones completadas:", error);
    throw error;
  }
};
export const filterTodayAppointments = (
  appointments: Appointment[]
): Appointment[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.startTime);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate.getTime() === today.getTime();
  });
};

const PENDING_SERVICES_KEY = "pendingDeleteServices";

// Función para obtener servicios pendientes
const getPendingServices = (): string[] => {
  try {
    const stored = localStorage.getItem(PENDING_SERVICES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error al obtener servicios pendientes:", error);
    return [];
  }
};

// Función para guardar un servicio como pendiente
const markServiceAsPending = (serviceName: string) => {
  try {
    const pendingServices = getPendingServices();
    if (!pendingServices.includes(serviceName)) {
      pendingServices.push(serviceName);
      localStorage.setItem(
        PENDING_SERVICES_KEY,
        JSON.stringify(pendingServices)
      );
    }
  } catch (error) {
    console.error("Error al marcar servicio como pendiente:", error);
  }
};

export const getVetServices = async (): Promise<Service[]> => {
  try {
    const vetId = localStorage.getItem("vetId");
    if (!vetId) {
      throw new Error("No se encontró el ID del veterinario");
    }

    const response = await api.get<CalendlyEvent[]>(
      `/calendly/vet/eventsById/${vetId}`
    );

    // Obtener servicios pendientes del localStorage
    const pendingServices = getPendingServices();

    return response.data.map((event, index) => {
      const description =
        SERVICE_DESCRIPTIONS[event.eventName] ||
        "No hay descripción disponible para este servicio";

      // Verificar si el servicio está en la lista de pendientes
      const isPending = pendingServices.includes(event.eventName);

      return {
        id: index + 1,
        name: event.eventName,
        timeAvailability: "9:00 AM - 6:00 PM",
        daysAvailable: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
        description,
        active: !isPending,
        status: isPending ? "pending" : "active",
      };
    });
  } catch (error) {
    console.error("Error fetching vet services:", error);
    throw error;
  }
};

export const deleteService = async (eventName: string): Promise<void> => {
  try {
    const vetId = localStorage.getItem("vetId");
    if (!vetId) {
      throw new Error("No se encontró el ID del veterinario");
    }

    // Marcar como pendiente antes de la llamada a la API
    markServiceAsPending(eventName);

    await api.post("/calendly/vet/eventTypes/cancellation", {
      id: parseInt(vetId),
      eventName: eventName,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
