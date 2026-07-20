import React, { useEffect, useState } from "react";
import { useScheduling } from "@/contexts/SchedulingContext";
import { TimeSlot } from "@/lib/schedulingLogic";
import { fetchAvailableSlots } from "@/app/actions/scheduling";
import { Button } from "@/components/ui/Button";

export function StepDateTime() {
  const { state, setDate, setTime, nextStep, prevStep } = useScheduling();
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedDateState, setSelectedDateState] = useState<Date>(state.date || new Date());

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSlots() {
      if (state.barber && state.service) {
        setIsLoading(true);
        try {
          const dateStr = selectedDateState.toISOString().split('T')[0];
          const slots = await fetchAvailableSlots(state.barber.id, dateStr, state.service.duration);
          setAvailableSlots(slots);
          
          // If previously selected time is not available in new date, clear it
          if (state.time) {
            const slotStillValid = slots.find(s => s.time === state.time && s.available);
            if (!slotStillValid) {
              setTime("");
            }
          }
        } catch (error) {
          console.error("Error fetching slots:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchSlots();
  }, [selectedDateState, state.barber, state.service, state.time, setTime]);

  const handleDateSelect = (d: Date) => {
    setSelectedDateState(d);
    setDate(d);
  };

  const handleTimeSelect = (t: string) => {
    setTime(t);
  };

  const handleNext = () => {
    if (state.date && state.time) {
      nextStep();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button onClick={prevStep} className="text-white/50 hover:text-white mr-4 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h3 className="text-xl font-serif text-white m-0">Data e Horário</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-4">
        {/* Date Picker */}
        <div className="mb-8">
          <label htmlFor="date-picker" className="block text-sm font-medium text-muted mb-2">
            Selecione o dia
          </label>
          <div className="relative">
            <input 
              id="date-picker"
              type="date"
              value={selectedDateState.toISOString().split('T')[0]}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                if(e.target.value) {
                  // Append time to avoid timezone offset issues
                  const d = new Date(e.target.value + "T12:00:00");
                  handleDateSelect(d);
                }
              }}
              className="w-full bg-background-deep border border-border/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-soft focus:ring-1 focus:ring-gold-soft transition-all appearance-none"
              style={{ colorScheme: "dark" }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted mb-3">Horários disponíveis</p>
          {isLoading ? (
            <div className="p-4 rounded-xl border border-border/20 bg-surface/50 text-center text-muted text-sm animate-pulse">
              Carregando horários...
            </div>
          ) : availableSlots.filter(s => s.available).length === 0 ? (
            <div className="p-4 rounded-xl border border-border/20 bg-surface/50 text-center text-muted text-sm">
              Nenhum horário disponível para este dia.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {availableSlots.map((slot, idx) => {
                const isSelected = state.time === slot.time;
                if (!slot.available) {
                  return (
                    <div key={idx} className="p-3 rounded-lg border border-border/10 bg-surface/30 text-white/20 text-center text-sm cursor-not-allowed">
                      {slot.time}
                    </div>
                  );
                }
                
                return (
                  <div 
                    key={idx}
                    onClick={() => handleTimeSelect(slot.time)}
                    className={`p-3 rounded-lg border text-center text-sm font-semibold cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-gold-soft text-background-deep border-gold-soft scale-105 shadow-[0_0_10px_rgba(201,170,122,0.3)]"
                        : "bg-background-deep border-border/30 text-white hover:border-gold-soft/50"
                    }`}
                  >
                    {slot.time}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={!state.date || !state.time}
          className="w-full sm:w-auto"
        >
          CONTINUAR
        </Button>
      </div>
    </div>
  );
}
