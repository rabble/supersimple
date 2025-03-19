import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { isAdmin } from '../../lib/admin';
import Layout from '../../components/Layout';

interface Listing {
  id: string;
  directory_id: string;
  data: any;
  status: string;
  created_at: string;
  directory_name?: string;
}

interface Directory {
  id: string;
  name: string;
}

export default function PendingListingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [pendingListings, setPendingListings] = useState<Listing[]>([]);
  const [directories, setDirectories] = useState<{[key: string]: string}>({});

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
          return;
        }
        
        fetchPendingListings();
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    }
    
    checkAdminStatus();
  }, [user, router]);

  async function fetchPendingListings() {
    try {
      // Fetch all directories first to get their names
      const { data: dirData, error: dirError } = await supabase
        .from('directories')
        .select('id, name');
      
      if (dirError) {
        throw dirError;
      }
      
      // Create a map of directory IDs to names
      const directoryMap = (dirData || []).reduce((acc: {[key: string]: string}, dir: Directory) => {
        acc[dir.id] = dir.name;
        return acc;
      }, {});
      
      setDirectories(directoryMap);
      
      // Fetch all pending listings
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Add directory name to each listing
      const listingsWithDirectoryNames = (data || []).map((listing: Listing) => ({
        ...listing,
        directory_name: directoryMap[listing.directory_id] || 'Unknown Directory'
      }));
      
      setPendingListings(listingsWithDirectoryNames);
    } catch (error) {
      console.error('Error fetching pending listings:', error);
    }
  }

  async function handleApprove(id: string) {
    try {
      const response = await fetch(`/api/listings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to approve listing');
      }
      
      // Update the local state
      setPendingListings(pendingListings.filter(listing => listing.id !== id));
    } catch (error) {
      console.error('Error approving listing:', error);
    }
  }

  async function handleReject(id: string) {
    try {
      const response = await fetch(`/api/listings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reject listing');
      }
      
      // Update the local state
      setPendingListings(pendingListings.filter(listing => listing.id !== id));
    } catch (error) {
      console.error('Error rejecting listing:', error);
    }
  }

  function renderListingData(data: any) {
    if (!data) return <p>No data available</p>;
    
    return (
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="grid grid-cols-3 gap-2">
            <span className="font-medium text-gray-700">{key}:</span>
            <span className="col-span-2">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return (
      <Layout title="Admin - Pending Listings">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Loading...</h1>
        </div>
      </Layout>
    );
  }

  if (!isUserAdmin) {
    return (
      <Layout title="Access Denied">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Access Denied</h1>
          <p>You do not have permission to view this page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin - Pending Listings">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Pending Listings</h1>
        
        {pendingListings.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6">
            <p>No pending listings found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingListings.map((listing) => (
              <div key={listing.id} className="bg-white shadow rounded-lg p-6">
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">
                    {listing.data?.name || listing.data?.title || 'Unnamed Listing'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Directory: {listing.directory_name} | 
                    Submitted: {new Date(listing.created_at).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="mb-6">
                  {renderListingData(listing.data)}
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApprove(listing.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(listing.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
