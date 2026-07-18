import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

// SVG Icon Helper based on iconId
const ServiceIcon = ({ iconId }: { iconId: string }) => {
  // O usuário solicitou que todos os ícones sejam tesouras
  return <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" x2="8.12" y1="4" y2="15.88"/><line x1="14.47" x2="20" y1="14.48" y2="20"/><line x1="8.12" x2="12" y1="8.12" y2="12"/></svg>;
};

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 lg:py-32 bg-background border-t border-border/20">
      <Container>
        <SectionHeading 
          label="NOSSOS SERVIÇOS" 
          title="ESTILO PARA CADA DETALHE" 
          centered 
        />
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 xl:gap-6 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-background-deep border border-border/30 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-gold-soft/80 group"
            >
              <div className="text-gold-soft mb-6 transition-transform duration-500 group-hover:scale-110">
                <ServiceIcon iconId={service.iconId} />
              </div>
              <h3 className="text-white font-serif text-lg xl:text-xl uppercase tracking-wider leading-tight mb-4">
                {service.title}
              </h3>
              <p className="text-muted text-xs xl:text-sm font-light mb-6 flex-grow">
                {service.description}
              </p>
              <div className="border-t border-border/20 w-full pt-4 mt-auto">
                <p className="text-gold-soft font-semibold tracking-widest text-sm">
                  {service.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All button */}
        <div className="flex justify-center">
          <Button variant="outline" href="#servicos" className="w-full md:w-auto text-xs tracking-[0.2em]">
            VER TODOS OS SERVIÇOS
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
          </Button>
        </div>
      </Container>
    </section>
  );
}
