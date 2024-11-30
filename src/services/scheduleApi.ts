import api from "../api";

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
};

export default scheduleApi;
