import { db } from "@/lib/db";
import { checkAuth } from "@/app/actions/auth";
import BlocksManager from "./BlocksManager";

export const dynamic = "force-dynamic";

export default async function BlocksPage() {
  await checkAuth();
  
  const barbers = await db.getBarbers();
  const appointments = await db.getAppointments();
  const businessSettings = await db.getBusinessSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-white">Bloqueio de Horários</h1>
        <p className="text-muted mt-1">Gerencie quais horários cada profissional estará disponível.</p>
      </div>

      <BlocksManager 
        barbers={barbers} 
        appointments={appointments} 
        businessSettings={businessSettings} 
      />
    </div>
  );
}
