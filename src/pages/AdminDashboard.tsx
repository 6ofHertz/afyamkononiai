import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import ResourceGrid from '@/components/dashboard/ResourceGrid'; // Import ResourceGrid component

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  user_role: string | null;
  created_at: string;
  // Add other profile fields you want to display
}

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  // Add other resource fields as needed
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
  const [newUserFormData, setNewUserFormData] = useState({ email: '', password: '', full_name: '', user_role: 'patient' });
  const [isCreating, setIsCreating] = useState(false);

  // Resource Management States
  const [resources, setResources] = useState<Resource[]>([]); // Keep resources state for potential use or refactoring
  const [loadingResources, setLoadingResources] = useState(true); // Keep loadingResources state
  const [resourceError, setResourceError] = useState<string | null>(null); // Keep resourceError state
  const [isCreatingResource, setIsCreatingResource] = useState(false);
  const [newResourceFormData, setNewResourceFormData] = useState({ title: '', description: '', category: '', url: '' });
  const [isSavingResource, setIsSavingResource] = useState(false);
  const [selectedResourceForEdit, setSelectedResourceForEdit] = useState<Resource | null>(null);
  const [isEditingResource, setIsEditingResource] = useState(false);
  const [editResourceFormData, setEditResourceFormData] = useState<Partial<Resource>>({});
  const [isSavingEditedResource, setIsSavingEditedResource] = useState(false);

  // --- User Management Effects and Handlers ---

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name');

      if (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching users:', error);
      } else {
        setUsers(data || []);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = async (userId: string) => {
    setSelectedUser(null);
    setLoadingUser(true);
    setUserError(null);
    setIsEditing(false);

    const { data, error } = await supabase
      .from('profiles')
      .select('*, auth_users(*)')
      .eq('id', userId)
      .single();

    if (error) {
      setUserError(error.message);
      setLoadingUser(false);
      console.error('Error fetching user details:', error);
    } else {
      const userProfile: UserProfile = {
        id: data.id,
        full_name: data.full_name,
        user_role: data.user_role,
        email: data.auth_users?.email || null,
        created_at: data.auth_users?.created_at || '',
        // Map other fields as needed
      };
      setSelectedUser(userProfile);
      setEditFormData({ full_name: userProfile.full_name, user_role: userProfile.user_role });
      setLoadingUser(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (selectedUser) {
      setEditFormData({ full_name: selectedUser.full_name, user_role: selectedUser.user_role });
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUserError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setEditFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSelectChange = (value: string, fieldId: string) => {
    setEditFormData(prevState => ({ ...prevState, [fieldId]: value }));
  };

  const handleSaveClick = async () => {
    if (!selectedUser) return;

    setIsSaving(true);
    setUserError(null);

    const { data, error } = await supabase
      .from('profiles')
      .update(editFormData)
      .eq('id', selectedUser.id);

    if (error) {
      setUserError(error.message);
      console.error('Error updating user profile:', error);
      toast({
        title: "Save failed",
        description: error.message || "An error occurred while saving.",
        variant: "destructive",
      });
    } else {
      setSelectedUser(prevState => ({
        ...prevState!,
        ...editFormData,
      }));
      setIsEditing(false);
      toast({
        title: "Save successful",
        description: "User profile updated.",
      });
    }

    setIsSaving(false);
  };

  const handleNewUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUserFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleNewUserSelectChange = (value: string) => {
    setNewUserFormData(prevState => ({ ...prevState, user_role: value }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setUserError(null);

    const { email, password, full_name, user_role } = newUserFormData;

    if (!email || !password || !full_name || !user_role) {
      setUserError("Please fill in all fields.");
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
          .insert({
            id: newUser.id,
            full_name: full_name,
            user_role: user_role,
          });

        if (profileError) throw profileError;

        toast({
          title: "User Created",
          description: `New user ${email} created successfully.`,
        });

        setNewUserFormData({ email: '', password: '', full_name: '', user_role: 'patient' });
        setIsCreatingUser(false);

        const { data: updatedUsers, error: fetchError } = await supabase
          .from('profiles')
          .select('id, full_name');

        if (fetchError) {
          console.error('Error fetching updated users:', fetchError);
        } else {
          setUsers(updatedUsers || []);
        }
      }
    } catch (error: any) {
      setUserError(error.message || "An error occurred during user creation.");
      console.error('User creation error:', error);
      toast({
        title: "User Creation Failed",
        description: error.message || "An error occurred during user creation.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    const isConfirmed = window.confirm(`Are you sure you want to delete user ${selectedUser.email}?`);

    if (isConfirmed) {
      setUserError(null);
      setLoadingUser(true);

      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', selectedUser.id);

        if (profileError) throw profileError;

        const { error: authError } = await supabase.auth.admin.deleteUser(selectedUser.id);

        if (authError) throw authError;

        toast({
          title: "User Deleted",
          description: `User ${selectedUser.email} deleted successfully.`,
        });

        setSelectedUser(null);

        const { data: updatedUsers, error: fetchError } = await supabase
          .from('profiles')
          .select('id, full_name');

        if (fetchError) {
          console.error('Error fetching updated users:', fetchError);
        } else {
          setUsers(updatedUsers || []);
        }
      } catch (error: any) {
        setUserError(error.message || "An error occurred during user deletion.");
        console.error('User deletion error:', error);
        toast({
          title: "User Deletion Failed",
          description: error.message || "An error occurred during user deletion.",
          variant: "destructive",
        });
      } finally {
        setLoadingUser(false);
      }
    }
  };

  // --- Resource Management Effects and Handlers ---

  // Keep these states and handlers in AdminDashboard for managing the modals
  const handleNewResourceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewResourceFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingResource(true);
    setResourceError(null);

    const { title, description, category, url } = newResourceFormData;

     if (!title || !description || !category || !url) {
      setResourceError("Please fill in all fields.");
      setIsSavingResource(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('resources')
        .insert([newResourceFormData])
        .single();

      if (error) throw error;

      toast({
        title: "Resource Created",
        description: `Resource "${title}" created successfully.`,
      });

      setNewResourceFormData({ title: '', description: '', category: '', url: '' });
      setIsCreatingResource(false);

      // No need to refetch resources here, ResourceGrid will handle its own fetching

    } catch (error: any) {
      setResourceError(error.message || "An error occurred during resource creation.");
      console.error('Resource creation error:', error);
      toast({
        title: "Resource Creation Failed",
        description: error.message || "An error occurred during resource creation.",
        variant: "destructive",
      });
    } finally {
      setIsSavingResource(false);
    }
  };

   const handleEditResourceClick = (resource: Resource) => {
    setSelectedResourceForEdit(resource);
    setEditResourceFormData({ // Initialize form data with selected resource
      title: resource.title,
      description: resource.description,
      category: resource.category,
      url: resource.url,
    });
    setIsEditingResource(true);
  };

  const handleEditResourceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditResourceFormData(prevState => ({ ...prevState, [id]: value }));
  };

   const handleSaveEditedResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResourceForEdit) return;

    setIsSavingEditedResource(true);
    setResourceError(null); // Clear previous save errors

    try {
      const { data, error } = await supabase
        .from('resources')
        .update(editResourceFormData)
        .eq('id', selectedResourceForEdit.id);

      if (error) throw error;

      toast({
        title: "Resource Updated",
        description: `Resource "${editResourceFormData.title}" updated successfully.`,
      });

      // Close modal and clear selected resource
      setIsEditingResource(false);
      setSelectedResourceForEdit(null);
      
      // No need to refetch resources here, ResourceGrid will handle its own fetching

    } catch (error: any) {
      setResourceError(error.message || "An error occurred while saving resource.");
      console.error('Error saving edited resource:', error);
       toast({
        title: "Save failed",
        description: error.message || "An error occurred while saving.",
        variant: "destructive",
      });
    } finally {
      setIsSavingEditedResource(false);
    }
   };

   const handleDeleteResourceClick = async (resource: Resource) => {
     const isConfirmed = window.confirm(`Are you sure you want to delete resource "${resource.title}"?`);

     if (isConfirmed) {
       setResourceError(null); // Clear previous errors

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

         // No need to refetch resources here, ResourceGrid will handle its own fetching

       } catch (error: any) {
         setResourceError(error.message || "An error occurred during resource deletion.");
         console.error('Error deleting resource:', error);
         toast({
           title: "Deletion Failed",
           description: error.message || "An error occurred during deletion.",
           variant: "destructive",
         });
       }
     }
   };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          {/* User Management Section */}
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <Dialog open={isCreatingUser} onOpenChange={setIsCreatingUser}>
            <DialogTrigger asChild>
              <Button className="mb-6">Create New User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUserFormData.email}
                    onChange={handleNewUserInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUserFormData.password}
                    onChange={handleNewUserInputChange}
                    required
                  />
                </div>
                 <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    value={newUserFormData.full_name}
                    onChange={handleNewUserInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="user_role">Role</Label>
                   <Select onValueChange={handleNewUserSelectChange} value={newUserFormData.user_role}>
                    <SelectTrigger id="user_role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">patient</SelectItem>
                      <SelectItem value="doctor">doctor</SelectItem>
                      <SelectItem value="admin">admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 {userError && <p className="text-red-500 mt-2">Error: {userError}</p>}
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create User'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {loading && <p>Loading users...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>

                {users.length === 0 ? (
                  <p>No users found.</p>
                ) : (
                  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Full Name</th>
                        {/* Add more table headers for other fields */}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleUserSelect(user.id)}
                        >
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.id}</td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.full_name}</td>
                          {/* Add more table cells for other fields */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {
                selectedUser && (
                  <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                    {loadingUser && <p>Loading user details...</p>}
                    {userError && <p className="text-red-500">Error: {userError}</p>}
                    {!loadingUser && !userError && selectedUser && (
                      <>
                        {!isEditing ? (
                          <div>
                            <p><strong>ID:</strong> {selectedUser.id}</p>
                            <p><strong>Full Name:</strong> {selectedUser.full_name}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Role:</strong> {selectedUser.user_role}</p>
                            <p><strong>Created At:</strong> {new Date(selectedUser.created_at).toLocaleString()}</p>
                            {/* Display more user details here */}
                            <div className="flex space-x-2 mt-4">
                              <Button onClick={handleEditClick}>Edit User</Button>
                               <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive">Delete User</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the user account and remove their data from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteUser}>Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ) : (
                          <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }} className="space-y-4">
                            <div>
                              <Label htmlFor="full_name">Full Name</Label>
                              <Input
                                id="full_name"
                                value={editFormData.full_name || ''}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="user_role">Role</Label>
                              <Select onValueChange={(value) => handleSelectChange(value, 'user_role')} value={editFormData.user_role || ''}>
                                <SelectTrigger id="user_role">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="patient">patient</SelectItem>
                                  <SelectItem value="doctor">doctor</SelectItem>
                                  <SelectItem value="admin">admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {/* Add more fields for editing */}
                            <div className="flex space-x-2">
                              <Button type="submit" disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save'}
                              </Button>
                              <Button type="button" variant="outline" onClick={handleCancelClick} disabled={isSaving}>Cancel</Button>
                            </div>
                             {userError && <p className="text-red-500 mt-2">Error: {userError}</p>}
                          </form>
                        )}
                      </>
                    )}
                  </div>
                )
              }
            </div>
          )}

          {/* Resource Management Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Resource Management</h2>

            {/* Create New Resource Button and Modal */}
            <Dialog open={isCreatingResource} onOpenChange={setIsCreatingResource}>
              <DialogTrigger asChild>
                <Button className="mb-6 mr-2">Create New Resource</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Resource</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateResource} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      value={newResourceFormData.title}
                      onChange={handleNewResourceInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                       type="text"
                      value={newResourceFormData.description}
                      onChange={handleNewResourceInputChange}
                      required
                    />
                  </div>
                   <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                       type="text"
                      value={newResourceFormData.category}
                      onChange={handleNewResourceInputChange}
                      required
                    />
                  </div>
                   <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                       type="url"
                      value={newResourceFormData.url}
                      onChange={handleNewResourceInputChange}
                      required
                    />
                  </div>
                   {resourceError && <p className="text-red-500 mt-2">Error: {resourceError}</p>}
                  <Button type="submit" disabled={isSavingResource}>
                    {isSavingResource ? 'Creating...' : 'Create Resource'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Replace resource table with ResourceGrid */}
             <ResourceGrid 
              isAdminView={true} 
              onEditResource={handleEditResourceClick} 
              onDeleteResource={handleDeleteResourceClick} 
            />

            {/* Edit Resource Modal (Keep this for now, we'll integrate it with ResourceGrid actions) */}
            <Dialog open={isEditingResource} onOpenChange={setIsEditingResource}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Resource</DialogTitle>
                </DialogHeader>
                 {selectedResourceForEdit && (
                  <form onSubmit={handleSaveEditedResource} className="space-y-4">
                     <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        value={editResourceFormData.title || ''}
                        onChange={handleEditResourceInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                         type="text"
                        value={editResourceFormData.description || ''}
                        onChange={handleEditResourceInputChange}
                        required
                      />
                    </div>
                     <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                         type="text"
                        value={editResourceFormData.category || ''}
                        onChange={handleEditResourceInputChange}
                        required
                      />
                    </div>
                     <div>
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                         type="url"
                        value={editResourceFormData.url || ''}
                        onChange={handleEditResourceInputChange}
                        required
                      />
                    </div>

                    {resourceError && <p className="text-red-500 mt-2">Error: {resourceError}</p>}
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsEditingResource(false)} disabled={isSavingEditedResource}>Cancel</Button>
                      <Button type="submit" disabled={isSavingEditedResource}>
                        {isSavingEditedResource ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                 )}
              </DialogContent>
            </Dialog>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
