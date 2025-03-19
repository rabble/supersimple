import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../context/AuthContext';

interface Directory {
  id: string;
  name: string;
  description: string;
  schema: any;
}

export default function SubmitListingPage() {
  const [directory, setDirectory] = useState<Directory | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [autofillName, setAutofillName] = useState('');
  const [isAutofilling, setIsAutofilling] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (id) {
      fetchDirectory();
    }
  }, [id, user, router]);

  async function fetchDirectory() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('directories')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setDirectory(data);
        
        // Initialize form data with empty values for each property
        if (data.schema && data.schema.properties) {
          const initialData: Record<string, string> = {};
          Object.keys(data.schema.properties).forEach(key => {
            initialData[key] = '';
          });
          setFormData(initialData);
        }
      }
    } catch (error: any) {
      console.error('Error fetching directory:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!directory || !user) {
      setError("You must be logged in to submit a listing");
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Validate required fields
      const requiredFields = directory.schema.required || [];
      for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
          throw new Error(`${directory.schema.properties[field].title || field} is required`);
        }
      }
      
      // Submit the listing using the API endpoint
      console.log('Submitting listing with data:', {
        directory_id: directory.id,
        data: formData,
        user: user?.id
      });
      
      // Get the current session token
      const { data: sessionData } = await supabase.auth.getSession();
      
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData?.session?.access_token || ''}`
        },
        body: JSON.stringify({
          directory_id: directory.id,
          data: formData
        }),
        credentials: 'include', // Important for sending cookies/session
      });
      
      const result = await response.json();
      console.log('API response:', response.status, result);
      console.log('Response details:', JSON.stringify(result, null, 2));
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit listing');
      }
      
      setSuccess(true);
      // Reset form
      const initialData: Record<string, string> = {};
      Object.keys(directory.schema.properties).forEach(key => {
        initialData[key] = '';
      });
      setFormData(initialData);
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push(`/directories/${directory.id}`);
      }, 2000);
      
    } catch (error: any) {
      console.error('Error submitting listing:', error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutofill = async () => {
    if (!autofillName.trim() || !directory) {
      setError('Please enter a name for autofill');
      return;
    }
    
    setIsAutofilling(true);
    setError(null);
    
    try {
      const response = await fetch('/api/llm/autofillListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          directoryId: directory.id,
          entityName: autofillName
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to autofill data');
      }
      
      const { data } = await response.json();
      setFormData(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during autofill');
      console.error('Autofill error:', err);
    } finally {
      setIsAutofilling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

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
      title={`Submit Listing | ${directory.name}`} 
      description={`Submit a new listing to the ${directory.name} directory`}
    >
      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Submit a Listing</h1>
              <Link href={`/directories/${directory.id}`} className="text-indigo-600 hover:text-indigo-500">
                Back to Directory
              </Link>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Add your listing to the {directory.name} directory
            </p>
          </div>
          
          {/* Autofill section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-md font-medium mb-2">Autofill with AI</h3>
            <p className="text-sm text-gray-600 mb-3">
              Enter the name of the entity and we'll use AI to fill in the details for you.
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={autofillName}
                onChange={(e) => setAutofillName(e.target.value)}
                placeholder="Enter entity name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAutofill}
                disabled={isAutofilling}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isAutofilling ? 'Autofilling...' : 'Autofill'}
              </button>
            </div>
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="rounded-md bg-green-50 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Success!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your listing has been submitted successfully and is pending approval. Redirecting...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit}>
                {directory.schema && directory.schema.properties && (
                  <div className="space-y-6">
                    {Object.keys(directory.schema.properties).map(field => {
                      const property = directory.schema.properties[field];
                      const isRequired = directory.schema.required?.includes(field);
                      
                      return (
                        <div key={field}>
                          <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                            {property.title || field}
                            {isRequired && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {property.type === 'string' && property.format === 'textarea' ? (
                            <textarea
                              id={field}
                              name={field}
                              rows={3}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={formData[field] || ''}
                              onChange={(e) => handleChange(field, e.target.value)}
                              required={isRequired}
                            />
                          ) : (
                            <input
                              type="text"
                              id={field}
                              name={field}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={formData[field] || ''}
                              onChange={(e) => handleChange(field, e.target.value)}
                              required={isRequired}
                            />
                          )}
                          {property.description && (
                            <p className="mt-1 text-sm text-gray-500">{property.description}</p>
                          )}
                        </div>
                      );
                    })}
                    
                    <div className="pt-5">
                      <div className="flex justify-end">
                        <Link
                          href={`/directories/${directory.id}`}
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Cancel
                        </Link>
                        <button
                          type="submit"
                          disabled={submitting}
                          className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                            submitting ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
