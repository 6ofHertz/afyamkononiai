import { ButtonLink } from "@/components/ui/button-link";
import { PhoneCall, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-accent">
      <div className="container max-w-screen-xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="heading-2">
              Ready to Transform Your Family's Healthcare?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join AfyaMkononi today and experience a new standard in maternal and child healthcare.
            </p>
            <div className="flex flex-col gap-4">
              <ButtonLink to="/contact" size="lg" variant="default" className="w-full md:w-auto">
                <PhoneCall className="mr-2 h-4 w-4" />
                Request a Callback
              </ButtonLink>
              <ButtonLink to="/contact" size="lg" variant="outline" className="w-full md:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </ButtonLink>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full filter blur-xl animate-float"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/20 rounded-full filter blur-xl"></div>
            
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1589829568624-1e6425921864?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Mother and child telehealth" 
                className="rounded-2xl shadow-lg w-full h-auto aspect-video object-cover"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <p className="font-medium text-sm">Instant Access</p>
                </div>
                <p className="text-xs text-muted-foreground">Get immediate access to healthcare professionals for your family's needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
