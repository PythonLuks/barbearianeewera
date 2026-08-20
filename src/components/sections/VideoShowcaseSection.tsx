"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ScheduleButton } from "@/components/scheduling/ScheduleButton";

function InteractiveVideo({ src, poster, label }: { src: string, poster: string, label: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-full relative cursor-pointer" onClick={handlePlay}>
      {!isPlaying ? (
        <>
          <Image
            src={poster}
            alt={label}
            fill
            className="object-cover transition-transform duration-700 md:group-hover:scale-105"
          />
          {/* Overlay to darken image slightly for play button and text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 text-white shadow-lg transition-transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
          <div className="absolute bottom-8 w-full text-center pointer-events-none px-4">
            <span className="block text-white font-serif text-2xl tracking-wider uppercase drop-shadow-xl">{label}</span>
          </div>
        </>
      ) : (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          autoPlay
          controls
          playsInline
        />
      )}
    </div>
  );
}

export function VideoShowcaseSection() {
  const videos = [
    { src: "/videos/pigmentacao.mp4", poster: "/videos/pigmentacao_poster.jpg", label: "Pigmentação" },
    { src: "/videos/limpezadepele.mp4", poster: "/videos/limpezadepele_poster.jpg", label: "Limpeza de Pele" },
    { src: "/videos/risco.mp4", poster: "/videos/risco_poster.jpg", label: "Risco & Detalhe" }
  ];

  return (
    <section id="precos" className="py-20 lg:py-32 bg-background-deep border-t border-border/20">
      <Container>
        <RevealOnScroll>
          <div className="flex flex-col items-center mb-12 lg:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif uppercase leading-[1.1] text-white text-center mb-4">
              Estilo para cada <span className="text-primary">detalhe.</span>
            </h2>
            <div className="w-16 h-1 bg-primary mb-6"></div>
            <p className="text-muted text-center max-w-xl font-light">
              Nossos especialistas dominam as melhores técnicas para elevar o seu visual.
            </p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-8 md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:overflow-visible md:pb-0">
            {videos.map((video, idx) => (
              <div key={idx} className="flex-shrink-0 w-[85%] sm:w-[320px] md:w-auto snap-center snap-always group">
                <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl">
                  <InteractiveVideo src={video.src} poster={video.poster} label={video.label} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 flex justify-center">
            <ScheduleButton variant="primary" className="gap-2 group w-full sm:w-auto justify-center rounded-full px-10 py-4 text-lg shadow-[0_0_20px_rgba(11,53,208,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
              Agendar Serviço
            </ScheduleButton>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

