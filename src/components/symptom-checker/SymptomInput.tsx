
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight } from "lucide-react";

interface SymptomInputProps {
  userInput: string;
  setUserInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SymptomInput = ({ userInput, setUserInput, handleSubmit, isLoading }: SymptomInputProps) => {
  // Examples to help users describe their symptoms
  const examplePrompts = [
    "I've had a fever of 38.5°C for the past two days, with a dry cough and fatigue.",
    "My 3-year-old has developed a rash on their arms that's itchy and slightly raised.",
    "I've been experiencing severe headaches, mostly on one side, with sensitivity to light.",
    "My baby (8 months) has been unusually fussy and pulling at their ear."
  ];

  const handleExampleClick = (example: string) => {
    setUserInput(example);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Textarea
          id="symptoms"
          placeholder="Describe your symptoms in detail... Include information like when they started, severity, and any other relevant details."
          className="min-h-32 resize-y"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="bg-secondary/50 p-4 rounded-lg border border-border">
        <div className="flex items-start gap-2">
          <HelpCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium mb-2">Not sure what to write? Try one of these examples:</p>
            <div className="space-y-2">
              {examplePrompts.map((example, index) => (
                <div 
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="text-sm text-primary hover:text-primary/80 cursor-pointer hover:underline"
                >
                  • {example}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          className="w-full" 
          disabled={!userInput.trim() || isLoading}
        >
          {isLoading ? (
            "Analyzing symptoms..."
          ) : (
            <>
              Analyze Symptoms <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SymptomInput;
