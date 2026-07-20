"use client";

import React, { useState, useTransition } from "react";
import { BusinessSettings } from "@/lib/db/mockDb";
import { updateBusinessSettingsAction } from "@/app/actions/admin";
import { Button } from "@/components/ui/Button";

const DAYS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export default function HoursForm({ initialSettings }: { initialSettings: BusinessSettings[] }) {
  const [settings, setSettings] = useState<BusinessSettings[]>(initialSettings);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (dayOfWeek: number) => {
    setSettings(prev => prev.map(s => 
      s.dayOfWeek === dayOfWeek ? { ...s, isOpen: !s.isOpen } : s
    ));
  };

  const handleChange = (dayOfWeek: number, field: keyof BusinessSettings, value: string | number) => {
    setSettings(prev => prev.map(s => 
      s.dayOfWeek === dayOfWeek ? { ...s, [field]: value } : s
    ));
  };

  const handleSave = () => {
    startTransition(() => {
      updateBusinessSettingsAction(settings);
      alert("Configurações salvas com sucesso!");
    });
  };

  return (
    <div className="space-y-4">
      {settings.sort((a,b) => a.dayOfWeek - b.dayOfWeek).map((s) => (
        <div key={s.dayOfWeek} className="bg-surface border border-border/20 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-40 flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={s.isOpen} 
              onChange={() => handleToggle(s.dayOfWeek)}
              className="w-5 h-5 accent-gold-soft"
            />
            <span className={`font-medium ${s.isOpen ? 'text-white' : 'text-muted line-through'}`}>
              {DAYS[s.dayOfWeek]}
            </span>
          </div>

          {s.isOpen ? (
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Abertura</label>
                <input type="time" value={s.openTime} onChange={e => handleChange(s.dayOfWeek, 'openTime', e.target.value)} className="w-full bg-background-deep border border-border/30 rounded-lg px-3 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Fechamento</label>
                <input type="time" value={s.closeTime} onChange={e => handleChange(s.dayOfWeek, 'closeTime', e.target.value)} className="w-full bg-background-deep border border-border/30 rounded-lg px-3 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Início Almoço (Opcional)</label>
                <input type="time" value={s.lunchStart} onChange={e => handleChange(s.dayOfWeek, 'lunchStart', e.target.value)} className="w-full bg-background-deep border border-border/30 rounded-lg px-3 py-2 text-white text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Fim Almoço (Opcional)</label>
                <input type="time" value={s.lunchEnd} onChange={e => handleChange(s.dayOfWeek, 'lunchEnd', e.target.value)} className="w-full bg-background-deep border border-border/30 rounded-lg px-3 py-2 text-white text-sm" />
              </div>
            </div>
          ) : (
            <div className="flex-1 text-sm text-muted">Fechado neste dia</div>
          )}
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? "SALVANDO..." : "SALVAR ALTERAÇÕES"}
        </Button>
      </div>
    </div>
  );
}
