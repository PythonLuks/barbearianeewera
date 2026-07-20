import { db } from "@/lib/db";
import { Barber } from "@/contexts/SchedulingContext";

export type TimeSlot = {
  time: string;
  available: boolean;
};

// Generates time slots between start and end time with given interval in minutes
export function generateTimeSlots(startTime: string, endTime: string, intervalMinutes: number): string[] {
  const slots: string[] = [];
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  let currentHour = startHour;
  let currentMinute = startMinute;

  while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
    const formattedHour = currentHour.toString().padStart(2, '0');
    const formattedMinute = currentMinute.toString().padStart(2, '0');
    slots.push(`${formattedHour}:${formattedMinute}`);

    currentMinute += intervalMinutes;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
  }

  return slots;
}

// Async logic to fetch availability dynamically from the database
export async function getAvailableSlotsDynamic(barberId: string, date: Date, durationMinutes: number): Promise<TimeSlot[]> {
  const dayOfWeek = date.getDay(); // 0-6
  const dateStr = date.toISOString().split('T')[0];

  // 1. Check if the date is entirely blocked
  const blockedDates = await db.getBlockedDates();
  if (blockedDates.some(bd => bd.date === dateStr)) {
    return []; // Totally blocked
  }

  // 2. Get business settings for this day of week
  const allSettings = await db.getBusinessSettings();
  const daySettings = allSettings.find(s => s.dayOfWeek === dayOfWeek);

  if (!daySettings || !daySettings.isOpen) {
    return []; // Closed on this day
  }

  // Generate slots for the day
  // If lunch break is defined, we split into morning and afternoon
  let allSlots: string[] = [];
  if (daySettings.lunchStart && daySettings.lunchEnd) {
    const morningSlots = generateTimeSlots(daySettings.openTime, daySettings.lunchStart, daySettings.slotIntervalMinutes);
    const afternoonSlots = generateTimeSlots(daySettings.lunchEnd, daySettings.closeTime, daySettings.slotIntervalMinutes);
    allSlots = [...morningSlots, ...afternoonSlots];
  } else {
    allSlots = generateTimeSlots(daySettings.openTime, daySettings.closeTime, daySettings.slotIntervalMinutes);
  }

  // 3. Fetch existing appointments for the given barber on the given date
  const appointments = await db.getAppointments();
  const busySlots = new Set<string>();
  
  appointments.forEach(app => {
    if (app.barberId === barberId && app.date === dateStr && app.status !== "CANCELADO") {
      busySlots.add(app.time);
      // If service is longer than interval, we should ideally block subsequent slots too.
      // Assuming a simplistic 30 min block per appointment for now.
    }
  });

  // Calculate availability based on duration
  const blocksNeeded = Math.ceil(durationMinutes / daySettings.slotIntervalMinutes);

  return allSlots.map((time, index) => {
    let isAvailable = true;
    for (let i = 0; i < blocksNeeded; i++) {
      if (index + i >= allSlots.length || busySlots.has(allSlots[index + i])) {
        isAvailable = false;
        break;
      }
    }
    return { time, available: isAvailable };
  });
}
