import React from "react";
import { Container } from "@/components/ui/Container";
import { Scissors, Flame, Sparkles } from "lucide-react";

export function PlansSection() {
  return (
    <section id="planos" className="py-20 lg:py-32 bg-[#0B21BD] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      
      <Container className="relative z-10 max-w-4xl text-center">
        
        {/* Top Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center gap-4 text-white mb-6 w-full">
            <div className="h-px bg-blue-300/50 flex-grow max-w-[100px]"></div>
            <h3 className="text-xl md:text-2xl font-serif uppercase tracking-[0.3em]">
              CLUBE 💎
            </h3>
            <div className="h-px bg-blue-300/50 flex-grow max-w-[100px]"></div>
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
          
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4 text-3xl md:text-4xl font-bold mb-4">
              <Scissors className="w-8 h-8" />
              <span>Corte à vontade</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-2xl text-yellow-400 font-semibold">
              <Flame className="w-6 h-6 text-red-500 fill-red-500" />
              <span>Apenas R$ 69,90/mês</span>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
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

        {/* Contact info */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white tracking-wider">
          <div>📷 @NEEW_ERABARBERSHOP</div>
          <div>📞 (81) 98404-9137</div>
        </div>

      </Container>
    </section>
  );
}
