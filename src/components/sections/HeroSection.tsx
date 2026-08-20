"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BrandSeal } from "@/components/ui/BrandSeal";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ScheduleButton } from "@/components/scheduling/ScheduleButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

import corteImg from "../../../assets/reference/cortes.jpg";
import novoCorteImg from "../../../assets/reference/novo-corte.jpg";
import corteBarbaImg from "../../../assets/reference/cortebarba.jpg";
import nevouImg from "../../../assets/reference/nevou.jpeg";

export function HeroSection() {
  const carouselImages = [corteImg, novoCorteImg, corteBarbaImg, nevouImg];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const childWidth = (scrollRef.current.children[0] as HTMLElement).offsetWidth;
      // Also account for gap (assume 16px to 24px, we can get it via standard scroll left behavior but scrollBy or absolute scrollLeft is fine)
      const gap = window.innerWidth >= 768 ? 24 : 16;
      const scrollAmount = index * (childWidth + gap);
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && scrollRef.current.children.length > 0) {
        const childWidth = (scrollRef.current.children[0] as HTMLElement).offsetWidth;
        const gap = window.innerWidth >= 768 ? 24 : 16;
        const index = Math.round(scrollRef.current.scrollLeft / (childWidth + gap));
        setActiveIndex(index);
      }
    };
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

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
        <div className="absolute inset-0 bg-[#0B35D0]/10 mix-blend-overlay z-10"></div>
      </div>

      <Container className="relative z-20 flex-grow flex flex-col justify-center">
        <RevealOnScroll>
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
          <div className="mt-8 lg:mt-12 lg:w-3/4 max-w-3xl">
            <div className="relative group">
              {/* Arrows */}
              <button 
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                disabled={activeIndex === 0}
              >
                <ChevronLeft />
              </button>
              <button 
                onClick={() => scrollToIndex(Math.min(carouselImages.length - 1, activeIndex + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                disabled={activeIndex === carouselImages.length - 1}
              >
                <ChevronRight />
              </button>

              {/* Carousel Container */}
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 py-4"
              >
                {carouselImages.map((img, idx) => (
                <div key={idx} className="relative w-[85%] sm:w-[320px] md:w-[380px] aspect-[3/4] md:aspect-[4/5] flex-shrink-0 rounded-3xl overflow-hidden snap-center snap-always border-2 border-white/10 bg-background-deep shadow-2xl">
                  <Image 
                    src={img} 
                    alt={`Estilo ${idx + 1}`} 
                    fill 
                    className="object-cover object-[center_20%]"
                  />
                </div>
              ))}
              </div>
              
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${idx === activeIndex ? "bg-[#0B35D0]" : "bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-center lg:justify-start">
              <ScheduleButton variant="primary" className="gap-2 group w-full sm:w-auto justify-center rounded-full px-8 py-4 text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                Agendar Agora
              </ScheduleButton>
            </div>

          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
