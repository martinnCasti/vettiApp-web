import api from "@/src/api";

export interface TimeSlot {
  from: string;
  to: string;
}

export interface DaySchedule {
  day: string;
  timeSlots: TimeSlot[];
}

export interface ScheduleRequest {
  vetEmail: string | null;
  vetName: string | null;
  service: string;
  days: DaySchedule[];
}

export interface Invitee {
  name: string;
  email: string;
  status: string;
}

export interface Appointment {
  createdAt: string;
  updatedAt: string;
  startTime: string;
  endTime: string;
  vetEmail: string;
  vetName: string;
  eventName: string;
  status: string;
  location: string;
  invitees: Invitee[];
}

export const scheduleApi = {
  createSchedule: async (scheduleData: ScheduleRequest) => {
    try {
      const response = await api.post("/vet/schedules", scheduleData);
      return response.data;
    } catch (error) {
      console.error("Error creating schedule:", error);
      throw error;
    }
  },

  getAppointments: async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        throw new Error("No se encontró el email del usuario");
      }

      const response = await api.get(
        `/calendly/vet/appointments/${userEmail}?status=active`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  },
};

export default scheduleApi;
