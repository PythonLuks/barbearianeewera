import React from "react";
import { db } from "@/lib/db";
import AppointmentsTable from "./AppointmentsTable";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const appointments = await db.getAppointments();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-white">Agendamentos</h1>
        <p className="text-muted mt-1">Gerencie todos os agendamentos da barbearia</p>
      </div>

      <AppointmentsTable appointments={appointments} />
    </div>
  );
}
