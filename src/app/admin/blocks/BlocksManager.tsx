"use client";

import React, { useState, useTransition, useMemo } from "react";
import { Barber } from "@/contexts/SchedulingContext";
import { Appointment, BusinessSettings } from "@/lib/db/mockDb";
import { generateTimeSlots } from "@/lib/schedulingLogic";
import { toggleBlockedSlotAction } from "@/app/actions/admin";
import { Button } from "@/components/ui/Button";

export default function BlocksManager({
  barbers,
  appointments,
  businessSettings
}: {
  barbers: Barber[];
  appointments: Appointment[];
  businessSettings: BusinessSettings[];
}) {
  const [selectedBarber, setSelectedBarber] = useState<string>(barbers[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }));
  const [isPending, startTransition] = useTransition();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleBarberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBarber(e.target.value);
  };

  const dayOfWeek = new Date(selectedDate + "T12:00:00").getDay();
  let daySettings = businessSettings.find(s => s.dayOfWeek === dayOfWeek);

  if (!daySettings) {
    daySettings = {
      dayOfWeek: dayOfWeek,
      isOpen: dayOfWeek !== 0,
      openTime: "09:00",
      closeTime: "20:00",
      lunchStart: "12:00",
      lunchEnd: "14:00",
      slotIntervalMinutes: 30
    };
  }

  const allSlots = useMemo(() => {
    if (!daySettings?.isOpen) return [];
    
    let slots: string[] = [];
    if (daySettings.lunchStart && daySettings.lunchEnd) {
      const morning = generateTimeSlots(daySettings.openTime, daySettings.lunchStart, daySettings.slotIntervalMinutes);
      const afternoon = generateTimeSlots(daySettings.lunchEnd, daySettings.closeTime, daySettings.slotIntervalMinutes);
      slots = [...morning, ...afternoon];
    } else {
      slots = generateTimeSlots(daySettings.openTime, daySettings.closeTime, daySettings.slotIntervalMinutes);
    }
    return slots;
  }, [daySettings]);

  const barberAppointments = useMemo(() => {
    return appointments.filter(a => a.barberId === selectedBarber && a.date === selectedDate && a.status !== "CANCELADO");
  }, [appointments, selectedBarber, selectedDate]);

  const getSlotState = (time: string) => {
    // Note: This matches the exact time. For simplicity, we assume blocks are slot-by-slot 
    // or we check if this time falls inside any appointment's duration.
    // To be precise, we should check if `time` is covered by any appointment.
    for (const app of barberAppointments) {
      const duration = app.serviceDuration || 30;
      const appBlocks = Math.ceil(duration / (daySettings?.slotIntervalMinutes || 30));
      let currentSlotStr = app.time;
      
      for (let i = 0; i < appBlocks; i++) {
        if (currentSlotStr === time) {
          if (app.status === "BLOQUEADO") return { state: "BLOQUEADO", id: app.id };
          return { state: "OCUPADO", id: app.id, name: app.customerName };
        }
        
        const [h, m] = currentSlotStr.split(':').map(Number);
        let nextM = m + (daySettings?.slotIntervalMinutes || 30);
        let nextH = h + Math.floor(nextM / 60);
        nextM = nextM % 60;
        currentSlotStr = `${String(nextH).padStart(2, '0')}:${String(nextM).padStart(2, '0')}`;
      }
    }
    
    return { state: "LIVRE", id: null };
  };

  const handleToggleSlot = (time: string, currentState: string, existingId: string | null) => {
    if (currentState === "OCUPADO") {
      alert("Este horário já está ocupado por um cliente. Você deve cancelar o agendamento primeiro na aba de Agendamentos.");
      return;
    }

    startTransition(() => {
      const isBlocked = currentState === "BLOQUEADO";
      toggleBlockedSlotAction(selectedBarber, selectedDate, time, isBlocked, existingId || undefined);
    });
  };

  return (
    <div className="bg-surface border border-border/20 rounded-xl p-5 md:p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="text-sm text-muted block mb-2">Profissional</label>
          <select 
            value={selectedBarber} 
            onChange={handleBarberChange}
            className="w-full bg-background-deep border border-border/30 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-gold-soft transition-colors cursor-pointer"
          >
            {barbers.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-sm text-muted block mb-2">Data</label>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange}
            className="w-full bg-background-deep border border-border/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-soft transition-colors"
            style={{ colorScheme: "dark" }}
          />
        </div>
      </div>

      {!daySettings?.isOpen ? (
        <div className="text-center p-8 border border-border/10 rounded-xl bg-background-deep text-muted">
          A barbearia está fechada neste dia da semana.
        </div>
      ) : allSlots.length === 0 ? (
        <div className="text-center p-8 border border-border/10 rounded-xl bg-background-deep text-muted">
          Nenhum horário configurado para este dia.
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-background-deep border border-border/30"></div>
              <span className="text-xs text-muted">Livre</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/50"></div>
              <span className="text-xs text-muted">Bloqueado (Clique para liberar)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/50"></div>
              <span className="text-xs text-muted">Cliente Agendado</span>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {allSlots.map((time) => {
              const slotState = getSlotState(time);
              
              let styleClasses = "bg-background-deep border-border/30 hover:border-gold-soft/50 text-white";
              if (slotState.state === "BLOQUEADO") {
                styleClasses = "bg-red-500/10 border-red-500/50 text-red-200 hover:bg-red-500/20";
              } else if (slotState.state === "OCUPADO") {
                styleClasses = "bg-blue-500/10 border-blue-500/50 text-blue-200 opacity-60 cursor-not-allowed";
              }

              return (
                <button
                  key={time}
                  disabled={isPending}
                  onClick={() => handleToggleSlot(time, slotState.state, slotState.id)}
                  className={`p-3 rounded-lg border text-center text-sm font-medium transition-colors ${styleClasses}`}
                  title={slotState.state === "OCUPADO" ? \`Cliente: \${slotState.name}\` : ""}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
