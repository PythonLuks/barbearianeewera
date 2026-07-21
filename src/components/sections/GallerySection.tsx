import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

import nevouImg from "../../../assets/reference/nevou.jpeg";

export function GallerySection() {
  const images = [
    { src: "/images/gallery/corte-1.png", objectPosition: "center" },
    { src: "/images/gallery/corte-2.png", objectPosition: "center" },
    { src: "/images/gallery/corte-3.png", objectPosition: "center" },
    { src: nevouImg, objectPosition: "center" },
  ];

  return (
    <section id="galeria" className="py-20 lg:py-32 bg-background-deep border-t border-border/20">
      <Container>
        <div className="flex items-center gap-4 justify-center mb-16 text-xs font-bold tracking-[0.2em] text-gold-soft uppercase">
          <span className="text-lg">★</span>
          GALERIA DE CORTES
          <span className="text-lg">★</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-auto lg:h-[400px]">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="relative w-full aspect-square lg:aspect-auto lg:h-full overflow-hidden border border-border/20 group"
            >
              <Image
                src={img.src}
                alt="Galeria Barbearia Neew Era"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: img.objectPosition }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="hidden lg:block absolute inset-0 bg-petrol/20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0"></div>
              <div className="hidden lg:block absolute inset-0 bg-background-deep/40 transition-opacity duration-500 group-hover:opacity-10"></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
