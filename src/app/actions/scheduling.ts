"use server";

import { db } from "@/lib/db";
import { getAvailableSlotsDynamic } from "@/lib/schedulingLogic";

export async function fetchAvailableSlots(barberId: string, dateStr: string, durationMinutes: number) {
  const date = new Date(dateStr + "T12:00:00");
  return getAvailableSlotsDynamic(barberId, date, durationMinutes);
}

export async function createAppointment(data: {
  customerName: string;
  customerPhone: string;
  barberId: string;
  serviceTitle: string;
  servicePrice: string;
  serviceDuration: number;
  date: string;
  time: string;
}) {
  return await db.addAppointment(data);
}
