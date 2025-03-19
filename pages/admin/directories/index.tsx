import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { isAdmin } from '../../../lib/admin';
import { supabase } from '../../../lib/supabaseClient';

export default function DirectoriesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [directories, setDirectories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function checkAdminStatus() {
      if (!user) {
        router.push('/auth/login');
        return;
      }
      
      try {
        // Cast user to any to avoid type issues between different Supabase versions
        const adminStatus = await isAdmin(user as any);
        setIsUserAdmin(adminStatus);
        
        if (!adminStatus) {
          router.push('/dashboard');
        } else {
          // Fetch directories
          fetchDirectories();
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    }
    
    checkAdminStatus();
  }, [user, router]);
  
  async function fetchDirectories() {
    try {
      const { data, error } = await supabase
        .from('directories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setDirectories(data || []);
    } catch (error: any) {
      console.error('Error fetching directories:', error);
      setError(error.message || 'Failed to fetch directories');
    } finally {
      setLoading(false);
    }
  }
  
  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this directory?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('directories')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Refresh the list
      fetchDirectories();
    } catch (error: any) {
      console.error('Error deleting directory:', error);
      setError(error.message || 'Failed to delete directory');
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isUserAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Directories</h1>
        <Link href="/admin/create-directory">
          <a className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create New Directory
          </a>
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {directories.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">No directories found.</p>
          <p className="mt-2">
            <Link href="/admin/directories/create">
              <a className="text-blue-600 hover:underline">Create your first directory</a>
            </Link>
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fields
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {directories.map((directory) => (
                <tr key={directory.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{directory.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {directory.schema_json?.fields?.length || 0} fields
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(directory.created_at).toISOString().split('T')[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/directories/${directory.id}`}>
                      <a className="text-blue-600 hover:text-blue-900 mr-4">View</a>
                    </Link>
                    <button
                      onClick={() => handleDelete(directory.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
