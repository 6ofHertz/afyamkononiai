
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Bot, ArrowRight, Loader2, HelpCircle, Info, AlertCircle, BadgeCheck } from "lucide-react";
import SymptomInput from "@/components/symptom-checker/SymptomInput";
import AIResponse from "@/components/symptom-checker/AIResponse";

const SymptomChecker = () => {
  const { toast } = useToast();
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState<null | {
    recommendation: string;
    urgencyLevel: "low" | "medium" | "high";
    possibleConditions: string[];
    nextSteps: string[];
    medicalAdvice: string;
    preventiveMeasures: string[];
    followUpRecommendations: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("input");

  // Enhanced AI responses with more detailed medical information
  const sampleResponses = {
    fever: {
      recommendation: "Based on the symptoms described (high fever, cough, fatigue), this could indicate several conditions including a viral infection, flu, or early COVID-19. Fever is your body's natural defense mechanism against infection.",
      urgencyLevel: "medium" as const,
      possibleConditions: ["Common cold", "Influenza (Flu)", "COVID-19", "Respiratory syncytial virus (RSV)", "Bacterial infection"],
      nextSteps: [
        "Rest and stay hydrated - aim for 8-10 glasses of fluid daily",
        "Take acetaminophen or ibuprofen for fever exceeding 38.5°C (101.3°F), following package dosing instructions",
        "Monitor temperature every 4-6 hours and record readings",
        "Schedule a telehealth appointment within 24 hours if symptoms worsen or don't improve",
        "Seek immediate care if experiencing difficulty breathing, persistent high fever above 39.4°C (103°F), or severe headache"
      ],
      medicalAdvice: "While managing your fever at home, it's important to understand that fever itself is rarely dangerous in adults unless it exceeds 40°C (104°F). However, the underlying cause requires proper diagnosis, especially if accompanied by other concerning symptoms.",
      preventiveMeasures: [
        "Wash hands frequently with soap and water for at least 20 seconds",
        "Avoid close contact with sick individuals",
        "Consider wearing a mask if you must go out while sick to prevent transmission",
        "Disinfect frequently touched surfaces daily",
        "Boost immunity with adequate sleep, balanced nutrition, and stress management"
      ],
      followUpRecommendations: "If your fever persists beyond 3 days despite home treatment, or if you have underlying health conditions like diabetes, heart disease, or compromised immunity, consult with a healthcare provider promptly."
    },
    rash: {
      recommendation: "The skin rash with itching described could be related to several dermatological conditions. Skin manifestations often provide important diagnostic clues about underlying health issues.",
      urgencyLevel: "low" as const,
      possibleConditions: ["Contact dermatitis", "Atopic dermatitis (Eczema)", "Heat rash", "Allergic reaction", "Fungal infection"],
      nextSteps: [
        "Avoid scratching the affected area to prevent secondary infection",
        "Apply cool compresses for 15-20 minutes several times daily to reduce inflammation and itching",
        "Consider over-the-counter 1% hydrocortisone cream twice daily for up to 7 days",
        "Take an antihistamine like cetirizine or loratadine following package instructions if itching is severe",
        "Document the progression of the rash with photos and note any changes in appearance, size, or symptoms"
      ],
      medicalAdvice: "It's important to identify potential triggers for your skin condition. Keep a diary noting when symptoms worsen and any possible exposures to new foods, products, environments, or medications. This information will be valuable for diagnosis.",
      preventiveMeasures: [
        "Use mild, fragrance-free soaps and detergents",
        "Apply moisturizer to damp skin within 3 minutes after bathing",
        "Wear loose-fitting, cotton clothing to minimize friction and irritation",
        "Avoid known irritants and allergens specific to your skin",
        "Stay well-hydrated to support overall skin health"
      ],
      followUpRecommendations: "Schedule a dermatology consultation if the rash persists beyond 2 weeks, spreads to new areas, develops blisters or open sores, or is accompanied by fever or other systemic symptoms."
    },
    headache: {
      recommendation: "The severe headache described, especially with sensitivity to light and nausea, requires prompt medical attention as it may indicate a migraine or more serious neurological condition.",
      urgencyLevel: "high" as const,
      possibleConditions: ["Migraine", "Tension headache", "Cluster headache", "Intracranial pressure changes", "Meningitis (if fever and neck stiffness present)"],
      nextSteps: [
        "Rest in a quiet, dark room with minimal sensory stimulation",
        "Apply cold compresses to the forehead or back of the neck",
        "Seek urgent medical attention today, especially if this is the worst headache of your life",
        "If experiencing confusion, one-sided weakness, vision changes, or difficulty speaking, call emergency services immediately",
        "Track frequency, duration, intensity (scale 1-10), location, and associated symptoms"
      ],
      medicalAdvice: "Severe headaches, especially when new in onset or different from your usual pattern, warrant medical evaluation. A healthcare provider will assess for warning signs of serious conditions through a neurological examination and possibly imaging studies based on your clinical presentation.",
      preventiveMeasures: [
        "Identify and avoid personal headache triggers (certain foods, stress, poor sleep)",
        "Maintain regular sleep, meal, and exercise schedules",
        "Practice stress management techniques like meditation or deep breathing",
        "Stay hydrated with 2-3 liters of water daily",
        "Consider a headache diary to identify patterns and triggers"
      ],
      followUpRecommendations: "After initial assessment, follow up with a neurologist if headaches are recurring or disabling. Be prepared to discuss family history, as many headache disorders have genetic components. Consider preventive medications if experiencing more than 4 headache days per month."
    },
    pregnancy: {
      recommendation: "Based on the symptoms described (nausea, fatigue, mild abdominal discomfort), these are common experiences during early pregnancy. While generally normal, monitoring any changes is important.",
      urgencyLevel: "low" as const,
      possibleConditions: ["Normal pregnancy symptoms", "Hyperemesis gravidarum (if severe nausea/vomiting)", "Anemia", "Urinary tract infection"],
      nextSteps: [
        "Schedule your first prenatal visit if you haven't already done so",
        "Begin taking a prenatal vitamin containing folic acid daily",
        "Stay hydrated and try eating small, frequent meals to manage nausea",
        "Rest when needed and listen to your body's signals",
        "Contact your healthcare provider if you experience severe abdominal pain, bleeding, or persistent vomiting"
      ],
      medicalAdvice: "First trimester fatigue and nausea are common and typically improve by weeks 12-14. However, proper nutrition remains essential, even when appetite is poor. Focus on protein-rich foods when able to eat, and consider vitamin B6 (25mg three times daily) for nausea after consulting your healthcare provider.",
      preventiveMeasures: [
        "Avoid alcohol, tobacco, and recreational drugs completely during pregnancy",
        "Limit caffeine to less than 200mg daily (about one 12oz cup of coffee)",
        "Avoid raw or undercooked foods and unpasteurized dairy products",
        "Practice good hand hygiene and avoid contact with those who are ill",
        "Maintain moderate physical activity as approved by your healthcare provider"
      ],
      followUpRecommendations: "Your prenatal care schedule will typically include visits every 4 weeks until 28 weeks, then every 2 weeks until 36 weeks, and weekly thereafter. Each visit will monitor your health and your baby's development through various screenings and assessments."
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) {
      toast({
        title: "Please describe your symptoms",
        description: "Enter your symptoms so our AI can analyze them",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setActiveTab("results");

    // Simulate AI processing with enhanced responses
    setTimeout(() => {
      let response;
      if (userInput.toLowerCase().includes("fever") || userInput.toLowerCase().includes("temperature")) {
        response = sampleResponses.fever;
      } else if (userInput.toLowerCase().includes("rash") || userInput.toLowerCase().includes("itching") || userInput.toLowerCase().includes("skin")) {
        response = sampleResponses.rash;
      } else if (userInput.toLowerCase().includes("headache") || userInput.toLowerCase().includes("head pain") || userInput.toLowerCase().includes("migraine")) {
        response = sampleResponses.headache;
      } else if (userInput.toLowerCase().includes("pregnant") || userInput.toLowerCase().includes("pregnancy") || userInput.toLowerCase().includes("nausea")) {
        response = sampleResponses.pregnancy;
      } else {
        // Default response for other symptoms with more detailed information
        response = {
          recommendation: "Based on the symptoms you've described, I recommend scheduling a consultation with one of our healthcare providers for a proper evaluation. While I can provide general guidance, your specific situation requires personalized medical assessment.",
          urgencyLevel: "medium" as const,
          possibleConditions: ["Multiple possibilities based on described symptoms"],
          nextSteps: [
            "Schedule a telehealth appointment within 48 hours",
            "Monitor your symptoms closely and document any changes (timing, severity, triggers)",
            "Stay hydrated with at least 2-3 liters of water daily",
            "Rest adequately and avoid strenuous activities until evaluated",
            "Prepare a list of your current medications, allergies, and medical history for your consultation"
          ],
          medicalAdvice: "While waiting for your appointment, it's important to monitor for any worsening of symptoms. Keep a detailed log of symptoms, including when they occur, their severity, and any factors that seem to trigger or alleviate them.",
          preventiveMeasures: [
            "Wash hands frequently with soap and water",
            "Maintain a balanced diet rich in fruits, vegetables, and whole grains",
            "Ensure adequate sleep (7-9 hours for adults)",
            "Manage stress through relaxation techniques or mindfulness",
            "Avoid self-medication without professional guidance"
          ],
          followUpRecommendations: "After your initial consultation, follow your healthcare provider's recommendations for any necessary tests, specialist referrals, or follow-up appointments. Be prepared to discuss your complete medical history and any family history of relevant conditions."
        };
      }

      setAiResponse(response);
      setIsLoading(false);
    }, 2500);
  };

  const resetForm = () => {
    setUserInput("");
    setAiResponse(null);
    setActiveTab("input");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-background to-secondary">
          <div className="container max-w-screen-xl px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-2 mb-6">AI Symptom Checker</h1>
              <p className="text-lg text-muted-foreground">
                Get detailed insights about your symptoms and evidence-based guidance on next steps. 
                <span className="block mt-2 text-sm">
                  Note: This tool is for informational purposes only and does not replace professional medical advice.
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container max-w-screen-xl px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-border shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    AfyaMkononi AI Health Assistant
                  </CardTitle>
                  <CardDescription>
                    Describe your symptoms in detail for the most accurate analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="input" disabled={isLoading}>Describe Symptoms</TabsTrigger>
                      <TabsTrigger value="results" disabled={!isLoading && !aiResponse}>Results</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="input">
                      <SymptomInput 
                        userInput={userInput}
                        setUserInput={setUserInput}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                      />
                    </TabsContent>
                    
                    <TabsContent value="results">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                          <p className="text-muted-foreground">Analyzing your symptoms...</p>
                        </div>
                      ) : aiResponse ? (
                        <AIResponse 
                          aiResponse={aiResponse} 
                          resetForm={resetForm} 
                        />
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          Please describe your symptoms first
                        </p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="mt-8 bg-secondary/50 p-4 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Important Disclaimer</h3>
                    <p className="text-sm text-muted-foreground">
                      This AI symptom checker is not a substitute for professional medical advice, diagnosis, or treatment. 
                      Always seek the advice of your physician or other qualified health provider with any questions you may have 
                      regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of 
                      something you have read on this website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SymptomChecker;
