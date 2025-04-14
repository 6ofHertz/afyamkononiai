
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Services from "@/components/home/Services";
import AIFeature from "@/components/home/AIFeature";
import CTASection from "@/components/home/CTASection";
import AnalogClock from "@/components/home/AnalogClock";
import BackgroundSlideshow from "@/components/layout/BackgroundSlideshow";
import { homeImages } from "@/lib/slideshow-images";

const Index = () => {
  return (
    <BackgroundSlideshow images={homeImages}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <section className="py-12 bg-secondary/30">
            <div className="container max-w-screen-xl px-4">
              <div className="text-center mb-8">
                <h2 className="heading-3 mb-2">Local Time</h2>
                <p className="text-muted-foreground">We're available 24/7 for your healthcare needs</p>
              </div>
              <AnalogClock />
            </div>
          </section>
          <Features />
          <AIFeature />
          <Services />
          <CTASection />
        </main>
        <Footer />
      </div>
    </BackgroundSlideshow>
  );
};

export default Index;
