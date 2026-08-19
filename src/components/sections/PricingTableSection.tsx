import React from "react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { services } from "@/data/services";

export function PricingTableSection() {
  return (
    <section id="precos" className="py-20 lg:py-32 bg-[#0B35D0] lg:bg-background border-t border-border/20">
      <Container className="max-w-3xl">
        <RevealOnScroll>
          <div className="bg-[#0B35D0] border-2 border-white/20 p-8 md:p-12 rounded-xl shadow-2xl relative">
          
          <div className="text-center mb-10">
            <h2 className="text-5xl md:text-7xl font-bodoni text-white uppercase tracking-wider mb-2" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
              Tabela
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-widest relative inline-block mb-4" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
              De Serviços
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
            </h3>
          </div>

          <div className="space-y-4">
            {services.map((service, idx) => (
              <React.Fragment key={idx}>
                {service.title === "Nevou" && (
                  <div className="flex items-center justify-center gap-4 py-6">
                    <div className="h-px bg-white/50 flex-grow"></div>
                    <span className="text-white font-serif text-xl md:text-2xl uppercase tracking-widest px-4" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>Químicas</span>
                    <div className="h-px bg-white/50 flex-grow"></div>
                  </div>
                )}
                <div className="flex items-baseline justify-between text-white font-sans text-lg md:text-2xl font-bold uppercase tracking-wider group" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
                  <span className="pr-4 whitespace-nowrap">{service.title}</span>
                  <div className="flex-grow border-b-2 border-dashed border-white/40 mb-1"></div>
                  <span className="pl-4 whitespace-nowrap">{service.price}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
