import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserCog, Stethoscope, Users, Settings, Shield } from "lucide-react";
import { format } from "date-fns";

const DoctorAccountSection = () => {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    phone: profile?.phone || '',
  });

  const [preferences, setPreferences] = useState({
    patientReminders: true,
    appointmentAlerts: true,
    systemNotifications: false,
  });

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Sign Out Failed",
        description: error.message || "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  if (!user || !profile) {
    return <div className="p-4">Loading account information...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <UserCog className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Healthcare Provider Account</h1>
        <Badge variant="secondary" className="ml-2">
          {profile.user_role === 'doctor' ? 'Doctor' : 'Medical Professional'}
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Professional Information
              </CardTitle>
              <CardDescription>
                Manage your professional details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="Dr. John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Professional Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Employee ID</Label>
                  <Input
                    value={profile.employee_id || 'Not assigned'}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Account Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Email Address</Label>
                    <p className="font-medium">{user.email || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Joined</Label>
                    <p className="font-medium">{format(new Date(profile.created_at), 'PPP')}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <p className="font-medium">
                      {profile.is_active ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-600">Inactive</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Role</Label>
                    <p className="font-medium capitalize">{profile.user_role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateProfile} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Practice Overview
              </CardTitle>
              <CardDescription>
                Your practice statistics and patient management overview.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-medium text-sm text-muted-foreground">Active Patients</h4>
                      <p className="text-2xl font-bold">156</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-medium text-sm text-muted-foreground">This Month</h4>
                      <p className="text-2xl font-bold">89</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-medium text-sm text-muted-foreground">Consultations</h4>
                      <p className="text-2xl font-bold">234</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Patient consultation completed</span>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">New patient registered</span>
                      <span className="text-xs text-muted-foreground">4 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Prescription updated</span>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Practice Preferences
              </CardTitle>
              <CardDescription>
                Configure your practice settings and notification preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="patient-reminders">Patient Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send automatic reminders to patients about appointments
                  </p>
                </div>
                <Switch
                  id="patient-reminders"
                  checked={preferences.patientReminders}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, patientReminders: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment-alerts">Appointment Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts for upcoming appointments and schedule changes
                  </p>
                </div>
                <Switch
                  id="appointment-alerts"
                  checked={preferences.appointmentAlerts}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, appointmentAlerts: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-notifications">System Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive system updates and maintenance notifications
                  </p>
                </div>
                <Switch
                  id="system-notifications"
                  checked={preferences.systemNotifications}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, systemNotifications: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
              <CardDescription>
                Manage your account security settings and data privacy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Enhanced security for your professional account
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Update your password for better security
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Session Management</h4>
                    <p className="text-sm text-muted-foreground">
                      View and manage active sessions on your account
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button variant="destructive" onClick={handleSignOut}>
                Sign Out of Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorAccountSection;