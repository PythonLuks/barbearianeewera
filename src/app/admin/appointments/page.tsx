import React from "react";
import { db } from "@/lib/db";
import AppointmentsTable from "./AppointmentsTable";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const appointments = await db.getAppointments();
  
  // Sort by date (descending) and then by time (descending)
  const sortedAppointments = [...appointments].sort((a, b) => {
    if (a.date !== b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.time.localeCompare(a.time);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-white">Agendamentos</h1>
        <p className="text-muted mt-1">Gerencie todos os agendamentos da barbearia</p>
      </div>

      <AppointmentsTable appointments={sortedAppointments} />
    </div>
  );
}
