
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Brain, AlertCircle, Info, ArrowRight, BadgeCheck, RefreshCw } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";

interface GeminiResponseProps {
  userInput: string;
  resetForm: () => void;
}

const GeminiResponse = ({ userInput, resetForm }: GeminiResponseProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState<null | {
    recommendation: string;
    urgencyLevel: "low" | "medium" | "high";
    possibleConditions: string[];
    nextSteps: string[];
    additionalResources?: string[];
  }>(null);
  const [error, setError] = useState<string | null>(null);

  // Get Gemini analysis - in a real implementation this would call the Google Gemini API
  useState(() => {
    // Simulate AI processing with a timeout
    setTimeout(() => {
      try {
        // Simple keyword matching to determine response
        const symptomText = userInput.toLowerCase();
        let response;

        if (symptomText.includes("fever") || symptomText.includes("temperature") || symptomText.includes("hot")) {
          response = {
            recommendation: "Based on your description of fever symptoms, this could indicate an infection or inflammatory response. The body often increases temperature to fight pathogens.",
            urgencyLevel: "medium" as const,
            possibleConditions: ["Viral infection", "Bacterial infection", "COVID-19", "Influenza", "Common cold"],
            nextSteps: [
              "Rest and stay hydrated",
              "Monitor temperature regularly",
              "Take appropriate fever-reducing medication if temperature exceeds 38.5°C/101.3°F",
              "Seek medical attention if fever persists for more than 3 days or exceeds 39.4°C/103°F",
              "Watch for concerning symptoms like difficulty breathing, severe headache, or confusion"
            ],
            additionalResources: [
              "CDC Guidance on Fever Management",
              "When to Seek Emergency Care for Fever",
              "COVID-19 vs. Flu Symptoms Comparison"
            ]
          };
        } else if (symptomText.includes("rash") || symptomText.includes("itch") || symptomText.includes("skin")) {
          response = {
            recommendation: "The skin symptoms you've described could have various causes ranging from allergic reactions to infections. Visual examination by a healthcare provider is important for accurate diagnosis.",
            urgencyLevel: "low" as const,
            possibleConditions: ["Contact dermatitis", "Allergic reaction", "Eczema", "Heat rash", "Fungal infection"],
            nextSteps: [
              "Avoid scratching the affected area",
              "Keep the area clean and dry",
              "Try over-the-counter antihistamines if itching is severe",
              "Apply cool compresses to reduce inflammation",
              "Schedule an appointment with a dermatologist or primary care provider"
            ],
            additionalResources: [
              "American Academy of Dermatology Rash Guidelines",
              "Home Remedies for Common Skin Conditions",
              "When to See a Doctor for Skin Issues"
            ]
          };
        } else if (symptomText.includes("headache") || symptomText.includes("migraine") || symptomText.includes("head pain")) {
          response = {
            recommendation: "Your description indicates a potentially serious headache condition, particularly if you're experiencing sensitivity to light and sound, nausea, or if this is the worst headache you've ever experienced.",
            urgencyLevel: "high" as const,
            possibleConditions: ["Migraine", "Tension headache", "Cluster headache", "Sinus infection", "More serious conditions requiring medical evaluation"],
            nextSteps: [
              "Rest in a quiet, dark room",
              "Apply cold or warm compresses to your head",
              "Take appropriate pain medication if suitable",
              "Seek immediate medical attention if experiencing 'worst headache of your life', confusion, or neurological changes",
              "Keep a headache diary to track triggers and patterns"
            ],
            additionalResources: [
              "American Migraine Foundation Resources",
              "Headache Red Flags Requiring Emergency Care",
              "Migraine Tracking Tools and Apps"
            ]
          };
        } else if (symptomText.includes("pregnant") || symptomText.includes("pregnancy") || symptomText.includes("maternity")) {
          response = {
            recommendation: "Based on your pregnancy-related concerns, it's important to monitor your symptoms carefully and maintain regular prenatal care. Many symptoms in pregnancy are normal, but some require prompt attention.",
            urgencyLevel: "medium" as const,
            possibleConditions: ["Normal pregnancy symptoms", "Pregnancy-related discomfort", "Potential complications requiring assessment"],
            nextSteps: [
              "Continue with scheduled prenatal appointments",
              "Stay well-hydrated and get adequate rest",
              "Track your symptoms and their frequency",
              "Contact your healthcare provider promptly if you experience severe pain, bleeding, reduced fetal movement, or high fever",
              "Follow nutritional guidelines recommended by your healthcare provider"
            ],
            additionalResources: [
              "American College of Obstetricians and Gynecologists Pregnancy Resources",
              "Signs of Pregnancy Complications",
              "Nutrition Guidelines for Pregnancy"
            ]
          };
        } else if (symptomText.includes("baby") || symptomText.includes("infant") || symptomText.includes("child")) {
          response = {
            recommendation: "Based on your description of your child's symptoms, this requires careful monitoring. Children can deteriorate quickly, so vigilance is important.",
            urgencyLevel: "medium" as const,
            possibleConditions: ["Common childhood illness", "Viral infection", "Ear infection", "Teething discomfort", "Potential for more serious conditions"],
            nextSteps: [
              "Monitor temperature, eating, drinking and activity levels",
              "Ensure adequate hydration and rest",
              "Use age-appropriate medication only as recommended by healthcare providers",
              "Watch for warning signs like difficulty breathing, dehydration, or excessive lethargy",
              "Consult with pediatrician if symptoms persist or worsen"
            ],
            additionalResources: [
              "American Academy of Pediatrics Symptom Guide",
              "When to Call the Doctor for Your Child",
              "Home Care for Common Childhood Illnesses"
            ]
          };
        } else {
          // Default response for other symptoms
          response = {
            recommendation: "Based on the symptoms you've described, I recommend a professional evaluation for a proper diagnosis. Your health concerns require personalized medical attention.",
            urgencyLevel: "medium" as const,
            possibleConditions: ["Multiple possibilities based on symptoms described"],
            nextSteps: [
              "Schedule an appointment with your primary care provider",
              "Document your symptoms including frequency, duration, and severity",
              "Note any factors that seem to worsen or improve your symptoms",
              "Consider telehealth options for faster initial assessment",
              "Seek emergency care if symptoms suddenly worsen"
            ],
            additionalResources: [
              "General Symptom Assessment Tools",
              "Finding the Right Medical Specialist",
              "Preparing for Your Doctor's Appointment"
            ]
          };
        }

        setAiResponse(response);
        setIsLoading(false);
      } catch (err) {
        setError("There was a problem analyzing your symptoms. Please try again.");
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Analysis Error",
          description: "There was a problem analyzing your symptoms. Please try again.",
        });
      }
    }, 3000);
  }, [userInput, toast]);

  const getUrgencyDisplay = () => {
    if (!aiResponse) return null;
    
    switch (aiResponse.urgencyLevel) {
      case "low":
        return {
          color: "bg-green-100 text-green-800",
          text: "Low urgency - Can be addressed in the coming days",
          icon: <BadgeCheck className="h-5 w-5" />
        };
      case "medium":
        return {
          color: "bg-yellow-100 text-yellow-800",
          text: "Medium urgency - Seek care soon",
          icon: <Info className="h-5 w-5" />
        };
      case "high":
        return {
          color: "bg-red-100 text-red-800",
          text: "High urgency - Seek care immediately",
          icon: <AlertCircle className="h-5 w-5" />
        };
      default:
        return {
          color: "bg-blue-100 text-blue-800",
          text: "Undefined urgency level",
          icon: <Info className="h-5 w-5" />
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <div className="text-center">
          <p className="font-medium mb-2">Analyzing your symptoms with Gemini AI</p>
          <p className="text-sm text-muted-foreground">Please wait while our advanced AI processes your health information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Analysis Error</h3>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={resetForm} variant="outline">Try Again</Button>
      </div>
    );
  }

  const urgency = getUrgencyDisplay();

  return (
    <div className="space-y-6">
      {/* AI Recommendation */}
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Gemini AI Analysis</h3>
        </div>
        <p className="text-lg">{aiResponse?.recommendation}</p>
      </div>

      {/* Urgency level */}
      {urgency && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${urgency.color}`}>
          {urgency.icon}
          <span className="font-medium">{urgency.text}</span>
        </div>
      )}

      {/* Possible conditions */}
      <div>
        <h3 className="font-medium text-lg mb-2">Possible Conditions</h3>
        <p className="text-sm text-muted-foreground mb-2">
          These are potential conditions based on the symptoms described, not a diagnosis:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {aiResponse?.possibleConditions.map((condition, index) => (
            <div 
              key={index} 
              className="bg-secondary/50 rounded p-2 text-sm border border-border"
            >
              {condition}
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div>
        <h3 className="font-medium text-lg mb-2">Recommended Next Steps</h3>
        <ul className="space-y-2">
          {aiResponse?.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional resources */}
      {aiResponse?.additionalResources && (
        <div>
          <h3 className="font-medium text-lg mb-2">Additional Resources</h3>
          <div className="bg-secondary/30 p-3 rounded-lg">
            <ul className="space-y-1">
              {aiResponse.additionalResources.map((resource, index) => (
                <li key={index} className="text-primary hover:underline cursor-pointer">
                  • {resource}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 flex flex-wrap gap-4">
        <ButtonLink to="/doctors" variant="default">
          Find a Specialist
        </ButtonLink>
        <ButtonLink to="/services" variant="outline">
          Explore Services
        </ButtonLink>
        <Button variant="outline" onClick={resetForm}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Check Different Symptoms
        </Button>
      </div>
    </div>
  );
};

export default GeminiResponse;
