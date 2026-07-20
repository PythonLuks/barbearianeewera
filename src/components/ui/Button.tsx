import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, href, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-hover px-6 py-4",
      secondary: "bg-transparent text-white border border-border hover:border-gold-soft hover:text-gold-soft px-6 py-4",
      outline: "bg-transparent text-white border border-border hover:border-white px-8 py-3",
    };

    if (href) {
      return (
        <a href={href} target={props.target} rel={props.rel} className={cn(baseStyles, variants[variant], className)}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
