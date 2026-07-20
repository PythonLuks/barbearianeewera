"use client";

import React, { useEffect, useState } from "react";
import { useScheduling } from "@/contexts/SchedulingContext";
import { StepBarber } from "./steps/StepBarber";
import { StepService } from "./steps/StepService";
import { StepDateTime } from "./steps/StepDateTime";
import { StepUserInfo } from "./steps/StepUserInfo";
import { StepConfirmation } from "./steps/StepConfirmation";

export function SchedulingModal() {
  const { state, closeModal } = useScheduling();
  const [isRendered, setIsRendered] = useState(false);

  // For smooth mount/unmount animation
  useEffect(() => {
    if (state.isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = "unset";
      }, 300); // Matches Tailwind transition duration
    }
  }, [state.isOpen]);

  if (!isRendered) return null;

  const renderStep = () => {
    switch (state.step) {
      case 1: return <StepBarber />;
      case 2: return <StepService />;
      case 3: return <StepDateTime />;
      case 4: return <StepUserInfo />;
      case 5: return <StepConfirmation />;
      default: return <StepBarber />;
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        state.isOpen ? "opacity-100 backdrop-blur-md bg-black/60" : "opacity-0 backdrop-blur-none bg-transparent"
      }`}
    >
      <div 
        className={`bg-surface border border-border/20 rounded-2xl w-full max-w-lg h-[85vh] sm:h-[600px] flex flex-col shadow-2xl relative overflow-hidden transition-all duration-300 transform ${
          state.isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
        }`}
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors bg-surface-soft/80 rounded-full p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-surface-soft">
          <div 
            className="h-full bg-gold-soft transition-all duration-500 ease-out"
            style={{ width: `${(state.step / 5) * 100}%` }}
          />
        </div>

        <div className="flex-1 p-6 sm:p-8 overflow-hidden relative">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
