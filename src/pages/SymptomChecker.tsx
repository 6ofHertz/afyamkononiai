
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Bot, Loader2, HelpCircle, Info } from "lucide-react";
import SymptomInput from "@/components/symptom-checker/SymptomInput";
import GeminiResponse from "@/components/symptom-checker/GeminiResponse";
import BackgroundSlideshow from "@/components/layout/BackgroundSlideshow";
import { symptomCheckerImages } from "@/lib/slideshow-images";

const SymptomChecker = () => {
  const { toast } = useToast();
  const [userInput, setUserInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("input");

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

    setIsAnalyzing(true);
    setActiveTab("results");
  };

  const resetForm = () => {
    setUserInput("");
    setIsAnalyzing(false);
    setActiveTab("input");
  };

  return (
    <BackgroundSlideshow images={symptomCheckerImages}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-12 bg-gradient-to-b from-background/80 to-secondary/50 backdrop-blur-sm">
            <div className="container max-w-screen-xl px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="heading-2 mb-6">Gemini-Powered Symptom Checker</h1>
                <p className="text-lg text-muted-foreground">
                  Get instant insights about your symptoms and guidance on next steps using Google's advanced Gemini AI technology. 
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
                <Card className="border-border shadow-md bg-card/90 backdrop-blur-sm">
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
                        <TabsTrigger value="input" disabled={isAnalyzing}>Describe Symptoms</TabsTrigger>
                        <TabsTrigger value="results" disabled={!isAnalyzing && activeTab !== "results"}>Results</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="input">
                        <SymptomInput 
                          userInput={userInput}
                          setUserInput={setUserInput}
                          handleSubmit={handleSubmit}
                          isLoading={isAnalyzing}
                        />
                      </TabsContent>
                      
                      <TabsContent value="results">
                        {isAnalyzing ? (
                          <GeminiResponse 
                            userInput={userInput}
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

                <div className="mt-8 bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Important Health Notice</h3>
                      <p className="text-sm text-muted-foreground">
                        This Gemini-powered AI symptom checker is not a substitute for professional medical advice, diagnosis, or treatment. 
                        Always seek the advice of your physician or other qualified health provider with any questions you may have 
                        regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of 
                        something you have read through this tool.
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
    </BackgroundSlideshow>
  );
};

export default SymptomChecker;
