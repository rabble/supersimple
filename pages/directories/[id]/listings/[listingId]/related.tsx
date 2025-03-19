import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../../components/Layout';
import { supabase } from '../../../../../lib/supabaseClient';
import { formatDate } from '../../../../../utils/dateUtils';

interface Directory {
  id: string;
  name: string;
  description: string;
  schema: any;
}

interface Listing {
  id: string;
  directory_id: string;
  data: any;
  status: string;
  created_at: string;
}

export default function RelatedOrganizationsPage() {
  const [directory, setDirectory] = useState<Directory | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [relatedListings, setRelatedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id, listingId } = router.query;

  useEffect(() => {
    if (id && listingId) {
      fetchData();
    }
  }, [id, listingId]);

  async function fetchData() {
    try {
      setLoading(true);
      
      // Fetch directory
      const { data: directoryData, error: directoryError } = await supabase
        .from('directories')
        .select('*')
        .eq('id', id)
        .single();
      
      if (directoryError) throw directoryError;
      
      // Fetch listing
      const { data: listingData, error: listingError } = await supabase
        .from('listings')
        .select('*')
        .eq('id', listingId)
        .eq('directory_id', id)
        .single();
      
      if (listingError) throw listingError;
      
      // Fetch all related listings
      const { data: relatedData, error: relatedError } = await supabase
        .from('listings')
        .select('*')
        .eq('directory_id', id)
        .neq('id', listingId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (relatedError) {
        console.error('Error fetching related listings:', relatedError);
      }
      
      setDirectory(directoryData);
      setListing(listingData);
      setRelatedListings(relatedData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!directory || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Organization not found</h1>
          <p className="mt-2 text-gray-500">The organization you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <Link href={`/directories/${id}`} className="text-indigo-600 hover:text-indigo-500">
              Back to Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const listingTitle = listing.data?.name || listing.data?.title || 'Unnamed Organization';

  return (
    <Layout 
      title={`Related Organizations | ${listingTitle}`} 
      description={`Organizations related to ${listingTitle} in the ${directory.name} directory`}
      showHeader={true}
      directoryId={directory.id as string}
      directoryName={directory.name}
    >
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href={`/directories/${directory.id}/listings/${listing.id}`} className="text-indigo-600 hover:text-indigo-500">
              ← Back to {listingTitle}
            </Link>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Organizations Related to {listingTitle}
              </h1>
              <p className="text-gray-600">
                Browse all organizations in the {directory.name} directory that may be related to {listingTitle}.
              </p>
            </div>
          </div>
          
          {/* Related Listings */}
          <div className="space-y-6">
            {relatedListings.length === 0 ? (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-gray-500">No related organizations found.</p>
              </div>
            ) : (
              relatedListings.map((related) => {
                const title = related.data?.name || related.data?.title || 'Unnamed Organization';
                const description = related.data?.description || related.data?.summary || '';
                const focusAreas = related.data?.focusAreas || related.data?.focus_areas || '';
                const engagementTypes = related.data?.engagementTypes || related.data?.engagement_types || '';
                const locations = related.data?.location || related.data?.locations || '';
                
                // Format for display
                const formatItems = (items: any) => {
                  if (!items) return [];
                  if (typeof items === 'string') {
                    return items.split(',').map(item => item.trim()).filter(Boolean);
                  }
                  if (Array.isArray(items)) {
                    return items;
                  }
                  return [String(items)];
                };
                
                const formattedFocusAreas = formatItems(focusAreas);
                const formattedEngagementTypes = formatItems(engagementTypes);
                const formattedLocations = formatItems(locations);
                
                return (
                  <div key={related.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link href={`/directories/${directory.id}/listings/${related.id}`} className="hover:text-indigo-600">
                          {title}
                        </Link>
                      </h2>
                      
                      {description && (
                        <p className="text-gray-600 mb-4">{description}</p>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formattedFocusAreas.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-1">
                              {directory.schema?.properties?.focusAreas?.title || 'Focus Areas'}:
                            </h3>
                            <div className="flex flex-wrap">
                              {formattedFocusAreas.slice(0, 3).map((area, idx) => (
                                <span key={idx} className="focus-area-tag">
                                  {area}
                                </span>
                              ))}
                              {formattedFocusAreas.length > 3 && (
                                <span className="text-xs text-gray-500">+{formattedFocusAreas.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {formattedEngagementTypes.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-1">
                              {directory.schema?.properties?.engagementTypes?.title || 'Engagement Types'}:
                            </h3>
                            <div className="flex flex-wrap">
                              {formattedEngagementTypes.slice(0, 3).map((type, idx) => (
                                <span key={idx} className="engagement-type-tag">
                                  {type}
                                </span>
                              ))}
                              {formattedEngagementTypes.length > 3 && (
                                <span className="text-xs text-gray-500">+{formattedEngagementTypes.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {formattedLocations.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-1">Locations:</h3>
                            <div className="flex flex-wrap">
                              {formattedLocations.slice(0, 3).map((loc, idx) => (
                                <span key={idx} className="location-tag">
                                  {loc}
                                </span>
                              ))}
                              {formattedLocations.length > 3 && (
                                <span className="text-xs text-gray-500">+{formattedLocations.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          {/* Back to Directory */}
          <div className="mt-8 text-center">
            <Link 
              href={`/directories/${directory.id}/listings`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to All Organizations
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
