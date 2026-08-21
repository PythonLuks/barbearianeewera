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
  const dateObj = new Date(data.date + "T12:00:00");
  const slots = await getAvailableSlotsDynamic(data.barberId, dateObj, data.serviceDuration);
  const selectedSlot = slots.find(s => s.time === data.time);

  if (!selectedSlot || !selectedSlot.available) {
    throw new Error("Este horário não está mais disponível. Por favor, escolha outro.");
  }

  return await db.addAppointment(data);
}
