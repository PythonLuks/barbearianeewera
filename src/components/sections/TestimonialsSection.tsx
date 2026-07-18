import React from "react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/data/testimonials";
import { User } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-background border-t border-border/20">
      <Container>
        <div className="flex items-center justify-center gap-4 mb-16 text-xs font-bold tracking-[0.2em] text-gold-soft uppercase">
          <span className="text-lg">★</span>
          O QUE NOSSOS CLIENTES DIZEM
          <span className="text-lg">★</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-background-deep border border-border/30 p-8 flex flex-col h-full"
            >
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M10 11h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4H6a1 1 0 0 1 0-2h2a2 2 0 0 0 2-2v-4z"/><path d="M20 11h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10a4 4 0 0 1-4 4h-2a1 1 0 0 1 0-2h2a2 2 0 0 0 2-2v-4z"/></svg>
              </div>
              <p className="text-white/90 text-sm font-light leading-relaxed mb-8 flex-grow">
                {testimonial.text}
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <div className="flex gap-1 mb-1 text-gold-soft">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-white/20"></div>
                    <p className="text-white text-xs tracking-wider uppercase">{testimonial.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
