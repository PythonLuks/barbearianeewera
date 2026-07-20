"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { resetTodayAction } from "@/app/actions/admin";

export function ResetDayButton({ dateStr }: { dateStr: string }) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = React.useState(false);

  const handleResetRequest = () => {
    setShowModal(true);
  };

  const confirmReset = () => {
    startTransition(() => {
      resetTodayAction(dateStr);
      setShowModal(false);
    });
  };

  const cancelReset = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button 
        variant="secondary" 
        onClick={handleResetRequest}
        disabled={isPending}
        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20 px-4 py-2 text-sm flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        {isPending ? "Zerando..." : "Zerar Painel (Teste)"}
      </Button>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-border/20 p-6 rounded-2xl max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-white text-center mb-2">Zerar o Painel?</h3>
            <p className="text-muted text-sm text-center mb-6">
              Você tem certeza que deseja deletar todos os agendamentos do dia atual? Essa ação é permanente e usada para limpar testes.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={cancelReset} 
                className="flex-1"
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={confirmReset} 
                className="flex-1 bg-red-500 hover:bg-red-600 text-white border-none"
                disabled={isPending}
              >
                {isPending ? "Zerando..." : "Sim, zerar painel"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
