import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PricingTableSection } from "@/components/sections/PricingTableSection";
import { PlansSection } from "@/components/sections/PlansSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-grow">
        <HeroSection />
        <AboutSection />
        <PricingTableSection />
        <PlansSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
