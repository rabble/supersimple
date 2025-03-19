import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { supabase } from '../../../../lib/supabaseClient';
import { formatDate, formatReadableDate } from '../../../../utils/dateUtils';

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

export default function ListingDetailPage() {
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
      
      // Fetch related listings
      const { data: relatedData, error: relatedError } = await supabase
        .from('listings')
        .select('*')
        .eq('directory_id', id)
        .neq('id', listingId)
        .eq('status', 'approved')
        .limit(10);
      
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
          <h1 className="text-2xl font-bold text-gray-900">Listing not found</h1>
          <p className="mt-2 text-gray-500">The listing you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <Link href={`/directories/${id}`} className="text-indigo-600 hover:text-indigo-500">
              Back to Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const listingTitle = listing.data?.name || listing.data?.title || 'Unnamed Listing';
  const listingCategory = listing.data?.category || listing.data?.type || '';
  const listingDescription = listing.data?.description || listing.data?.summary || '';
  const focusAreas = listing.data?.focusAreas || listing.data?.focus_areas || '';
  const engagementTypes = listing.data?.engagementTypes || listing.data?.engagement_types || '';
  const locations = listing.data?.location || listing.data?.locations || '';

  // Format focus areas and engagement types for display
  const formatAreas = (areas: any) => {
    if (!areas) return [];
    if (typeof areas === 'string') {
      return areas.split(',').map(a => a.trim()).filter(Boolean);
    }
    if (Array.isArray(areas)) {
      return areas;
    }
    return [String(areas)];
  };

  const formattedFocusAreas = formatAreas(focusAreas);
  const formattedEngagementTypes = formatAreas(engagementTypes);
  const formattedLocations = formatAreas(locations);

  return (
    <Layout 
      title={listingTitle} 
      description={listingDescription || `Details for a listing in ${directory.name}`}
      showHeader={true}
      directoryId={directory.id as string}
      directoryName={directory.name}
    >
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href={`/directories/${directory.id}/listings`} className="text-indigo-600 hover:text-indigo-500">
              ← Back to Organizations
            </Link>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listingTitle}</h1>
              
              {listingCategory && (
                <p className="text-gray-600 mb-4">{listingCategory}</p>
              )}
              
              {listingDescription && (
                <p className="text-gray-700 mb-6">{listingDescription}</p>
              )}
              
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Organization Details</h2>
              
              {formattedLocations.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700">Locations:</h3>
                  <div className="mt-2 flex flex-wrap">
                    {formattedLocations.map((loc, idx) => (
                      <span key={idx} className="location-tag">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {formattedFocusAreas.length > 0 && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
              <div className="px-6 py-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {directory.schema?.properties?.focusAreas?.title || 'Focus Areas'}
                </h2>
                <div className="flex flex-wrap">
                  {formattedFocusAreas.map((area, idx) => (
                    <span key={idx} className="focus-area-tag">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {formattedEngagementTypes.length > 0 && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
              <div className="px-6 py-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {directory.schema?.properties?.engagementTypes?.title || 'Engagement Types'}
                </h2>
                <div className="flex flex-wrap">
                  {formattedEngagementTypes.map((type, idx) => (
                    <span key={idx} className="engagement-type-tag">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Updates</h2>
              <p className="text-gray-600">No updates available at this time.</p>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reports and Articles</h2>
              <p className="text-gray-600">No reports available at this time.</p>
            </div>
          </div>
          
          {relatedListings.length > 0 && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {relatedListings.length} Related Organizations
                </h2>
                <ul className="space-y-2">
                  {relatedListings.map((related) => (
                    <li key={related.id}>
                      <Link 
                        href={`/directories/${directory.id}/listings/${related.id}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {related.data?.name || related.data?.title || 'Unnamed Organization'}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4">
                  <Link 
                    href={`/directories/${directory.id}/listings/${listing.id}/related`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    View all related organizations →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
