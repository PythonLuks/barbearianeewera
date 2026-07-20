"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useScheduling } from "@/contexts/SchedulingContext";
import { cn } from "@/lib/utils";

interface ScheduleButtonProps {
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  children: React.ReactNode;
}

export function ScheduleButton({ variant = "primary", className, children }: ScheduleButtonProps) {
  const { openModal } = useScheduling();

  return (
    <Button 
      variant={variant} 
      onClick={openModal} 
      className={className}
    >
      {children}
    </Button>
  );
}
