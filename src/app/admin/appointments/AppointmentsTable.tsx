"use client";

import React, { useTransition } from "react";
import { updateAppointmentStatusAction } from "@/app/actions/admin";
import { Button } from "@/components/ui/Button";

type Appointment = {
  id: string;
  customerName: string;
  customerPhone: string;
  barberId: string;
  serviceTitle: string;
  date: string;
  time: string;
  status: "PENDENTE" | "CONFIRMADO" | "CANCELADO";
};

export default function AppointmentsTable({ appointments }: { appointments: Appointment[] }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id: string, status: "PENDENTE" | "CONFIRMADO" | "CANCELADO") => {
    startTransition(() => {
      updateAppointmentStatusAction(id, status);
    });
  };

  if (appointments.length === 0) {
    return <div className="text-center p-8 text-muted bg-surface rounded-xl border border-border/20">Nenhum agendamento encontrado.</div>;
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-surface border border-border/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background-deep/50 text-xs uppercase tracking-wider text-muted">
                <th className="px-5 py-4 font-medium">Data/Hora</th>
                <th className="px-5 py-4 font-medium">Cliente</th>
                <th className="px-5 py-4 font-medium">Serviço/Barbeiro</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {appointments.map((app) => (
                <tr key={app.id} className="hover:bg-white/5 transition-colors text-sm">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-white">{app.date.split("-").reverse().join("/")}</div>
                    <div className="text-gold-soft font-medium mt-0.5">{app.time}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-white">{app.customerName}</div>
                    <div className="text-muted text-xs mt-0.5">{app.customerPhone}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-white/80">{app.serviceTitle}</div>
                    <div className="text-muted text-xs mt-0.5">Barbeiro ID: {app.barberId}</div>
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
                  <td className="px-5 py-4 text-right space-x-2">
                    {app.status === "PENDENTE" && (
                      <Button 
                        variant="primary" 
                        onClick={() => handleStatusChange(app.id, "CONFIRMADO")}
                        disabled={isPending}
                        className="px-3 py-1.5 h-auto text-xs"
                      >
                        Confirmar
                      </Button>
                    )}
                    {app.status !== "CANCELADO" && (
                      <Button 
                        variant="secondary" 
                        onClick={() => handleStatusChange(app.id, "CANCELADO")}
                        disabled={isPending}
                        className="px-3 py-1.5 h-auto text-xs text-red-400 hover:text-red-300 border-red-500/20"
                      >
                        Cancelar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {appointments.map((app) => (
          <div key={app.id} className="bg-surface border border-border/20 rounded-xl p-4 flex flex-col gap-3">
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
            
            <div className="grid grid-cols-2 gap-2 text-sm bg-background-deep/50 p-3 rounded-lg border border-border/10">
              <div>
                <div className="text-muted text-[10px] uppercase">Data/Hora</div>
                <div className="text-gold-soft font-medium">{app.date.split("-").reverse().join("/")} - {app.time}</div>
              </div>
              <div>
                <div className="text-muted text-[10px] uppercase">Serviço</div>
                <div className="text-white/80 line-clamp-1">{app.serviceTitle}</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-border/10 mt-1">
              {app.status === "PENDENTE" && (
                <Button 
                  variant="primary" 
                  onClick={() => handleStatusChange(app.id, "CONFIRMADO")}
                  disabled={isPending}
                  className="flex-1 py-2 h-auto text-xs"
                >
                  Confirmar
                </Button>
              )}
              {app.status !== "CANCELADO" && (
                <Button 
                  variant="secondary" 
                  onClick={() => handleStatusChange(app.id, "CANCELADO")}
                  disabled={isPending}
                  className="flex-1 py-2 h-auto text-xs text-red-400 hover:text-red-300 border-red-500/20"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
