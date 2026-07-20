import React from "react";
import { useScheduling, Service } from "@/contexts/SchedulingContext";
import { services } from "@/data/services";
import { Clock } from "lucide-react";

export function StepService() {
  const { state, setService, nextStep, prevStep } = useScheduling();

  const handleSelect = (service: any) => {
    setService({
      title: service.title,
      price: service.price,
      duration: service.duration || 30, // Fallback to 30 mins if not provided
    });
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button onClick={prevStep} className="text-white/50 hover:text-white mr-4 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h3 className="text-xl font-serif text-white m-0">Escolha o Serviço</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 max-h-[60vh]">
        {services.map((s, idx) => (
          <div 
            key={idx}
            onClick={() => handleSelect(s)}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
              state.service?.title === s.title 
                ? "border-gold-soft bg-gold-soft/10" 
                : "border-border/20 bg-background-deep hover:border-gold-soft/50 hover:bg-surface-soft"
            }`}
          >
            <div>
              <h4 className="text-white font-semibold text-base">{s.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gold-soft text-sm font-medium">{s.price}</p>
                <span className="text-border/50 text-xs">•</span>
                <p className="text-muted text-xs flex items-center gap-1">
                  <Clock size={12} /> {s.duration || 30} min
                </p>
              </div>
            </div>
            
            <div className="w-6 h-6 rounded-full border border-border/40 flex items-center justify-center">
              {state.service?.title === s.title && (
                <div className="w-3 h-3 bg-gold-soft rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
