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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-background-deep/95 backdrop-blur-md pt-32 pb-8 px-6 flex flex-col lg:hidden overflow-y-auto">
      <nav className="flex flex-col gap-6 text-center mb-8">
        {siteConfig.navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-2xl font-serif text-white uppercase tracking-wider hover:text-gold-soft transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <Button
          variant="primary"
          onClick={() => {
            onClose();
            openModal();
          }}
          className="w-full"
        >
          Agendar horário
        </Button>
        <div className="text-center text-muted text-sm mt-4">
          <p>{siteConfig.address.street}</p>
          <p>{siteConfig.address.district}</p>
        </div>
      </div>
    </div>
  );
}
