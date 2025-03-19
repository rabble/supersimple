import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../lib/admin';
import { supabase } from '../lib/supabaseClient';
import { formatDate } from '../utils/dateUtils';

interface Directory {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [directories, setDirectories] = useState<Directory[]>([]);
  const [userDirectories, setUserDirectories] = useState<Directory[]>([]);

  useEffect(() => {
    // If no user is logged in, redirect to login page
    if (user === null) {
      router.push('/auth/login');
      return;
    }

    async function checkAdminStatus() {
      try {
        const adminStatus = await isAdmin(user as any);
        setIsUserAdmin(adminStatus);
        
        // Fetch directories based on user role
        if (adminStatus) {
          // Admin can see all directories
          const { data, error } = await supabase
            .from('directories')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          setDirectories(data || []);
        }
        
        // Fetch directories created by this user
        const { data: userDirs, error: userDirsError } = await supabase
          .from('directories')
          .select('*')
          .eq('created_by', user?.id || '')
          .order('created_at', { ascending: false });
        
        if (userDirsError) {
          console.warn('Error fetching user directories:', userDirsError);
          setUserDirectories([]);
        } else {
          setUserDirectories(userDirs || []);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsLoading(false);
      }
    }
    
    checkAdminStatus();
  }, [user, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/login');
  };

  if (isLoading || !user) {
    return (
      <Layout title="Dashboard">
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="flex min-h-screen flex-col p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex space-x-4">
            <Link 
              href="/directories/create"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Create New Directory
            </Link>
            <button
              onClick={handleSignOut}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <p className="mb-2">You are logged in as: <span className="font-medium">{user.email}</span></p>
          <p className="mb-2">User ID: <span className="font-mono text-sm">{user.id}</span></p>
          <p className="mb-2">Role: <span className="font-medium">{isUserAdmin ? 'Administrator' : 'User'}</span></p>
        </div>

        {/* User's Directories */}
        <div className="rounded-lg bg-white p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Directories</h2>
          {userDirectories.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {userDirectories.map((directory) => (
                <div key={directory.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{directory.name}</h3>
                      <p className="text-sm text-gray-500">{directory.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/directories/${directory.id}`}
                        className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/directories/${directory.id}/edit`}
                        className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">You haven't created any directories yet.</p>
              <Link
                href="/directories/create"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Create Your First Directory
              </Link>
            </div>
          )}
        </div>

        {/* Admin Section - All Directories */}
        {isUserAdmin && (
          <div className="rounded-lg bg-white p-6 shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">All Directories (Admin)</h2>
            {directories.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {directories.map((directory) => (
                  <div key={directory.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{directory.name}</h3>
                        <p className="text-sm text-gray-500">{directory.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/directories/${directory.id}`}
                          className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/directories/${directory.id}/edit`}
                          className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/admin/directories/${directory.id}/listings`}
                          className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                        >
                          Manage Listings
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No directories have been created yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Admin Links */}
        {isUserAdmin && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-lg font-medium mb-2">User Management</h3>
              <p className="text-sm text-gray-500 mb-4">
                Manage user accounts and permissions.
              </p>
              <Link
                href="/admin/users"
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
              >
                Manage Users
              </Link>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-lg font-medium mb-2">Directory Management</h3>
              <p className="text-sm text-gray-500 mb-4">
                Create and manage directories.
              </p>
              <Link
                href="/admin/directories"
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 mr-2"
              >
                Manage Directories
              </Link>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-lg font-medium mb-2">Pending Listings</h3>
              <p className="text-sm text-gray-500 mb-4">
                Review and approve/reject pending listings.
              </p>
              <Link
                href="/admin/pending-listings"
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
              >
                Review Listings
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
