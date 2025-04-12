
import { Brain, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

const AIFeature = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container max-w-screen-xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Brain className="mr-2 h-4 w-4" />
              New AI Feature
            </div>
            <h2 className="heading-2">
              AI-Powered Symptom Checker
            </h2>
            <p className="text-xl text-muted-foreground">
              Our advanced AI helps analyze symptoms and provides guidance on potential next steps for your family's health concerns.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-1">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <span>Instant analysis of symptoms for both adults and children</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-1">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <span>Recommendations based on symptom urgency level</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-1">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <span>Guidance on potential next steps and when to seek care</span>
              </li>
            </ul>
            <ButtonLink to="/symptom-checker" size="lg" className="mt-2">
              Try Symptom Checker
            </ButtonLink>
          </div>
          
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full filter blur-xl animate-float"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/20 rounded-full filter blur-xl"></div>
            
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1536064479547-7ee40b74b807?w=800&auto=format&fit=crop&q=80" 
                alt="AI-powered healthcare" 
                className="rounded-2xl shadow-lg w-full h-auto aspect-video object-cover"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <p className="font-medium text-sm">AI Insights</p>
                </div>
                <p className="text-xs text-muted-foreground">Get personalized health guidance powered by advanced medical AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeature;
