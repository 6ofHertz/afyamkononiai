
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/use-auth";
import ResourceGrid from "@/components/dashboard/ResourceGrid";
import { BookOpen, FileText, Bell, Calendar } from "lucide-react";

const PatientDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading dashboard...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container max-w-screen-xl py-8 px-4">
        <div className="flex flex-col gap-8">
          <section>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.user_metadata?.first_name || "Patient"}</h1>
            <p className="text-muted-foreground">
              Welcome to your health dashboard. Here you can access resources and manage your health information.
            </p>
          </section>

          <Tabs defaultValue="resources" className="space-y-6">
            <TabsList>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="reminders" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Reminders
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Notes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Health Resources</CardTitle>
                  <CardDescription>
                    Browse through our curated collection of health resources and educational materials.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResourceGrid />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reminders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Reminders</CardTitle>
                  <CardDescription>
                    Track your medications, appointments, and other health reminders.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You don't have any reminders set up yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>
                    Manage your scheduled appointments with healthcare providers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You don't have any upcoming appointments.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Health Notes</CardTitle>
                  <CardDescription>
                    Keep track of your health journey and take notes during consultations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>You haven't created any notes yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
