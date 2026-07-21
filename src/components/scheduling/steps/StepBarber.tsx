import React from "react";
import { useScheduling, Barber } from "@/contexts/SchedulingContext";
import { User } from "lucide-react"; // Import an icon if no image is provided

const barbers: Barber[] = [
  { id: "robson", name: "Profissional Robson", role: "Barbeiro Sênior", rating: "5.0 ★" },
  { id: "joaquim", name: "Profissional Joaquim", role: "Barbeiro Sênior", rating: "4.8 ★" },
];

export function StepBarber() {
  const { state, setBarber, nextStep } = useScheduling();

  const handleSelect = (barber: Barber) => {
    setBarber(barber);
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="text-xl font-serif text-white mb-6 text-center">Escolha o Profissional</h3>
      
      <div className="flex flex-col gap-4">
        {barbers.map((b) => (
          <div 
            key={b.id}
            onClick={() => handleSelect(b)}
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              state.barber?.id === b.id 
                ? "border-gold-soft bg-gold-soft/10" 
                : "border-border/20 bg-background-deep hover:border-gold-soft/50 hover:bg-surface-soft"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center border border-border/30 shrink-0">
              <User className="text-gold-soft" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-lg">{b.name}</h4>
              <p className="text-muted text-sm">{b.role}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gold-soft text-sm font-semibold">{b.rating}</span>
              <span className="text-xs text-white/50 mt-1 uppercase tracking-wider">Selecionar</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
