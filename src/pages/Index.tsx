
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
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

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
          <section className="py-16 bg-primary/5">
            <div className="container max-w-screen-xl px-4">
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  New AI Feature
                </div>
                <h2 className="heading-2 mb-4">Talk to Our AI Health Assistant</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Get instant answers to your health questions from our AI-powered assistant. 
                  Available 24/7 to provide guidance on maternal and child healthcare topics.
                </p>
                <ButtonLink to="/ai-assistant" size="lg">
                  Try AI Health Assistant
                </ButtonLink>
              </div>
            </div>
          </section>
          <CTASection />
        </main>
        <Footer />
      </div>
    </BackgroundSlideshow>
  );
};

export default Index;
