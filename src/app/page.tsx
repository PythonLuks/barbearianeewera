import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { VideoShowcaseSection } from "@/components/sections/VideoShowcaseSection";
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
        <VideoShowcaseSection />
        <PlansSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
