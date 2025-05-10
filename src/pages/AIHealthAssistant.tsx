
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Send, User, Loader2, BrainCircuit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import BackgroundSlideshow from "@/components/layout/BackgroundSlideshow";
import { aiAssistantImages } from "@/lib/slideshow-images";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIHealthAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm your AfyaMkononi AI Health Assistant. How can I help you with maternal and child health questions today?" 
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const userMessage = inputMessage;
    setInputMessage("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      const response = await fetch("https://fbyfplidwrvyzompkcid.functions.supabase.co/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Add AI response to chat
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to get a response from the AI.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong while connecting to the AI service.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <BackgroundSlideshow images={aiAssistantImages}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <section className="py-12 bg-gradient-to-b from-background/80 to-accent/10 backdrop-blur-sm">
            <div className="container max-w-screen-xl px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="heading-2 mb-6">AI Health Assistant</h1>
                <p className="text-lg text-muted-foreground">
                  Get instant healthcare guidance for you and your family. Ask any questions about maternal and child health.
                  <span className="block mt-2 text-sm">
                    Note: This AI assistant is for informational purposes only and does not replace professional medical advice.
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
                      <BrainCircuit className="h-5 w-5 text-primary" />
                      AfyaMkononi AI Health Assistant
                    </CardTitle>
                    <CardDescription>
                      Ask any questions about maternal and child healthcare
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-4 mb-4">
                      <div className="flex flex-col space-y-4 max-h-[400px] overflow-y-auto p-2">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex items-start gap-3 ${
                              message.role === "assistant" ? "bg-secondary/40" : "bg-muted/40"
                            } p-3 rounded-lg`}
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 flex-shrink-0">
                              {message.role === "assistant" ? (
                                <Bot className="h-5 w-5 text-primary" />
                              ) : (
                                <User className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="text-sm">
                              <p>{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={sendMessage} className="flex flex-col space-y-3">
                        <div className="relative">
                          <Textarea
                            placeholder="Ask a health question..."
                            className="pr-12"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            disabled={isLoading}
                          />
                          <Button
                            type="submit"
                            size="icon"
                            className="absolute bottom-2 right-2"
                            disabled={isLoading || !inputMessage.trim()}
                          >
                            {isLoading ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <Send className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground text-center">
                          Get healthcare information for guidance purposes only.
                          Always consult with a qualified healthcare professional for medical advice.
                        </div>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </BackgroundSlideshow>
  );
};

export default AIHealthAssistant;
