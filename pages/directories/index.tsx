import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { supabase } from '../../lib/supabaseClient';

interface Directory {
  id: string;
  name: string;
  description: string;
  domain: string;
  created_at: string;
}

interface DirectoriesPageProps {
  directories: Directory[];
  error?: string;
}

export default function DirectoriesPage({ directories, error }: DirectoriesPageProps) {
  const loading = false;

  return (
    <Layout title="Browse Directories" description="Browse all available directories">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Directories</h1>
              <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                Back to Home
              </Link>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Browse our collection of specialized directories
            </p>
          </div>
          
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error loading directories
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : directories && directories.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {directories.map((directory) => (
                <div 
                  key={directory.id} 
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {directory.name}
                    </h3>
                    <div className="mt-2 text-sm text-gray-500 line-clamp-3">
                      {directory.description}
                    </div>
                    <div className="mt-4">
                      <Link 
                        href={`/directories/${directory.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Browse listings →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white shadow rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">No directories available yet</h3>
              <p className="mt-2 text-sm text-gray-500">
                Check back soon for new directories!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data, error } = await supabase
      .from('directories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      // Check if the error is about the table not existing
      if (error.message.includes('does not exist')) {
        return {
          props: {
            directories: [],
            error: 'The directories database has not been set up yet. Please run the database setup script.',
          },
        };
      }
      throw error;
    }
    
    return {
      props: {
        directories: data || [],
      },
    };
  } catch (error: any) {
    console.error('Error fetching directories:', error);
    return {
      props: {
        directories: [],
        error: error.message || 'Failed to load directories',
      },
    };
  }
}
