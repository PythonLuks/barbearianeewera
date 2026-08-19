import React, { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { useScheduling } from "@/contexts/SchedulingContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { openModal } = useScheduling();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div 
      className={`fixed inset-0 z-40 bg-[#0B35D0]/95 backdrop-blur-md pt-32 pb-8 px-6 flex flex-col lg:hidden overflow-y-auto transition-all duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <nav className="flex flex-col gap-6 text-center mb-8">
        {siteConfig.navLinks.map((link, idx) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            style={{ transitionDelay: isOpen ? `${100 + idx * 75}ms` : '0ms' }}
            className={`text-2xl font-serif text-white uppercase tracking-wider hover:text-gold-soft transition-all duration-500 transform ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div 
        style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}
        className={`mt-auto flex flex-col gap-4 transition-all duration-500 transform ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <Button
          variant="primary"
          onClick={() => {
            onClose();
            openModal();
          }}
          className="w-full bg-white text-[#0B35D0] hover:bg-white/90"
        >
          Agendar horário
        </Button>
        <div className="text-center text-white/70 text-sm mt-4">
          <p>{siteConfig.address.street}</p>
          <p>{siteConfig.address.district}</p>
        </div>
      </div>
    </div>
  );
}
