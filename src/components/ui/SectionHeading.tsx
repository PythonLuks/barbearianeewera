import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  label?: string;
  title: string | React.ReactNode;
  centered?: boolean;
}

export function SectionHeading({ label, title, centered = false, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center", className)} {...props}>
      {label && (
        <div className={cn("flex items-center gap-4 mb-4 text-xs font-bold tracking-[0.2em] text-gold-soft uppercase", centered && "justify-center")}>
          <span className="text-lg">★</span>
          {label}
          <span className="text-lg">★</span>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl lg:text-6xl uppercase tracking-wider leading-[1.1] text-white">
        {title}
      </h2>
    </div>
  );
}
