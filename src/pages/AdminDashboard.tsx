import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceGrid from '@/components/dashboard/ResourceGrid';

interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  user_role: "patient" | "doctor" | "admin";
  created_at: string;
  is_active: boolean;
}

interface Resource {
  id: string;
  title: string;
  description?: string;
  category: string;
  url?: string;
  content?: string;
}

const AdminDashboard = () => {
  // User Management States
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UserProfile>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState({ 
    email: '', 
    password: '', 
    first_name: '', 
    last_name: '', 
    user_role: 'patient' as "patient" | "doctor" | "admin"
  });
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Resource Management States
  const [isCreatingResource, setIsCreatingResource] = useState(false);
  const [newResourceFormData, setNewResourceFormData] = useState({ title: '', description: '', category: '', url: '' });
  const [isSavingResource, setIsSavingResource] = useState(false);
  const [selectedResourceForEdit, setSelectedResourceForEdit] = useState<Resource | null>(null);
  const [isEditingResource, setIsEditingResource] = useState(false);
  const [editResourceFormData, setEditResourceFormData] = useState<Partial<Resource>>({});
  const [isSavingEditedResource, setIsSavingEditedResource] = useState(false);
  const [resourceError, setResourceError] = useState<string | null>(null);

  // Metrics States
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalResources: 0,
    activeUsers: 0
  });

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching users:', error);
      } else {
        const formattedUsers = data.map(profile => ({
          id: profile.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone,
          user_role: profile.user_role,
          created_at: profile.created_at,
          is_active: profile.is_active
        }));
        setUsers(formattedUsers);
        
        // Calculate metrics
        setMetrics({
          totalUsers: formattedUsers.length,
          totalDoctors: formattedUsers.filter(u => u.user_role === 'doctor').length,
          totalPatients: formattedUsers.filter(u => u.user_role === 'patient').length,
          totalResources: 0, // Will be updated by ResourceGrid
          activeUsers: formattedUsers.filter(u => u.is_active).length
        });
        
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setEditFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        user_role: user.user_role,
        is_active: user.is_active
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUserError(null);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setEditFormData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSaveClick = async () => {
    if (!selectedUser) return;

    setIsSaving(true);
    setUserError(null);

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: editFormData.first_name,
        last_name: editFormData.last_name,
        phone: editFormData.phone,
        user_role: editFormData.user_role,
        is_active: editFormData.is_active
      })
      .eq('id', selectedUser.id);

    if (error) {
      setUserError(error.message);
      console.error('Error updating user profile:', error);
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === selectedUser.id 
            ? { 
                ...user, 
                first_name: editFormData.first_name,
                last_name: editFormData.last_name,
                phone: editFormData.phone,
                user_role: editFormData.user_role as "patient" | "doctor" | "admin",
                is_active: editFormData.is_active ?? user.is_active
              }
            : user
        )
      );
      setSelectedUser(prev => prev ? { ...prev, ...editFormData } as UserProfile : null);
      setIsEditing(false);
      toast({
        title: "Save successful",
        description: "User profile updated.",
      });
    }

    setIsSaving(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setUserError(null);

    const { email, password, first_name, last_name, user_role } = newUserFormData;

    if (!email || !password || !first_name || !user_role) {
      setUserError("Please fill in required fields.");
      setIsCreating(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) throw authError;

      const newUser = authData.user;

      if (newUser) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: first_name,
            last_name: last_name,
            user_role: user_role,
          })
          .eq('id', newUser.id);

        if (profileError) throw profileError;

        toast({
          title: "User Created",
          description: `New user ${email} created successfully.`,
        });

        setNewUserFormData({ 
          email: '', 
          password: '', 
          first_name: '', 
          last_name: '', 
          user_role: 'patient' 
        });
        setIsCreatingUser(false);

        // Refresh users list
        const { data } = await supabase.from('profiles').select('*');
        if (data) {
          const formattedUsers = data.map(profile => ({
            id: profile.id,
            first_name: profile.first_name,
            last_name: profile.last_name,
            phone: profile.phone,
            user_role: profile.user_role,
            created_at: profile.created_at,
            is_active: profile.is_active
          }));
          setUsers(formattedUsers);
        }
      }
    } catch (error: any) {
      setUserError(error.message);
      toast({
        title: "User Creation Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleUserStatus = async (userId: string, newStatus: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: newStatus })
      .eq('id', userId);

    if (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, is_active: newStatus } : user
        )
      );
      toast({
        title: "User status updated",
        description: `User ${newStatus ? 'activated' : 'deactivated'} successfully.`,
      });
    }
  };

  // Resource Management Handlers
  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingResource(true);
    setResourceError(null);

    const { title, description, category, url } = newResourceFormData;

    if (!title || !description || !category) {
      setResourceError("Please fill in required fields.");
      setIsSavingResource(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('resources')
        .insert([{
          title,
          category,
          content: description,
          url: url || null
        }]);

      if (error) throw error;

      toast({
        title: "Resource Created",
        description: `Resource "${title}" created successfully.`,
      });

      setNewResourceFormData({ title: '', description: '', category: '', url: '' });
      setIsCreatingResource(false);

    } catch (error: any) {
      setResourceError(error.message);
      toast({
        title: "Resource Creation Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSavingResource(false);
    }
  };

  const handleEditResource = (resource: Resource) => {
    setSelectedResourceForEdit(resource);
    setEditResourceFormData({
      title: resource.title,
      description: resource.description || resource.content,
      category: resource.category,
      url: resource.url,
    });
    setIsEditingResource(true);
  };

  const handleDeleteResource = async (resource: Resource) => {
    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', resource.id);

      if (error) throw error;

      toast({
        title: "Resource Deleted",
        description: `Resource "${resource.title}" deleted successfully.`,
      });

    } catch (error: any) {
      toast({
        title: "Deletion Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesRole = roleFilter === "all" || user.user_role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.activeUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalDoctors}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalPatients}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalResources}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="resources">Resource Management</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              {/* User Management Section */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">User Management</h2>
                <Dialog open={isCreatingUser} onOpenChange={setIsCreatingUser}>
                  <DialogTrigger asChild>
                    <Button>Create New User</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New User</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateUser} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUserFormData.email}
                          onChange={(e) => setNewUserFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newUserFormData.password}
                          onChange={(e) => setNewUserFormData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="first_name">First Name *</Label>
                        <Input
                          id="first_name"
                          type="text"
                          value={newUserFormData.first_name}
                          onChange={(e) => setNewUserFormData(prev => ({ ...prev, first_name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          type="text"
                          value={newUserFormData.last_name}
                          onChange={(e) => setNewUserFormData(prev => ({ ...prev, last_name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="user_role">Role *</Label>
                        <Select 
                          onValueChange={(value) => setNewUserFormData(prev => ({ ...prev, user_role: value as "patient" | "doctor" | "admin" }))} 
                          value={newUserFormData.user_role}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {userError && <p className="text-red-500 text-sm">{userError}</p>}
                      <Button type="submit" disabled={isCreating} className="w-full">
                        {isCreating ? 'Creating...' : 'Create User'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="patient">Patients</SelectItem>
                    <SelectItem value="doctor">Doctors</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              {loading ? (
                <p>Loading users...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{`${user.first_name || ''} ${user.last_name || ''}`}</TableCell>
                          <TableCell>{user.phone || 'No contact'}</TableCell>
                          <TableCell>
                            <Badge variant={user.user_role === 'admin' ? 'default' : user.user_role === 'doctor' ? 'secondary' : 'outline'}>
                              {user.user_role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.is_active ? 'default' : 'destructive'}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUserSelect(user.id)}
                              >
                                View
                              </Button>
                              <Button
                                variant={user.is_active ? "destructive" : "default"}
                                size="sm"
                                onClick={() => handleToggleUserStatus(user.id, !user.is_active)}
                              >
                                {user.is_active ? 'Deactivate' : 'Activate'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* User Details Modal */}
              {selectedUser && (
                <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>User Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {isEditing ? (
                        <>
                          <div>
                            <Label htmlFor="edit_first_name">First Name</Label>
                            <Input
                              id="edit_first_name"
                              value={editFormData.first_name || ''}
                              onChange={(e) => handleInputChange('first_name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit_last_name">Last Name</Label>
                            <Input
                              id="edit_last_name"
                              value={editFormData.last_name || ''}
                              onChange={(e) => handleInputChange('last_name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit_phone">Phone</Label>
                            <Input
                              id="edit_phone"
                              value={editFormData.phone || ''}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit_role">Role</Label>
                            <Select 
                              value={editFormData.user_role} 
                              onValueChange={(value) => handleInputChange('user_role', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="patient">Patient</SelectItem>
                                <SelectItem value="doctor">Doctor</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSaveClick} disabled={isSaving}>
                              {isSaving ? 'Saving...' : 'Save'}
                            </Button>
                            <Button variant="outline" onClick={handleCancelClick}>
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label>Name</Label>
                            <p>{`${selectedUser.first_name || ''} ${selectedUser.last_name || ''}`}</p>
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <p>{selectedUser.phone || 'No contact info'}</p>
                          </div>
                          <div>
                            <Label>Role</Label>
                            <p>{selectedUser.user_role}</p>
                          </div>
                          <div>
                            <Label>Status</Label>
                            <p>{selectedUser.is_active ? 'Active' : 'Inactive'}</p>
                          </div>
                          <div>
                            <Label>Created</Label>
                            <p>{new Date(selectedUser.created_at).toLocaleDateString()}</p>
                          </div>
                          <Button onClick={handleEditClick}>Edit</Button>
                        </>
                      )}
                      {userError && <p className="text-red-500 text-sm">{userError}</p>}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              {/* Resource Management Section */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Resource Management</h2>
                <Dialog open={isCreatingResource} onOpenChange={setIsCreatingResource}>
                  <DialogTrigger asChild>
                    <Button>Create New Resource</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Resource</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateResource} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={newResourceFormData.title}
                          onChange={(e) => setNewResourceFormData(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <textarea
                          id="description"
                          className="w-full min-h-[100px] p-2 border rounded-md"
                          value={newResourceFormData.description}
                          onChange={(e) => setNewResourceFormData(prev => ({ ...prev, description: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Input
                          id="category"
                          value={newResourceFormData.category}
                          onChange={(e) => setNewResourceFormData(prev => ({ ...prev, category: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="url">URL (optional)</Label>
                        <Input
                          id="url"
                          type="url"
                          value={newResourceFormData.url}
                          onChange={(e) => setNewResourceFormData(prev => ({ ...prev, url: e.target.value }))}
                        />
                      </div>
                      {resourceError && <p className="text-red-500 text-sm">{resourceError}</p>}
                      <Button type="submit" disabled={isSavingResource} className="w-full">
                        {isSavingResource ? 'Creating...' : 'Create Resource'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <ResourceGrid 
                isAdminView={true}
                onEditResource={handleEditResource}
                onDeleteResource={handleDeleteResource}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;