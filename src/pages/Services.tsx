
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Baby, Activity, Apple, Brain } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 bg-gradient-to-b from-background to-secondary">
          <div className="container max-w-screen-xl px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-1 mb-6">Our Healthcare Services</h1>
              <p className="text-lg text-muted-foreground">
                AfyaMkononi provides specialized maternal and child healthcare services through our telehealth platform. 
                Our services are designed to support families at every stage of their healthcare journey.
              </p>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16">
          <div className="container max-w-screen-xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h2 className="heading-2 mb-6">Comprehensive Maternal & Child Healthcare</h2>
                <p className="text-muted-foreground mb-6">
                  Our platform connects you with specialized healthcare professionals who provide 
                  evidence-based care for expectant mothers, new parents, and children of all ages.
                </p>
                <p className="text-muted-foreground">
                  With AfyaMkononi, you can access quality healthcare services from the comfort of your home, 
                  reducing the stress of hospital visits while ensuring your family receives the care they need.
                </p>
              </div>
              <div className="bg-muted rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516018849628-fb4241bb556c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Doctor consulting with a mother and child" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <Tabs defaultValue="maternal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="maternal">Maternal Health</TabsTrigger>
                <TabsTrigger value="pediatric">Pediatric Care</TabsTrigger>
              </TabsList>
              <TabsContent value="maternal" className="mt-8 lg:mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div className="bg-muted rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1516685153223-595e5372973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Pregnant woman at consultation" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Maternal Healthcare Services</h3>
                    <p className="text-muted-foreground mb-6">
                      Our maternal health services cover the complete journey from preconception planning through pregnancy, 
                      childbirth, and the postpartum period.
                    </p>
                    
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Prenatal Consultations</h4>
                          <p className="text-sm text-muted-foreground">Regular check-ups and monitoring throughout your pregnancy</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                          <Apple className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Nutrition Counseling</h4>
                          <p className="text-sm text-muted-foreground">Personalized dietary advice for maternal and fetal health</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                          <Brain className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Mental Health Support</h4>
                          <p className="text-sm text-muted-foreground">Counseling for prenatal and postpartum mental wellbeing</p>
                        </div>
                      </li>
                    </ul>
                    
                    <ButtonLink to="/services/maternal" variant="default" className="mt-8">
                      Learn More About Maternal Services
                    </ButtonLink>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pediatric" className="mt-8 lg:mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Pediatric Care Services</h3>
                    <p className="text-muted-foreground mb-6">
                      Our pediatric services provide comprehensive healthcare for children from infancy through adolescence, 
                      focusing on development, prevention, and treatment.
                    </p>
                    
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                          <Baby className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Well-Child Visits</h4>
                          <p className="text-sm text-muted-foreground">Regular check-ups to monitor growth and development</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Illness Consultations</h4>
                          <p className="text-sm text-muted-foreground">Diagnosis and treatment of common childhood illnesses</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                          <Brain className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">Developmental Assessments</h4>
                          <p className="text-sm text-muted-foreground">Evaluation of cognitive, physical, and social development</p>
                        </div>
                      </li>
                    </ul>
                    
                    <ButtonLink to="/services/pediatric" variant="secondary" className="mt-8">
                      Learn More About Pediatric Services
                    </ButtonLink>
                  </div>
                  <div className="bg-muted rounded-2xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1566004100631-35d015d6a99b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Doctor examining a child" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-secondary">
          <div className="container max-w-screen-xl px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-2 mb-4">How Our Services Work</h2>
              <p className="text-muted-foreground text-lg">
                AfyaMkononi makes accessing quality healthcare simple and convenient for your family.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border">
                <div className="p-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Book an Appointment</h3>
                  <p className="text-muted-foreground">
                    Select your preferred specialist and schedule a convenient time for your consultation.
                  </p>
                </div>
              </Card>
              
              <Card className="border-border">
                <div className="p-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Join Video Consultation</h3>
                  <p className="text-muted-foreground">
                    Connect with your healthcare provider through our secure telehealth platform.
                  </p>
                </div>
              </Card>
              
              <Card className="border-border">
                <div className="p-6">
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Receive Care Plan</h3>
                  <p className="text-muted-foreground">
                    Get personalized treatment plans, prescriptions, and follow-up recommendations.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
