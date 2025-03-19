import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/dateUtils';

interface Directory {
  id: string;
  name: string;
  description: string;
  domain: string;
  schema: any;
  created_at: string;
}

interface DirectoryPageProps {
  directory: Directory | null;
  error?: string;
  listingsCount: number;
}

export default function DirectoryPage({ directory, error, listingsCount }: DirectoryPageProps) {
  const { user } = useAuth();
  const [showSchema, setShowSchema] = useState(false);

  if (!directory) {
    return (
      <Layout title="Directory Not Found" description="The requested directory could not be found">
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Directory Not Found</h1>
              <p className="mt-4 text-gray-500">
                {error || "The directory you're looking for doesn't exist or has been removed."}
              </p>
              <div className="mt-6">
                <Link href="/directories" className="text-indigo-600 hover:text-indigo-500">
                  Back to Directories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${directory.name} | Directory`} 
      description={directory.description || `Browse the ${directory.name} directory`}
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Directory Header */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{directory.name}</h1>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {directory.domain && `Domain: ${directory.domain}`}
                  </p>
                </div>
                <Link href="/directories" className="text-indigo-600 hover:text-indigo-500">
                  Back to Directories
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <p className="text-gray-700">{directory.description}</p>
              
              <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
                <Link 
                  href={`/directories/${directory.id}/listings`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-3 sm:mb-0"
                >
                  Browse {listingsCount} Listings
                </Link>
                
                {user && (
                  <Link 
                    href={`/directories/${directory.id}/submit`}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit a Listing
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Directory Details */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Directory Details
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Information about this directory and its structure.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {formatDate(directory.created_at)}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Listings</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {listingsCount}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Schema</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <button
                      onClick={() => setShowSchema(!showSchema)}
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      {showSchema ? 'Hide Schema' : 'Show Schema'}
                    </button>
                    
                    {showSchema && directory.schema && (
                      <div className="mt-3 bg-gray-100 p-3 rounded overflow-auto max-h-96">
                        <pre className="text-xs">
                          {JSON.stringify(directory.schema, null, 2)}
                        </pre>
                      </div>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const directoryId = params?.id as string;
  
  if (!directoryId) {
    return {
      props: {
        directory: null,
        error: 'Directory ID is required',
        listingsCount: 0
      }
    };
  }
  
  try {
    // Fetch directory
    const { data: directory, error: directoryError } = await supabase
      .from('directories')
      .select('*')
      .eq('id', directoryId)
      .single();
    
    if (directoryError) {
      throw directoryError;
    }
    
    // Count listings
    const { count, error: countError } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .eq('directory_id', directoryId);
    
    if (countError) {
      throw countError;
    }
    
    return {
      props: {
        directory,
        listingsCount: count || 0
      }
    };
  } catch (error: any) {
    console.error('Error fetching directory:', error);
    return {
      props: {
        directory: null,
        error: error.message || 'Failed to load directory',
        listingsCount: 0
      }
    };
  }
}
