import { db } from "@/lib/db";
import { CalendarDays, Users, Clock, CheckCircle, XCircle, UserCheck } from "lucide-react";
import { checkAuth } from "@/app/actions/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await checkAuth();
  const appointments = await db.getAppointments();
  
  // Calculate stats for today using correct Timezone (Brazil)
  const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }); // Returns YYYY-MM-DD
  const todayAppointments = appointments.filter(a => a.date === todayStr);
  
  // Upcoming appointments (today and future)
  const upcomingAppointments = appointments.filter(a => a.date >= todayStr).sort((a, b) => {
    if (a.date !== b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
    return a.time.localeCompare(b.time);
  }).slice(0, 10);
  
  const pending = todayAppointments.filter(a => a.status === "PENDENTE").length;
  const confirmed = todayAppointments.filter(a => a.status === "CONFIRMADO").length;
  const cancelled = todayAppointments.filter(a => a.status === "CANCELADO").length;
  
  // Total de clientes APENAS de hoje e APENAS confirmados
  const uniqueClients = new Set(
    todayAppointments
      .filter(a => a.status === "CONFIRMADO")
      .map(a => a.customerPhone)
  ).size;

  const formattedDate = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const stats = [
    { title: "Agendamentos Hoje", value: todayAppointments.length, icon: CalendarDays, color: "text-blue-400" },
    { title: "Total de Clientes", value: uniqueClients, icon: Users, color: "text-purple-400" },
    { title: "Pendentes", value: pending, icon: Clock, color: "text-yellow-400" },
    { title: "Confirmados", value: confirmed, icon: CheckCircle, color: "text-green-400" },
    { title: "Cancelados", value: cancelled, icon: XCircle, color: "text-red-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
        <div>
          <h1 className="text-3xl font-serif text-white">Dashboard</h1>
          <p className="text-muted mt-1 capitalize">{formattedDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-surface border border-border/20 rounded-xl p-5 flex items-center justify-between hover:border-gold-soft/50 transition-colors">
            <div>
              <p className="text-sm text-muted mb-1">{s.title}</p>
              <h3 className="text-2xl font-bold text-white">{s.value}</h3>
            </div>
            <div className={`p-3 rounded-lg bg-background-deep ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Próximos Atendimentos */}
      <div className="bg-surface border border-border/20 rounded-xl overflow-hidden mt-8">
        <div className="p-5 border-b border-border/20 flex items-center gap-3">
          <UserCheck className="w-5 h-5 text-gold-soft" />
          <h2 className="text-lg font-serif text-white">Próximos Atendimentos</h2>
        </div>
        
        {upcomingAppointments.length === 0 ? (
          <div className="p-8 text-center text-muted">
            Nenhum agendamento futuro encontrado.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background-deep/50 text-xs uppercase tracking-wider text-muted">
                    <th className="px-5 py-3 font-medium">Cliente</th>
                    <th className="px-5 py-3 font-medium">Serviço</th>
                    <th className="px-5 py-3 font-medium">Horário</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {upcomingAppointments.map((app, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors text-sm">
                      <td className="px-5 py-4">
                        <div className="font-medium text-white">{app.customerName}</div>
                        <div className="text-muted text-xs mt-0.5">{app.customerPhone}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-white/80">{app.serviceTitle}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gold-soft">{app.date.split('-').reverse().join('/')}</div>
                        <div className="text-muted text-xs mt-0.5">{app.time}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          app.status === 'PENDENTE' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10' :
                          app.status === 'CONFIRMADO' ? 'border-green-500/30 text-green-500 bg-green-500/10' :
                          'border-red-500/30 text-red-500 bg-red-500/10'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col divide-y divide-border/10">
              {upcomingAppointments.map((app, idx) => (
                <div key={idx} className="p-4 flex flex-col gap-3 hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-white">{app.customerName}</div>
                      <div className="text-muted text-xs">{app.customerPhone}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium border ${
                      app.status === 'PENDENTE' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10' :
                      app.status === 'CONFIRMADO' ? 'border-green-500/30 text-green-500 bg-green-500/10' :
                      'border-red-500/30 text-red-500 bg-red-500/10'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm bg-background-deep/50 p-3 rounded-lg border border-border/10">
                    <div>
                      <div className="text-muted text-[10px] uppercase mb-1">Data / Hora</div>
                      <div className="text-gold-soft font-medium">{app.date.split('-').reverse().join('/')} - {app.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-muted text-[10px] uppercase mb-1">Serviço</div>
                      <div className="text-white/80">{app.serviceTitle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
