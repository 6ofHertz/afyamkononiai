
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
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("input");

  // Sample AI responses for demo purposes
  const sampleResponses = {
    fever: {
      recommendation: "Based on the symptoms described (high fever, cough, fatigue), this could indicate several conditions including a common viral infection, flu, or early COVID-19.",
      urgencyLevel: "medium" as const,
      possibleConditions: ["Common cold", "Influenza (Flu)", "COVID-19", "Respiratory infection"],
      nextSteps: [
        "Rest and stay hydrated",
        "Take over-the-counter fever reducers like acetaminophen if temperature exceeds 38.5°C (101.3°F)",
        "Monitor symptoms for 24-48 hours",
        "Schedule a telehealth appointment if symptoms worsen or don't improve",
        "Seek immediate care if experiencing difficulty breathing or persistent high fever"
      ]
    },
    rash: {
      recommendation: "The described skin rash with itching could be related to several conditions. While it doesn't appear to be immediately dangerous, it should be evaluated.",
      urgencyLevel: "low" as const,
      possibleConditions: ["Contact dermatitis", "Eczema", "Heat rash", "Mild allergic reaction"],
      nextSteps: [
        "Avoid scratching the affected area",
        "Try a cool compress to reduce itching",
        "Consider over-the-counter antihistamines or hydrocortisone cream",
        "Schedule a teleconsultation to get proper diagnosis and treatment",
        "Take photos of the rash to share with your healthcare provider"
      ]
    },
    headache: {
      recommendation: "The severe headache described, especially with sensitivity to light and nausea, requires prompt medical attention.",
      urgencyLevel: "high" as const,
      possibleConditions: ["Migraine", "Tension headache", "Cluster headache", "More serious conditions that need evaluation"],
      nextSteps: [
        "Rest in a quiet, dark room",
        "Seek medical attention today",
        "If experiencing worst headache of life, confusion, or neurological symptoms, go to emergency care immediately",
        "Track frequency, duration and associated symptoms",
        "Discuss with doctor about prescription medications if this is recurring"
      ]
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

    // Simulate AI processing
    setTimeout(() => {
      let response;
      if (userInput.toLowerCase().includes("fever") || userInput.toLowerCase().includes("temperature")) {
        response = sampleResponses.fever;
      } else if (userInput.toLowerCase().includes("rash") || userInput.toLowerCase().includes("itching")) {
        response = sampleResponses.rash;
      } else if (userInput.toLowerCase().includes("headache") || userInput.toLowerCase().includes("head pain")) {
        response = sampleResponses.headache;
      } else {
        // Default response for other symptoms
        response = {
          recommendation: "Based on the symptoms you've described, I recommend scheduling a consultation with one of our healthcare providers for a proper evaluation.",
          urgencyLevel: "medium" as const,
          possibleConditions: ["Multiple possibilities based on symptoms"],
          nextSteps: [
            "Schedule a telehealth appointment",
            "Monitor your symptoms and note any changes",
            "Stay hydrated and get adequate rest",
            "Avoid self-medication without professional advice"
          ]
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
                Get instant insights about your symptoms and guidance on next steps. 
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
