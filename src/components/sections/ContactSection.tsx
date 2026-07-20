import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScheduleButton } from "@/components/scheduling/ScheduleButton";
import { MapPin, MessageCircle, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contato" className="py-20 bg-background-deep border-t border-border/20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Location */}
          <div className="flex flex-col">
            <h3 className="text-white font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              Onde Estamos
            </h3>
            <div className="flex gap-3 text-muted text-sm font-light mb-6">
              <MapPin className="text-primary shrink-0 mt-1" size={20} />
              <div>
                <p>{siteConfig.address.street}</p>
                <p>{siteConfig.address.district} — {siteConfig.address.city}</p>
                <p>CEP {siteConfig.address.zipCode}</p>
              </div>
            </div>
            <Button variant="outline" href={siteConfig.address.mapsUrl} className="self-start text-xs py-2 px-4 gap-2">
              VER NO MAPA
              <MapPin size={14} />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-white font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Fale Conosco
            </h3>
            <div className="flex flex-col gap-4 text-muted text-sm font-light mb-6">
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-primary">
                  <MessageCircle size={16} />
                </div>
                {siteConfig.phone}
              </a>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                {siteConfig.instagram}
              </a>
            </div>
            <p className="text-xs text-white/60 tracking-wider">
              Chame no WhatsApp <br /> e agende seu horário!
            </p>
          </div>

          {/* Business Hours */}
          <div className="flex flex-col">
            <h3 className="text-white font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              Horário de Funcionamento
            </h3>
            <div className="flex gap-3 text-muted text-sm font-light">
              <Clock className="text-primary shrink-0 mt-1" size={20} />
              <ul className="flex flex-col gap-2 w-full">
                {siteConfig.businessHours.map((schedule, idx) => (
                  <li key={idx} className="flex justify-between items-center gap-4">
                    <span>{schedule.days}</span>
                    <span className="text-white font-medium">{schedule.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <ScheduleButton variant="primary" className="w-full sm:w-auto text-xs py-3 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                AGENDAR AGORA
              </ScheduleButton>
            </div>
          </div>


        </div>
      </Container>
    </section>
  );
}
