import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  full_name: string | null;
  // Add other profile fields you want to display
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

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

  const handleUserSelect = (user: UserProfile) => {
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          {loading && <p>Loading users...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
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
                          onClick={() => handleUserSelect(user)}
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

              {selectedUser && (
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                  <div>
                    <p><strong>ID:</strong> {selectedUser.id}</p>
                    <p><strong>Full Name:</strong> {selectedUser.full_name}</p>
                    {/* Display more user details here */}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
