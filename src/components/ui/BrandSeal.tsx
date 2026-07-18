import React from "react";
import { cn } from "@/lib/utils";

type BrandSealProps = React.HTMLAttributes<HTMLDivElement>;

export function BrandSeal({ className, ...props }: BrandSealProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full border border-gold-soft/50 p-2",
        "w-32 h-32 md:w-40 md:h-40",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 rounded-full border border-gold-soft/20 m-1"></div>
      
      {/* Circular Text SVG */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100">
        <path
          id="textPath"
          d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          fill="none"
        />
        <text className="text-[10px] uppercase tracking-[0.2em] fill-gold-soft font-sans font-medium">
          <textPath href="#textPath" startOffset="50%" textAnchor="middle">
            Neew Era • Neew Era • Neew Era • Neew Era •
          </textPath>
        </text>
      </svg>
      
      {/* Center content */}
      <div className="relative text-center flex flex-col items-center z-10">
        <span className="text-gold-soft text-xs mb-1">★</span>
        <span className="text-[10px] tracking-widest text-white uppercase font-medium">Desde</span>
        <span className="text-xl font-serif text-white font-bold leading-none">2023</span>
        <span className="text-gold-soft text-xs mt-1">★</span>
      </div>
    </div>
  );
}
