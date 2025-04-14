
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import AIResponse from "./AIResponse";

interface GeminiResponseProps {
  userInput: string;
  resetForm: () => void;
}

const GeminiResponse = ({ userInput, resetForm }: GeminiResponseProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate AI analyzing symptoms
    const analyzeSymptoms = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Mock AI analysis based on the input text
        const mockAnalysis = generateMockResponse(userInput);
        setAnalysis(mockAnalysis);
      } catch (err) {
        setError("Failed to analyze symptoms. Please try again.");
        console.error("Analysis error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    analyzeSymptoms();
  }, [userInput]);

  const generateMockResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    
    // Default response for when no specific conditions are matched
    const defaultResponse = {
      recommendation: "Based on the symptoms you've described, it's advisable to monitor your condition. If symptoms persist or worsen, please consult with a healthcare professional.",
      urgencyLevel: "low",
      possibleConditions: ["Minor Infection", "Seasonal Allergies", "Common Cold"],
      nextSteps: [
        "Rest and stay hydrated",
        "Monitor symptoms for 24-48 hours",
        "Use over-the-counter medication as appropriate",
        "Schedule a consultation if symptoms persist"
      ]
    };

    // Check for fever symptoms
    if (lowercaseInput.includes("fever") || lowercaseInput.includes("high temperature")) {
      return {
        recommendation: "Your symptoms indicate you may have a fever, which could be a sign of infection. Monitor your temperature and stay hydrated.",
        urgencyLevel: "medium",
        possibleConditions: ["Viral Infection", "Bacterial Infection", "COVID-19", "Influenza"],
        nextSteps: [
          "Monitor your temperature every 4 hours",
          "Stay hydrated and rest",
          "Take acetaminophen if appropriate",
          "If fever persists beyond 3 days or exceeds 39°C, consult a doctor immediately"
        ]
      };
    }

    // Check for child-related symptoms
    if ((lowercaseInput.includes("child") || lowercaseInput.includes("baby") || lowercaseInput.includes("infant")) && 
        (lowercaseInput.includes("fever") || lowercaseInput.includes("vomit") || lowercaseInput.includes("diarrhea"))) {
      return {
        recommendation: "Children, especially infants, need prompt medical attention when showing these symptoms. Please consult with a pediatrician soon.",
        urgencyLevel: "high",
        possibleConditions: ["Pediatric Viral Infection", "Gastroenteritis", "Ear Infection", "Respiratory Infection"],
        nextSteps: [
          "Contact your pediatrician immediately",
          "Monitor hydration levels closely",
          "Keep track of frequency and severity of symptoms",
          "Provide comfort measures while awaiting medical care"
        ]
      };
    }

    // Check for respiratory symptoms
    if (lowercaseInput.includes("cough") || lowercaseInput.includes("breath") || lowercaseInput.includes("chest pain")) {
      return {
        recommendation: "Respiratory symptoms can range from mild to severe. Based on your description, monitoring is advised with consideration for medical evaluation.",
        urgencyLevel: "medium",
        possibleConditions: ["Bronchitis", "Respiratory Infection", "Asthma Exacerbation", "COVID-19"],
        nextSteps: [
          "Rest and stay hydrated",
          "Use a humidifier if available",
          "Monitor for worsening symptoms, especially difficulty breathing",
          "Schedule a medical consultation within 24-48 hours"
        ]
      };
    }

    // Check for severe headache or neurological symptoms
    if ((lowercaseInput.includes("headache") && (lowercaseInput.includes("severe") || lowercaseInput.includes("worst"))) || 
        lowercaseInput.includes("vision") || lowercaseInput.includes("speech") || lowercaseInput.includes("numbness")) {
      return {
        recommendation: "The symptoms you've described could indicate a neurological condition requiring prompt medical attention.",
        urgencyLevel: "high",
        possibleConditions: ["Migraine", "Tension Headache", "Stroke", "Meningitis"],
        nextSteps: [
          "Seek immediate medical attention",
          "Do not drive yourself to the hospital",
          "If symptoms include sudden severe headache, vision changes, difficulty speaking, or facial drooping, call emergency services",
          "Keep a record of when symptoms started and their progression"
        ]
      };
    }

    // Return the default response if no specific conditions were matched
    return defaultResponse;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-center text-muted-foreground">
          Analyzing your symptoms with Gemini AI...
          <br />
          <span className="text-sm">This may take a moment</span>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return <AIResponse aiResponse={analysis} resetForm={resetForm} />;
};

export default GeminiResponse;
