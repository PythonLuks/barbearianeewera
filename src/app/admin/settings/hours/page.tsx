import React from "react";
import { db } from "@/lib/db";
import HoursForm from "./HoursForm";

export default async function HoursPage() {
  const settings = await db.getBusinessSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-white">Horários de Funcionamento</h1>
        <p className="text-muted mt-1">Configure os dias e horários em que a barbearia estará aberta.</p>
      </div>

      <HoursForm initialSettings={settings} />
    </div>
  );
}
