
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Info, ArrowRight, BadgeCheck, RefreshCw, Heart, ShieldAlert, CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

interface AIResponseProps {
  aiResponse: {
    recommendation: string;
    urgencyLevel: "low" | "medium" | "high";
    possibleConditions: string[];
    nextSteps: string[];
    medicalAdvice?: string;
    preventiveMeasures?: string[];
    followUpRecommendations?: string;
  };
  resetForm: () => void;
}

const AIResponse = ({ aiResponse, resetForm }: AIResponseProps) => {
  const getUrgencyDisplay = () => {
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

  const urgency = getUrgencyDisplay();

  return (
    <div className="space-y-6">
      {/* AI Recommendation */}
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <p className="text-lg">{aiResponse.recommendation}</p>
      </div>

      {/* Urgency level */}
      <div className={`flex items-center gap-2 p-3 rounded-lg ${urgency.color}`}>
        {urgency.icon}
        <span className="font-medium">{urgency.text}</span>
      </div>

      {/* Possible conditions */}
      <div>
        <h3 className="font-medium text-lg mb-2">Possible Conditions</h3>
        <p className="text-sm text-muted-foreground mb-2">
          These are potential conditions based on the symptoms described, not a diagnosis:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {aiResponse.possibleConditions.map((condition, index) => (
            <div 
              key={index} 
              className="bg-secondary/50 rounded p-2 text-sm border border-border"
            >
              {condition}
            </div>
          ))}
        </div>
      </div>

      {/* Medical Advice */}
      {aiResponse.medicalAdvice && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg mb-2 text-blue-800">Medical Information</h3>
              <p className="text-sm text-blue-800">{aiResponse.medicalAdvice}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next steps */}
      <div>
        <h3 className="font-medium text-lg mb-2">Recommended Next Steps</h3>
        <ul className="space-y-2">
          {aiResponse.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Preventive Measures */}
      {aiResponse.preventiveMeasures && (
        <div>
          <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            Preventive Measures
          </h3>
          <ul className="space-y-2">
            {aiResponse.preventiveMeasures.map((measure, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5 flex-shrink-0">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                </div>
                <span>{measure}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Follow-up Recommendations */}
      {aiResponse.followUpRecommendations && (
        <div className="bg-secondary/50 p-4 rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <CalendarCheck className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Follow-up Recommendations</h3>
              <p className="text-sm">{aiResponse.followUpRecommendations}</p>
            </div>
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

export default AIResponse;
