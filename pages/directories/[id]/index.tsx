import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../context/AuthContext';
import { formatDate } from '../../../utils/dateUtils';
import { useState } from 'react';

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
  listings: any[];
}

export default function DirectoryPage({ directory, error, listingsCount, listings }: DirectoryPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [focusAreaFilter, setFocusAreaFilter] = useState<string>('');
  const [engagementTypeFilter, setEngagementTypeFilter] = useState<string>('');
  
  if (error) {
    return (
      <Layout title="Directory Error" description="Error loading directory">
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error loading directory
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/directories" className="text-indigo-600 hover:text-indigo-500">
                ← Back to directories
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!directory) {
    return (
      <Layout title="Loading..." description="Loading directory details">
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={directory.name} 
      description={directory.description || `Browse the ${directory.name} directory`}
    >
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <div className="bg-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold">{directory.name}</h1>
                <p className="mt-2 text-indigo-100">{directory.description}</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <Link 
                  href="/directories" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50"
                >
                  All Directories
                </Link>
                <Link 
                  href={`/directories/${directory.id}/submit`}
                  className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md shadow-sm text-white hover:bg-indigo-600"
                >
                  Add Listing
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Search {directory.name}</h2>
              <p className="text-gray-600 mb-8">
                Use the search to find and share resources in this directory. Choose one or more preferences for each dropdown list to filter your search.
              </p>
              
              {/* Search Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Dynamic filters based on directory schema */}
                {directory.schema && directory.schema.properties && (
                  <>
                    {/* Location Filter - if present in schema */}
                    {directory.schema.properties.location && (
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          {directory.schema.properties.location.title || 'Location'}
                        </label>
                        <select
                          id="location"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                        >
                          <option value="">All {directory.schema.properties.location.title || 'Locations'}</option>
                          {listings
                            .map(listing => listing.data?.location)
                            .filter(Boolean)
                            .filter((value, index, self) => self.indexOf(value) === index) // Unique values
                            .map((location, idx) => (
                              <option key={idx} value={location}>{location}</option>
                            ))
                          }
                        </select>
                      </div>
                    )}
                    
                    {/* Focus Areas Filter - if present in schema */}
                    {directory.schema.properties.focusAreas && (
                      <div>
                        <label htmlFor="focusArea" className="block text-sm font-medium text-gray-700 mb-1">
                          {directory.schema.properties.focusAreas.title || 'Focus Areas'}
                        </label>
                        <select
                          id="focusArea"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={focusAreaFilter}
                          onChange={(e) => setFocusAreaFilter(e.target.value)}
                        >
                          <option value="">All {directory.schema.properties.focusAreas.title || 'Focus Areas'}</option>
                          {listings
                            .flatMap(listing => {
                              const areas = listing.data?.focusAreas;
                              if (!areas) return [];
                              return typeof areas === 'string' 
                                ? areas.split(',').map(a => a.trim()) 
                                : Array.isArray(areas) ? areas : [String(areas)];
                            })
                            .filter(Boolean)
                            .filter((value, index, self) => self.indexOf(value) === index) // Unique values
                            .map((area, idx) => (
                              <option key={idx} value={area}>{area}</option>
                            ))
                          }
                        </select>
                      </div>
                    )}
                    
                    {/* Engagement Types Filter - if present in schema */}
                    {directory.schema.properties.engagementTypes && (
                      <div>
                        <label htmlFor="engagementType" className="block text-sm font-medium text-gray-700 mb-1">
                          {directory.schema.properties.engagementTypes.title || 'Engagement Types'}
                        </label>
                        <select
                          id="engagementType"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          value={engagementTypeFilter}
                          onChange={(e) => setEngagementTypeFilter(e.target.value)}
                        >
                          <option value="">All {directory.schema.properties.engagementTypes.title || 'Engagement Types'}</option>
                          {listings
                            .flatMap(listing => {
                              const types = listing.data?.engagementTypes;
                              if (!types) return [];
                              return typeof types === 'string' 
                                ? types.split(',').map(t => t.trim()) 
                                : Array.isArray(types) ? types : [String(types)];
                            })
                            .filter(Boolean)
                            .filter((value, index, self) => self.indexOf(value) === index) // Unique values
                            .map((type, idx) => (
                              <option key={idx} value={type}>{type}</option>
                            ))
                          }
                        </select>
                      </div>
                    )}
                    
                    {/* Add fallback filters if schema doesn't have the expected properties */}
                    {!directory.schema.properties.location && 
                     !directory.schema.properties.focusAreas && 
                     !directory.schema.properties.engagementTypes && (
                      <>
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <select
                            id="location"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                          >
                            <option value="">All Locations</option>
                            <option value="national">National</option>
                            <option value="local">Local</option>
                            <option value="online">Online</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select
                            id="category"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={focusAreaFilter}
                            onChange={(e) => setFocusAreaFilter(e.target.value)}
                          >
                            <option value="">All Categories</option>
                            {/* Extract unique categories from listings */}
                            {listings
                              .map(listing => listing.data?.category)
                              .filter(Boolean)
                              .filter((value, index, self) => self.indexOf(value) === index)
                              .map((category, idx) => (
                                <option key={idx} value={category}>{category}</option>
                              ))
                            }
                          </select>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              
              {/* Listings */}
              <div className="space-y-8">
                {listings && listings.length > 0 ? (
                  listings
                    .filter(listing => {
                      // Apply filters
                      let matchesLocation = true;
                      let matchesFocusArea = true;
                      let matchesEngagementType = true;
                      
                      if (locationFilter) {
                        const listingLocation = listing.data?.location || '';
                        matchesLocation = typeof listingLocation === 'string' && 
                          listingLocation.toLowerCase().includes(locationFilter.toLowerCase());
                      }
                      
                      if (focusAreaFilter) {
                        const listingFocusAreas = listing.data?.focusAreas || '';
                        matchesFocusArea = typeof listingFocusAreas === 'string' && 
                          listingFocusAreas.toLowerCase().includes(focusAreaFilter.toLowerCase());
                      }
                      
                      if (engagementTypeFilter) {
                        const listingEngagementTypes = listing.data?.engagementTypes || '';
                        matchesEngagementType = typeof listingEngagementTypes === 'string' && 
                          listingEngagementTypes.toLowerCase().includes(engagementTypeFilter.toLowerCase());
                      }
                      
                      return matchesLocation && matchesFocusArea && matchesEngagementType;
                    })
                    .map((listing, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          <Link href={`/directories/${directory.id}/listings/${listing.id}`} className="hover:text-indigo-600">
                            {listing.data?.name || listing.data?.title || 'Unnamed Listing'}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {listing.data?.description || listing.data?.summary || 'No description available'}
                        </p>
                        
                        <div className="space-y-2">
                          {listing.data?.focusAreas && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700">Focus Areas:</h4>
                              <p className="text-sm text-gray-600">{listing.data.focusAreas}</p>
                            </div>
                          )}
                          
                          {listing.data?.engagementTypes && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700">Engagement Types:</h4>
                              <p className="text-sm text-gray-600">{listing.data.engagementTypes}</p>
                            </div>
                          )}
                          
                          {listing.data?.location && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700">Locations:</h4>
                              <p className="text-sm text-gray-600">{listing.data.location}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No listings found. Be the first to add a listing!</p>
                    <Link 
                      href={`/directories/${directory.id}/submit`}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Submit a Listing
                    </Link>
                  </div>
                )}
                
                {listings && listings.length > 0 && 
                 listings.filter(listing => {
                   // Apply filters for "no results" check
                   let matchesLocation = true;
                   let matchesFocusArea = true;
                   let matchesEngagementType = true;
                   
                   if (locationFilter) {
                     const listingLocation = listing.data?.location || '';
                     matchesLocation = typeof listingLocation === 'string' && 
                       listingLocation.toLowerCase().includes(locationFilter.toLowerCase());
                   }
                   
                   if (focusAreaFilter) {
                     const listingFocusAreas = listing.data?.focusAreas || '';
                     matchesFocusArea = typeof listingFocusAreas === 'string' && 
                       listingFocusAreas.toLowerCase().includes(focusAreaFilter.toLowerCase());
                   }
                   
                   if (engagementTypeFilter) {
                     const listingEngagementTypes = listing.data?.engagementTypes || '';
                     matchesEngagementType = typeof listingEngagementTypes === 'string' && 
                       listingEngagementTypes.toLowerCase().includes(engagementTypeFilter.toLowerCase());
                   }
                   
                   return matchesLocation && matchesFocusArea && matchesEngagementType;
                 }).length === 0 && (
                  <div className="text-center py-12 bg-white shadow-md rounded-lg">
                    <p className="text-gray-500">No listings match your filter criteria.</p>
                    <button 
                      onClick={() => {
                        setLocationFilter('');
                        setFocusAreaFilter('');
                        setEngagementTypeFilter('');
                      }}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Directory Info Section */}
          <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Directory Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Domain</h3>
                  <p className="mt-1 text-sm text-gray-900">{directory.domain || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Listings</h3>
                  <p className="mt-1 text-sm text-gray-900">{listingsCount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created</h3>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(directory.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Navigation */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Directory</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/directories/${directory.id}`} className="text-gray-600 hover:text-indigo-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href={`/directories/${directory.id}/listings`} className="text-gray-600 hover:text-indigo-600">
                    Browse Listings
                  </Link>
                </li>
                <li>
                  <Link href={`/directories/${directory.id}/submit`} className="text-gray-600 hover:text-indigo-600">
                    Add Listing
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-indigo-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-indigo-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-indigo-600">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-indigo-600">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-indigo-600">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} {directory.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  
  if (!id || typeof id !== 'string') {
    return {
      props: {
        directory: null,
        error: 'Invalid directory ID',
        listingsCount: 0,
        listings: [],
      },
    };
  }
  
  try {
    // Fetch the directory
    const { data: directory, error: directoryError } = await supabase
      .from('directories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (directoryError) {
      throw directoryError;
    }
    
    if (!directory) {
      return {
        props: {
          directory: null,
          error: 'Directory not found',
          listingsCount: 0,
          listings: [],
        },
      };
    }
    
    // Count the listings for this directory
    const { count, error: countError } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .eq('directory_id', id);
    
    if (countError) {
      console.error('Error counting listings:', countError);
    }
    
    // Fetch the actual listings for this directory
    const { data: listings, error: listingsError } = await supabase
      .from('listings')
      .select('*')
      .eq('directory_id', id)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (listingsError) {
      console.error('Error fetching listings:', listingsError);
    }
    
    return {
      props: {
        directory,
        listingsCount: count || 0,
        listings: listings || [],
      },
    };
  } catch (error: any) {
    console.error('Error fetching directory:', error);
    return {
      props: {
        directory: null,
        error: error.message || 'Failed to load directory',
        listingsCount: 0,
        listings: [],
      },
    };
  }
};
