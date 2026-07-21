import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

// Importando as imagens diretamente da pasta assets como o usuário pediu
import corteImg from "../../../assets/reference/cortes.jpg";
import infantilImg from "../../../assets/reference/infantil.jpg";
import corteBarbaImg from "../../../assets/reference/cortebarba.jpg";
import pigmentacaoImg from "../../../assets/reference/pigmentacao.jpg";

const customServices = [
  {
    title: "CORTE CABELO",
    price: "30$",
    image: corteImg,
    subtitle: "FOTOS A BAIXO 👇🏻"
  },
  {
    title: "CORT INFANTIL",
    price: "30$",
    image: infantilImg,
    subtitle: "Foto a baixo"
  },
  {
    title: "CORT + BARBA",
    price: "45$",
    image: corteBarbaImg,
    subtitle: "FOTOS A BAIXO"
  },
  {
    title: "PIGMENTACAO",
    price: "45$",
    image: pigmentacaoImg,
    subtitle: "FOTO A BAIXO"
  }
];

export function ServicesSection() {
  return (
    <section id="servicos" className="py-20 lg:py-32 bg-background border-t border-border/20">
      <Container>
        <SectionHeading 
          label="NOSSOS SERVIÇOS" 
          title="ESTILO PARA CADA DETALHE" 
          centered 
        />
        
        {/* Services Custom Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mb-16">
          {customServices.map((service, index) => (
            <div 
              key={index}
              className="bg-background-deep border border-border/30 rounded-2xl overflow-hidden flex flex-col items-center text-center transition-all duration-300 hover:border-gold-soft/80 group"
            >
              <div className="p-6 pb-4 w-full border-b border-border/10 flex flex-col items-center justify-center min-h-[120px]">
                <h3 className="text-white font-serif text-lg xl:text-xl uppercase tracking-wider leading-tight mb-2">
                  {service.title} <span className="text-gold-soft ml-2">{service.price}</span>
                </h3>
                <p className="text-muted text-xs uppercase tracking-widest mt-2 font-medium">
                  {service.subtitle}
                </p>
              </div>
              <div className="relative w-full aspect-square overflow-hidden bg-background">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  placeholder="blur"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="flex justify-center">
          <Button 
            variant="primary" 
            href="#agendamento"
            className="w-full md:w-auto text-xs md:text-sm tracking-wider px-8 py-4 text-center h-auto"
          >
            FAÇA UM AGENDAMENTO AGORA PARA ACESSAR TODOS OS NOSSOS SERVIÇOS. E VEM DEIXAR SEU VISUAL EM DIA
          </Button>
        </div>
      </Container>
    </section>
  );
}
