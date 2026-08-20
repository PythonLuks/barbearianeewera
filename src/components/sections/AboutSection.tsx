import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AboutSection() {
  return (
    <section id="sobre" className="relative py-20 lg:py-32 bg-background-deep overflow-hidden border-t border-border/20">
      <Container>
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Vertical Label */}
          <div className="hidden lg:block absolute left-0 top-20 -translate-x-full pr-12">
            <p className="text-primary font-bold tracking-[0.3em] uppercase transform -rotate-90 origin-top-right whitespace-nowrap text-sm flex items-center gap-4">
              <span className="text-xl leading-none rotate-90 text-gold-soft">★</span>
              SOBRE NÓS
            </p>
          </div>
          
          <div className="lg:hidden flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-primary mb-6 uppercase">
            <span className="text-gold-soft text-lg">★</span>
            SOBRE NÓS
          </div>

          {/* Left Content */}
          <div className="lg:w-1/2 flex flex-col justify-center z-10">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif uppercase leading-[1.1] text-white mb-8">
              Mais que um corte.<br />
              Uma <span className="text-primary">Experiência.</span>
            </h2>
            
            <div className="text-muted leading-relaxed font-light space-y-6 max-w-lg">
              <p>
                A Neew Era Barbershop nasceu da vontade de unir o que é clássico
                àquilo que é atual. Aqui, cuidamos do seu visual com técnica,
                atenção e respeito à sua identidade.
              </p>
              <p>
                Nosso ambiente foi pensado para você relaxar, trocar uma ideia
                e sair renovado — por dentro e por fora.
              </p>
            </div>
          </div>

          {/* Right Content - Images and Cards */}
          <div className="lg:w-1/2 relative mt-10 lg:mt-0">
            
            {/* Background decoration frame */}
            <div className="absolute inset-0 border border-border/30 translate-x-4 -translate-y-4 z-0 hidden sm:block"></div>
            
            <div className="relative z-10 w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden group">
              <Image
                src="/images/recorte-fundo.png"
                alt="Interior Neew Era Barbershop"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Filter overlay */}
              <div className="absolute inset-0 bg-petrol/20 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-background-deep/30"></div>
            </div>



          </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
