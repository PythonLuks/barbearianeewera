import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Scissors, Flame, Sparkles } from "lucide-react";

export function PlansSection() {
  return (
    <section id="planos" className="py-20 lg:py-32 bg-[#0B21BD] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      
      <Container className="relative z-10 max-w-4xl text-center">
        <RevealOnScroll>
        
        {/* Top Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 text-white mb-6 w-full max-w-sm mx-auto">
            <div className="h-px bg-blue-300/50 flex-grow"></div>
            <h3 className="text-xl md:text-2xl font-serif uppercase tracking-[0.3em]">
              CLUBE 💎
            </h3>
            <div className="h-px bg-blue-300/50 flex-grow"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bodoni text-white uppercase tracking-wider mb-4 drop-shadow-xl">
            NEEW ERA
          </h2>
          <h4 className="text-2xl md:text-3xl font-serif text-blue-300 uppercase tracking-[0.2em] mb-12">
            ILIMITADO
          </h4>
        </div>

        {/* Plans */}
        <div className="flex flex-col gap-12 max-w-2xl mx-auto text-white font-sans">
          
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm transition-transform hover:scale-105 duration-300">
            <div className="flex items-center justify-center gap-4 text-3xl md:text-4xl font-bold mb-4">
              <Scissors className="w-8 h-8" />
              <span>Corte à vontade</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-2xl text-yellow-400 font-semibold">
              <Flame className="w-6 h-6 text-red-500 fill-red-500" />
              <span>Apenas R$ 69,90/mês</span>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm transition-transform hover:scale-105 duration-300">
            <div className="flex items-center justify-center gap-4 text-3xl md:text-4xl font-bold mb-4">
              <Scissors className="w-8 h-8" />
              <span>Corte + Barba à vontade</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-2xl text-yellow-400 font-semibold">
              <Flame className="w-6 h-6 text-red-500 fill-red-500" />
              <span>Apenas R$ 110,90/mês</span>
            </div>
          </div>

        </div>

        <div className="mt-16 text-xl md:text-2xl text-blue-200 italic font-serif flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          Eleve seu visual ao próximo nível
        </div>
        
        <div className="mt-12">
          <Button 
            href="https://wa.me/558184049137?text=Ol%C3%A1%21%20Gostaria%20de%20assinar%20o%20Clube%20Neew%20Era%20Ilimitado%2E"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/30 gap-2 text-lg px-8 py-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Assinar Agora Pelo WhatsApp
          </Button>
        </div>

        {/* Contact info */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white tracking-wider">
          <div>📷 @NEEW_ERABARBERSHOP</div>
          <div>📞 (81) 98404-9137</div>
        </div>

        </RevealOnScroll>
      </Container>
    </section>
  );
}
