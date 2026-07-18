import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function AboutSection() {
  return (
    <section id="sobre" className="relative py-20 lg:py-32 bg-background-deep overflow-hidden border-t border-border/20">
      <Container>
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

            {/* Overlapping Quote Card */}
            <div className="relative sm:absolute sm:-bottom-12 sm:-right-8 bg-background-deep p-8 md:p-12 border border-border/40 max-w-xs mt-8 sm:mt-0 z-20 mx-auto sm:mx-0 shadow-2xl">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M10 11h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H6a1 1 0 0 1 0-2h2a2 2 0 0 0 2-2v-4z"/><path d="M20 11h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4h-2a1 1 0 0 1 0-2h2a2 2 0 0 0 2-2v-4z"/></svg>
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl uppercase leading-tight text-white mb-6">
                Uma Nova Era Para O Seu Estilo.
              </h3>
              
              {/* Small decorative scissors */}
              <div className="text-gold-soft flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" x2="8.12" y1="4" y2="15.88"/><line x1="14.47" x2="20" y1="14.48" y2="20"/><line x1="8.12" x2="12" y1="8.12" y2="12"/></svg>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
