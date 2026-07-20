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

// Mock logic to simulate availability based on Barber and Date
export function getAvailableSlots(barberId: string, date: Date, durationMinutes: number): TimeSlot[] {
  // Barbers work from 09:00 to 19:00
  const allSlots = generateTimeSlots("09:00", "19:00", 30);
  
  // Format date to string for mocking
  const dateStr = date.toISOString().split('T')[0];

  // We simulate some busy slots based on a hash of date + barberId
  // For demonstration, we explicitly hardcode some rules:
  const busySlots = new Set<string>();

  if (barberId === "robson") {
    // Robson is busy at 09:00, 10:30, and 14:00 on any date
    busySlots.add("09:00");
    busySlots.add("10:30");
    busySlots.add("14:00");
  } else if (barberId === "joaquim") {
    // Joaquim is busy at 09:30, 11:00, and 15:30 on any date
    busySlots.add("09:30");
    busySlots.add("11:00");
    busySlots.add("15:30");
  }

  // To consider a slot available for a specific duration, we must ensure that all required 30-min blocks are available.
  // For simplicity, we just check if the slot itself and the subsequent slots needed for the duration are free.
  const blocksNeeded = Math.ceil(durationMinutes / 30);

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
