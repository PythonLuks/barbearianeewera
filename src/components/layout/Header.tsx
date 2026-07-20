"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { useScheduling } from "@/contexts/SchedulingContext";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useScheduling();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background-deep shadow-lg py-3" : "bg-background-deep/90 py-5"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative z-50 block w-24 h-24 sm:w-32 sm:h-32 -my-2 flex-shrink-0 overflow-hidden">
            <Image
              src="/images/logo/logo-transparente.png"
              alt={siteConfig.name}
              fill
              className="object-contain"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            <Button
              variant="primary"
              onClick={openModal}
              className="hidden md:inline-flex py-3 px-6 gap-2 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
              Agendar horário
            </Button>
            
            <button
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-[6px] text-white border border-white/20 rounded-md hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={cn("block w-6 h-[2px] bg-current transition-all duration-300", isMobileMenuOpen ? "rotate-45 translate-y-[8px]" : "")}></span>
              <span className={cn("block w-6 h-[2px] bg-current transition-all duration-300", isMobileMenuOpen ? "opacity-0" : "")}></span>
              <span className={cn("block w-6 h-[2px] bg-current transition-all duration-300", isMobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : "")}></span>
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
