import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Image from "next/image";

export function PlansSection() {
  return (
    <section id="planos" className="py-20 lg:py-32 bg-[#010412] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>
      
      <Container className="relative z-10 flex flex-col items-center justify-center">
        <RevealOnScroll>
          
          <div className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-blue-900/40">
            <Image
              src="/images/clube-neew-era.jpg"
              alt="Clube Neew Era - Planos Ilimitados"
              width={1080}
              height={1620}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          
          <div className="mt-12 flex justify-center">
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

        </RevealOnScroll>
      </Container>
    </section>
  );
}
