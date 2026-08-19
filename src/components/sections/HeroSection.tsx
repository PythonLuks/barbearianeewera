import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { ScheduleButton } from "@/components/scheduling/ScheduleButton";
import { siteConfig } from "@/config/site";

import corteImg from "../../../assets/reference/cortes.jpg";
import infantilImg from "../../../assets/reference/infantil.jpg";
import corteBarbaImg from "../../../assets/reference/cortebarba.jpg";
import nevouImg from "../../../assets/reference/nevou.jpeg";

export function HeroSection() {
  const carouselImages = [corteImg, infantilImg, corteBarbaImg, nevouImg];

  return (
    <section id="inicio" className="relative min-h-[100dvh] pt-32 lg:pt-48 pb-12 flex flex-col justify-center overflow-hidden bg-background">
      
      {/* Background Image Setup */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
        <Image
          src="/images/hero/fundobom2.png"
          alt="Interior da Barbearia"
          fill
          priority
          className="object-cover object-center lg:object-right opacity-60 lg:opacity-100"
          sizes="100vw"
        />
        
        {/* Overlay subtle blue tint */}
        <div className="absolute inset-0 bg-petrol/20 mix-blend-overlay z-10"></div>
      </div>

      <Container className="relative z-20 flex-grow flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center flex-grow">
          
          {/* Left Content */}
          <div className="max-w-2xl pt-12 lg:pt-0">
            {/* Top Label */}
            <div className="flex items-center gap-4 mb-6 text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gold-soft uppercase">
              <span className="text-lg leading-none">★</span>
              <span>TRADIÇÃO</span>
              <span className="text-[8px]">•</span>
              <span>CUIDADO</span>
              <span className="text-[8px]">•</span>
              <span>ATITUDE</span>
              <span className="text-lg leading-none">★</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bodoni uppercase tracking-wider leading-[0.95] mb-8 text-white">
              O Clássico <br />
              <span className="text-white/90">Entra Em</span> <br />
              Uma Nova Era.
            </h1>

            {/* Short line divider */}
            <div className="w-16 h-1 bg-primary mb-8"></div>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/80 max-w-lg mb-10 leading-relaxed font-light">
              Corte, barba e estilo com técnica, precisão e personalidade.
              Mais que um serviço, é sobre se sentir no seu melhor.
            </p>
          </div>

          {/* Right Area (Brand Seal on Desktop) */}
          <div className="hidden lg:flex justify-end items-end pb-12">
            <BrandSeal className="mr-8 xl:mr-16 mb-16" />
          </div>
        </div>

        {/* Carousel & CTA */}
        <div className="mt-8 lg:mt-12 lg:w-1/2">
          
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 hide-scrollbar">
            {carouselImages.map((img, idx) => (
              <div key={idx} className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0 rounded-xl overflow-hidden snap-center border-2 border-white/10">
                <Image 
                  src={img} 
                  alt={`Estilo ${idx + 1}`} 
                  fill 
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex">
            <ScheduleButton variant="primary" className="gap-2 group w-full sm:w-auto justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
              Agendar Agora
            </ScheduleButton>
          </div>

        </div>

      </Container>
    </section>
  );
}
