import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-deep relative overflow-hidden pt-20 pb-10 border-t border-white/5">
      {/* Decorative large logo in background */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-5 pointer-events-none">
        <Image
          src="/images/logo/logo-transparente.png"
          alt="Watermark"
          fill
          className="object-contain"
        />
      </div>

      <Container className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
        {/* Logo and Slogan */}
        <div className="flex flex-col items-center md:items-start max-w-sm text-center md:text-left">
          <div className="relative w-32 h-32 -mt-8 mb-2">
            <Image
              src="/images/logo/logo-transparente.png"
              alt={siteConfig.name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-white font-sans font-semibold tracking-widest text-sm mb-1 uppercase">
            TRADIÇÃO, CUIDADO E ATITUDE.
          </h3>
          <p className="text-muted text-xs uppercase tracking-wider">{siteConfig.slogan}</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold tracking-widest uppercase text-white/80">
          {siteConfig.navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-gold-soft transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-4">
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 text-white hover:border-gold-soft hover:text-gold-soft transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 text-white hover:border-gold-soft hover:text-gold-soft transition-colors" aria-label="WhatsApp">
              <MessageCircle size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </Container>
      
      <div className="mt-16 text-center text-[10px] text-white/40 tracking-wider">
        <p>© {currentYear} {siteConfig.name}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
