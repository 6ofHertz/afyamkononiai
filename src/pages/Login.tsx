
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ButtonLink } from "@/components/ui/button-link";
import BackgroundSlideshow from "@/components/layout/BackgroundSlideshow";
import { loginImages } from "@/lib/slideshow-images";
import { useAuth } from "@/hooks/use-auth";

const Login = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("patient");
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPassword, setPatientPassword] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to appropriate dashboard
  if (user) {
    const userType = user.user_metadata?.user_type || "patient";
    if (userType === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  }

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: patientEmail,
        password: patientPassword,
      });
      
      if (error) throw error;

      toast({
        title: "Login Successful",
        description: "Welcome back to AfyaMkononi.",
      });
      
      // Redirect to patient dashboard
      navigate("/patient-dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDoctorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: doctorEmail,
        password: doctorPassword,
      });
      
      if (error) throw error;
      
      // Check if user is a doctor (in a production app, you would verify roles)
      toast({
        title: "Login Successful",
        description: "Welcome back, Doctor.",
      });
      
      // Redirect to doctor dashboard
      navigate("/doctor-dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BackgroundSlideshow images={loginImages}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md">
            <Tabs defaultValue="patient" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full mb-8">
                <TabsTrigger value="patient">Patient Login</TabsTrigger>
                <TabsTrigger value="doctor">Medical Professional</TabsTrigger>
              </TabsList>
              
              <TabsContent value="patient">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Login</CardTitle>
                    <CardDescription>
                      Access your health records, appointments, and consultations.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handlePatientLogin}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-email">Email</Label>
                        <Input 
                          id="patient-email" 
                          type="email" 
                          placeholder="name@example.com"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="patient-password">Password</Label>
                          <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input 
                          id="patient-password" 
                          type="password" 
                          value={patientPassword}
                          onChange={(e) => setPatientPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign in"}
                      </Button>
                      <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="text-primary hover:underline">
                          Sign up
                        </Link>
                      </div>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="doctor">
                <Card>
                  <CardHeader>
                    <CardTitle>Healthcare Provider Login</CardTitle>
                    <CardDescription>
                      Access your patient records, appointments, and consultation platform.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleDoctorLogin}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-email">Email</Label>
                        <Input 
                          id="doctor-email" 
                          type="email" 
                          placeholder="name@example.com"
                          value={doctorEmail}
                          onChange={(e) => setDoctorEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="doctor-password">Password</Label>
                          <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input 
                          id="doctor-password" 
                          type="password" 
                          value={doctorPassword}
                          onChange={(e) => setDoctorPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign in"}
                      </Button>
                      <div className="text-center text-sm">
                        Are you a new healthcare provider?{" "}
                        <Link to="/doctor-register" className="text-primary hover:underline">
                          Join our network
                        </Link>
                      </div>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Footer />
      </div>
    </BackgroundSlideshow>
  );
};

export default Login;
