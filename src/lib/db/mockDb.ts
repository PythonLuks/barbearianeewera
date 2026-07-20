import fs from 'fs/promises';
import path from 'path';
import { Barber } from "@/contexts/SchedulingContext";

export type Appointment = {
  id: string;
  customerName: string;
  customerPhone: string;
  barberId: string;
  serviceTitle: string;
  servicePrice: string;
  serviceDuration: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: "PENDENTE" | "CONFIRMADO" | "CANCELADO";
  createdAt: string;
};

export type BusinessSettings = {
  dayOfWeek: number; // 0-6
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  lunchStart: string;
  lunchEnd: string;
  slotIntervalMinutes: number;
};

type DbSchema = {
  barbers: Barber[];
  businessSettings: BusinessSettings[];
  appointments: Appointment[];
};

const DB_FILE = path.join(process.cwd(), 'database.json');

const defaultData: DbSchema = {
  barbers: [
    { id: "robson", name: "Robson", role: "Barbeiro Sênior", rating: "5.0 ★", active: true },
    { id: "joaquim", name: "Joaquim", role: "Especialista em Degradê", rating: "4.8 ★", active: true },
  ],
  businessSettings: [
    { dayOfWeek: 1, isOpen: true, openTime: "09:00", closeTime: "20:00", lunchStart: "12:00", lunchEnd: "14:00", slotIntervalMinutes: 30 },
    { dayOfWeek: 2, isOpen: true, openTime: "09:00", closeTime: "20:00", lunchStart: "12:00", lunchEnd: "14:00", slotIntervalMinutes: 30 },
    { dayOfWeek: 3, isOpen: true, openTime: "09:00", closeTime: "20:00", lunchStart: "12:00", lunchEnd: "14:00", slotIntervalMinutes: 30 },
    { dayOfWeek: 4, isOpen: true, openTime: "09:00", closeTime: "20:00", lunchStart: "12:00", lunchEnd: "14:00", slotIntervalMinutes: 30 },
    { dayOfWeek: 5, isOpen: true, openTime: "09:00", closeTime: "20:00", lunchStart: "12:00", lunchEnd: "14:00", slotIntervalMinutes: 30 },
    { dayOfWeek: 6, isOpen: true, openTime: "09:00", closeTime: "20:00", lunchStart: "12:00", lunchEnd: "14:00", slotIntervalMinutes: 30 },
    { dayOfWeek: 0, isOpen: false, openTime: "", closeTime: "", lunchStart: "", lunchEnd: "", slotIntervalMinutes: 30 },
  ],
  appointments: [],
};

async function readDb(): Promise<DbSchema> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await writeDb(defaultData);
      return defaultData;
    }
    throw error;
  }
}

async function writeDb(data: DbSchema) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  // Barbers
  getBarbers: async () => (await readDb()).barbers,
  getBarber: async (id: string) => (await readDb()).barbers.find(b => b.id === id),
  
  // Business Settings
  getBusinessSettings: async () => (await readDb()).businessSettings,
  updateBusinessSettings: async (settings: BusinessSettings[]) => {
    const data = await readDb();
    data.businessSettings = settings;
    await writeDb(data);
    return settings;
  },

  // Appointments
  getAppointments: async () => (await readDb()).appointments,
  addAppointment: async (app: Omit<Appointment, "id" | "createdAt" | "status">) => {
    const data = await readDb();
    const newApp: Appointment = {
      ...app,
      id: Date.now().toString(),
      status: "PENDENTE",
      createdAt: new Date().toISOString()
    };
    data.appointments.push(newApp);
    await writeDb(data);
    return newApp;
  },
  updateAppointmentStatus: async (id: string, status: "PENDENTE" | "CONFIRMADO" | "CANCELADO") => {
    const data = await readDb();
    const idx = data.appointments.findIndex(a => a.id === id);
    if (idx !== -1) {
      data.appointments[idx].status = status;
      await writeDb(data);
      return data.appointments[idx];
    }
  },
  // Blocked Dates fallback
  getBlockedDates: async () => [] as { id: string; date: string; reason: string }[]
};
