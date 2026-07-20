"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { resetTodayAction } from "@/app/actions/admin";

export function ResetDayButton({ dateStr }: { dateStr: string }) {
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    if (confirm("Você tem certeza que deseja DELETAR todos os agendamentos deste dia? Essa ação é permanente e usada apenas para resetar testes!")) {
      startTransition(() => {
        resetTodayAction(dateStr);
      });
    }
  };

  return (
    <Button 
      variant="secondary" 
      onClick={handleReset}
      disabled={isPending}
      className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/20 px-4 py-2 text-sm flex items-center gap-2"
    >
      <Trash2 className="w-4 h-4" />
      {isPending ? "Zerando..." : "Zerar Painel (Teste)"}
    </Button>
  );
}
