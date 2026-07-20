"use client";

import React, { useTransition } from "react";
import { updateAppointmentStatusAction, deleteAppointmentAction } from "@/app/actions/admin";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

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
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleStatusChange = (id: string, status: "PENDENTE" | "CONFIRMADO" | "CANCELADO") => {
    startTransition(() => {
      updateAppointmentStatusAction(id, status);
    });
  };

  const handleDeleteRequest = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      startTransition(() => {
        deleteAppointmentAction(deletingId);
        setDeletingId(null);
      });
    }
  };

  const cancelDelete = () => {
    setDeletingId(null);
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
                    <Button
                      variant="secondary"
                      onClick={() => handleDeleteRequest(app.id)}
                      disabled={isPending}
                      className="px-2 py-1.5 h-auto border-transparent hover:border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
              <Button
                variant="secondary"
                onClick={() => handleDeleteRequest(app.id)}
                disabled={isPending}
                className="py-2 px-3 h-auto border-transparent hover:border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-border/20 p-6 rounded-2xl max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-white text-center mb-2">Excluir Agendamento?</h3>
            <p className="text-muted text-sm text-center mb-6">
              Você tem certeza que deseja excluir este agendamento? Essa ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={cancelDelete} 
                className="flex-1"
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={confirmDelete} 
                className="flex-1 bg-red-500 hover:bg-red-600 text-white border-none"
                disabled={isPending}
              >
                {isPending ? "Excluindo..." : "Sim, excluir"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
