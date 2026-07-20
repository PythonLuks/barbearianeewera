"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatusAction(id: string, status: "PENDENTE" | "CONFIRMADO" | "CANCELADO") {
  await db.updateAppointmentStatus(id, status);
  revalidatePath("/admin");
  revalidatePath("/admin/appointments");
}

export async function updateBusinessSettingsAction(settings: any[]) {
  await db.updateBusinessSettings(settings);
  revalidatePath("/admin/settings/hours");
}

export async function deleteAppointmentAction(id: string) {
  await db.deleteAppointment(id);
  revalidatePath("/admin");
  revalidatePath("/admin/appointments");
}
