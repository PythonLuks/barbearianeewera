import React, { useState } from "react";
import { useScheduling } from "@/contexts/SchedulingContext";
import { Button } from "@/components/ui/Button";

export function StepUserInfo() {
  const { state, setUserInfo, nextStep, prevStep } = useScheduling();
  
  const [name, setName] = useState(state.userInfo?.name || "");
  const [phone, setPhone] = useState(state.userInfo?.phone || "");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simple mask for brazilian phone: (99) 99999-9999
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);
    
    let formatted = val;
    if (val.length > 2) {
      formatted = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }
    if (val.length > 7) {
      formatted = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    }
    
    setPhone(formatted);
  };

  const handleNext = () => {
    if (name.trim() && phone.replace(/\D/g, "").length >= 10) {
      setUserInfo(name, phone);
      nextStep();
    }
  };

  const isValid = name.trim().length > 2 && phone.replace(/\D/g, "").length >= 10;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button onClick={prevStep} className="text-white/50 hover:text-white mr-4 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h3 className="text-xl font-serif text-white m-0">Seus Dados</h3>
      </div>
      
      <div className="flex-1 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm text-muted mb-2 font-medium">
            Seu nome completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: João Silva"
            className="w-full bg-background-deep border border-border/30 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm text-muted mb-2 font-medium">
            Seu WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            className="w-full bg-background-deep border border-border/30 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={!isValid}
          className="w-full sm:w-auto"
        >
          VER RESUMO
        </Button>
      </div>
    </div>
  );
}
