"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Barber = {
  id: string;
  name: string;
  role: string;
  rating?: string;
  image?: string;
};

export type Service = {
  title: string;
  price: string;
  duration: number;
};

type SchedulingState = {
  isOpen: boolean;
  step: number;
  barber: Barber | null;
  service: Service | null;
  date: Date | null;
  time: string | null;
  userInfo: { name: string; phone: string } | null;
};

type SchedulingContextType = {
  state: SchedulingState;
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setBarber: (barber: Barber) => void;
  setService: (service: Service) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  setUserInfo: (name: string, phone: string) => void;
  resetState: () => void;
};

const initialState: SchedulingState = {
  isOpen: false,
  step: 1,
  barber: null,
  service: null,
  date: null,
  time: null,
  userInfo: null,
};

const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

export function SchedulingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SchedulingState>(initialState);

  const openModal = () => setState((prev) => ({ ...prev, isOpen: true }));
  const closeModal = () => setState((prev) => ({ ...prev, isOpen: false }));
  const nextStep = () => setState((prev) => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState((prev) => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  
  const setBarber = (barber: Barber) => setState((prev) => ({ ...prev, barber }));
  const setService = (service: Service) => setState((prev) => ({ ...prev, service }));
  const setDate = (date: Date) => setState((prev) => ({ ...prev, date }));
  const setTime = (time: string) => setState((prev) => ({ ...prev, time }));
  const setUserInfo = (name: string, phone: string) => setState((prev) => ({ ...prev, userInfo: { name, phone } }));
  const resetState = () => setState({ ...initialState, isOpen: false });

  return (
    <SchedulingContext.Provider
      value={{
        state,
        openModal,
        closeModal,
        nextStep,
        prevStep,
        setBarber,
        setService,
        setDate,
        setTime,
        setUserInfo,
        resetState,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  );
}

export function useScheduling() {
  const context = useContext(SchedulingContext);
  if (context === undefined) {
    throw new Error("useScheduling must be used within a SchedulingProvider");
  }
  return context;
}
