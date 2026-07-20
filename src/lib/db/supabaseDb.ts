import { createClient } from "@supabase/supabase-js";
import { Barber } from "@/contexts/SchedulingContext";
import { Appointment, BusinessSettings } from "./mockDb";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
  // Barbers
  getBarbers: async (): Promise<Barber[]> => {
    const { data, error } = await supabase.from('barbers').select('*');
    if (error) {
      console.error("Error fetching barbers:", error);
      return [];
    }
    return data;
  },
  
  getBarber: async (id: string): Promise<Barber | undefined> => {
    const { data, error } = await supabase.from('barbers').select('*').eq('id', id).single();
    if (error) {
      console.error("Error fetching barber:", error);
      return undefined;
    }
    return data;
  },
  
  // Business Settings
  getBusinessSettings: async (): Promise<BusinessSettings[]> => {
    const { data, error } = await supabase.from('business_settings').select('*');
    if (error) {
      console.error("Error fetching business settings:", error);
      return [];
    }
    // Mapping from DB snake_case to app camelCase
    return data.map(s => ({
      dayOfWeek: s.day_of_week,
      isOpen: s.is_open,
      openTime: s.open_time || "",
      closeTime: s.close_time || "",
      lunchStart: s.lunch_start || "",
      lunchEnd: s.lunch_end || "",
      slotIntervalMinutes: s.slot_interval_minutes || 30
    }));
  },

  updateBusinessSettings: async (settings: BusinessSettings[]) => {
    // Upsert all settings
    const upsertData = settings.map(s => ({
      day_of_week: s.dayOfWeek,
      is_open: s.isOpen,
      open_time: s.openTime,
      close_time: s.closeTime,
      lunch_start: s.lunchStart,
      lunch_end: s.lunchEnd,
      slot_interval_minutes: s.slotIntervalMinutes
    }));

    const { error } = await supabase.from('business_settings').upsert(upsertData, { onConflict: 'day_of_week' });
    if (error) {
      console.error("Error updating business settings:", error);
    }
    return settings;
  },

  // Appointments
  getAppointments: async (): Promise<Appointment[]> => {
    const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
    // Mapping from DB snake_case to app camelCase
    return data.map(a => ({
      id: a.id,
      customerName: a.customer_name,
      customerPhone: a.customer_phone,
      barberId: a.barber_id,
      serviceTitle: a.service_title,
      servicePrice: a.service_price,
      serviceDuration: a.service_duration,
      date: a.date,
      time: a.time,
      status: a.status as "PENDENTE" | "CONFIRMADO" | "CANCELADO",
      createdAt: a.created_at
    }));
  },

  addAppointment: async (app: Omit<Appointment, "id" | "createdAt" | "status">) => {
    const insertData = {
      customer_name: app.customerName,
      customer_phone: app.customerPhone,
      barber_id: app.barberId,
      service_title: app.serviceTitle,
      service_price: app.servicePrice,
      service_duration: app.serviceDuration,
      date: app.date,
      time: app.time,
      status: "PENDENTE"
    };

    const { data, error } = await supabase.from('appointments').insert([insertData]).select().single();
    
    if (error) {
      console.error("Error inserting appointment:", error);
      throw error;
    }

    return {
      id: data.id,
      customerName: data.customer_name,
      customerPhone: data.customer_phone,
      barberId: data.barber_id,
      serviceTitle: data.service_title,
      servicePrice: data.service_price,
      serviceDuration: data.service_duration,
      date: data.date,
      time: data.time,
      status: data.status,
      createdAt: data.created_at
    } as Appointment;
  },

  updateAppointmentStatus: async (id: string, status: "PENDENTE" | "CONFIRMADO" | "CANCELADO") => {
    const { data, error } = await supabase.from('appointments').update({ status }).eq('id', id).select().single();
    
    if (error) {
      console.error("Error updating appointment:", error);
      throw error;
    }

    return {
      id: data.id,
      customerName: data.customer_name,
      customerPhone: data.customer_phone,
      barberId: data.barber_id,
      serviceTitle: data.service_title,
      servicePrice: data.service_price,
      serviceDuration: data.service_duration,
      date: data.date,
      time: data.time,
      status: data.status,
      createdAt: data.created_at
    } as Appointment;
  },

  deleteAppointment: async (id: string) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) {
      console.error("Error deleting appointment:", error);
      throw error;
    }
  },

  // Blocked Dates fallback (not used dynamically right now, but kept for interface match)
  getBlockedDates: async () => [] as { id: string; date: string; reason: string }[]
};
