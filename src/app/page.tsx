import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import GenerateSection from "@/components/sections/GenerateSection";
import PublishSection from "@/components/sections/PublishSection";
import GamesSection from "@/components/sections/GamesSection";
import BuilderSection from "@/components/sections/BuilderSection";
import CTASection from "@/components/sections/CTASection";
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <HeroSection />
      <GenerateSection />
      <PublishSection />
      <GamesSection />
      <BuilderSection />
      <CTASection />
      <AboutSection />
      <Footer />
    </main>
  );
}
