import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { supabase } from '../../../../lib/supabaseClient';
import { formatDate, formatReadableDate } from '../../../../utils/dateUtils';

// Types
interface Directory {
  id: string;
  name: string;
  description: string;
  schema: {
    properties: Record<string, any>;
  };
}

interface Listing {
  id: string;
  directory_id: string;
  data: Record<string, any>;
  status: string;
  created_at: string;
}

interface FilterState {
  location: string;
  focusArea: string;
  engagementType: string;
  additionalFilters: Record<string, string>;
}

const ListingsIndexPage: React.FC = () => {
  const router = useRouter();
  const { id, location, focusArea, engagementType } = router.query;
  
  // State
  const [directory, setDirectory] = useState<Directory | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [filters, setFilters] = useState<FilterState>({
    location: (location as string) || '',
    focusArea: (focusArea as string) || '',
    engagementType: (engagementType as string) || '',
    additionalFilters: {}
  });
  
  // Update URL when filters change
  useEffect(() => {
    if (!id) return;
    
    // Build query parameters
    const queryParams: Record<string, string> = {};
    if (filters.location) queryParams.location = filters.location;
    if (filters.focusArea) queryParams.focusArea = filters.focusArea;
    if (filters.engagementType) queryParams.engagementType = filters.engagementType;
    
    // Update URL without refreshing the page
    router.push(
      {
        pathname: `/directories/${id}/listings`,
        query: Object.keys(queryParams).length > 0 ? queryParams : {}
      },
      undefined,
      { shallow: true }
    );
    
    fetchData();
  }, [id, filters]);

  // Data fetching
  const fetchData = async (filterValue = '', filterField = '') => {
    try {
      setLoading(true);
      
      // Fetch directory
      const { data: directoryData, error: directoryError } = await supabase
        .from('directories')
        .select('*')
        .eq('id', id)
        .single();
      
      if (directoryError) throw directoryError;
      
      // Fetch listings
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .eq('directory_id', id)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (listingsError) throw listingsError;
      
      setDirectory(directoryData);
      setListings(listingsData || []);
      
      // Update additional filters if needed
      if (filterField && filterValue && !['location', 'focusAreas', 'engagementTypes'].includes(filterField)) {
        setFilters(prev => ({
          ...prev,
          additionalFilters: {
            ...prev.additionalFilters,
            [filterField]: filterValue
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getUniqueValues = (field: string): string[] => {
    const allValues = listings
      .map(listing => {
        const value = listing.data?.[field];
        if (!value) return [];
        
        if (typeof value === 'string') {
          return value.split(',').map(v => v.trim()).filter(Boolean);
        }
        
        if (Array.isArray(value)) {
          return value;
        }
        
        return [String(value)];
      })
      .flat();
    
    // Create a sorted array of unique values
    return Array.from(new Set(allValues)).sort((a, b) => a.localeCompare(b));
  };
  
  // Format items for display
  const formatItems = (items: any): string[] => {
    if (!items) return [];
    if (typeof items === 'string') {
      return items.split(',').map(item => item.trim()).filter(Boolean);
    }
    if (Array.isArray(items)) {
      return items;
    }
    return [String(items)];
  };
  
  // Filter listings based on current filters
  const filterListings = (listing: Listing): boolean => {
    let matchesLocation = true;
    let matchesFocusArea = true;
    let matchesEngagementType = true;
    let matchesAdditionalFilters = true;
    
    if (filters.location) {
      const listingLocation = listing.data?.location || '';
      matchesLocation = typeof listingLocation === 'string' && 
        listingLocation.toLowerCase().includes(filters.location.toLowerCase());
    }
    
    if (filters.focusArea) {
      const listingFocusAreas = listing.data?.focusAreas || '';
      matchesFocusArea = typeof listingFocusAreas === 'string' && 
        listingFocusAreas.toLowerCase().includes(filters.focusArea.toLowerCase());
    }
    
    if (filters.engagementType) {
      const listingEngagementTypes = listing.data?.engagementTypes || '';
      matchesEngagementType = typeof listingEngagementTypes === 'string' && 
        listingEngagementTypes.toLowerCase().includes(filters.engagementType.toLowerCase());
    }
    
    // Apply additional filters
    if (Object.keys(filters.additionalFilters).length > 0) {
      matchesAdditionalFilters = Object.entries(filters.additionalFilters).every(([field, value]) => {
        const listingValue = listing.data?.[field] || '';
        return typeof listingValue === 'string' && 
          listingValue.toLowerCase().includes(value.toLowerCase());
      });
    }
    
    return matchesLocation && matchesFocusArea && matchesEngagementType && matchesAdditionalFilters;
  };
  
  // Update a specific filter
  const updateFilter = (type: keyof Omit<FilterState, 'additionalFilters'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }));
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      location: '',
      focusArea: '',
      engagementType: '',
      additionalFilters: {}
    });
    
    // Clear URL query params
    router.push({
      pathname: router.pathname,
      query: { id }
    }, undefined, { shallow: true });
  };
  
  // CSS classes for tags
  const tagClasses = {
    focusArea: "px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200 mr-1 mb-1",
    engagementType: "px-2 py-1 text-xs rounded-full bg-green-50 text-green-700 border border-green-200 mr-1 mb-1",
    location: "px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-700 border border-purple-200 mr-1 mb-1"
  };
  
  // Get filtered data for rendering
  const locations = getUniqueValues('location');
  const focusAreas = getUniqueValues('focusAreas');
  const engagementTypes = getUniqueValues('engagementTypes');
  const filteredListings = listings.filter(filterListings);
  
  // Loading and error states
  if (loading && !directory) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!directory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Directory not found</h1>
          <p className="mt-2 text-gray-500">The directory you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <Link href="/directories" className="text-indigo-600 hover:text-indigo-500">
              Back to Directories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Component rendering functions
  const renderFilterDropdown = (
    id: string,
    label: string,
    options: string[],
    value: string,
    onChange: (value: string) => void
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All {label}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
  
  const renderFilterTag = (
    value: string,
    currentFilter: string,
    tagClass: string,
    onClick: () => void
  ) => (
    <button
      className={`${tagClass} hover:bg-indigo-100 cursor-pointer transition-colors ${
        currentFilter === value 
          ? 'bg-blue-100 text-blue-800 border-blue-400 font-medium' 
          : ''
      }`}
      onClick={onClick}
      title={`Filter by: ${value}`}
    >
      {value}
    </button>
  );
  
  const renderListingCard = (listing: Listing) => {
    const title = listing.data?.name || listing.data?.title || 'Unnamed Organization';
    const description = listing.data?.description || listing.data?.summary || '';
    const listingFocusAreas = listing.data?.focusAreas || listing.data?.focus_areas || '';
    const listingEngagementTypes = listing.data?.engagementTypes || listing.data?.engagement_types || '';
    const listingLocations = listing.data?.location || listing.data?.locations || '';
    
    const formattedFocusAreas = formatItems(listingFocusAreas);
    const formattedEngagementTypes = formatItems(listingEngagementTypes);
    const formattedLocations = formatItems(listingLocations);
    
    return (
      <div key={listing.id} className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            <Link href={`/directories/${directory!.id}/listings/${listing.id}`} className="hover:text-indigo-600">
              {title}
            </Link>
          </h2>
          
          {description && (
            <p className="text-gray-600 mb-4">{description}</p>
          )}
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Focus Areas */}
              {formattedFocusAreas.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Focus Areas:
                    </h3>
                    <div className="flex flex-wrap gap-1 flex-1">
                      {formattedFocusAreas.map((area, idx) => (
                        renderFilterTag(
                          area, 
                          filters.focusArea,
                          tagClasses.focusArea,
                          () => updateFilter('focusArea', area)
                        )
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Engagement Types */}
              {formattedEngagementTypes.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Engagement Types:
                    </h3>
                    <div className="flex flex-wrap gap-1 flex-1">
                      {formattedEngagementTypes.map((type, idx) => (
                        renderFilterTag(
                          type,
                          filters.engagementType,
                          tagClasses.engagementType,
                          () => updateFilter('engagementType', type)
                        )
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Locations */}
              {formattedLocations.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Locations:
                    </h3>
                    <div className="flex flex-wrap gap-1 flex-1">
                      {formattedLocations.map((loc, idx) => (
                        renderFilterTag(
                          loc,
                          filters.location,
                          tagClasses.location,
                          () => updateFilter('location', loc)
                        )
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <Layout
      title={`Organizations | ${directory.name}`}
      description={`Browse organizations in the ${directory.name} directory`}
      showHeader={true}
      directoryId={directory.id as string}
      directoryName={directory.name}
    >
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Organizations</h1>
            <p className="text-gray-600">
              Use the search to find and share resources and skills in your area or online. 
              Choose one or more preferences for each drop down list to filter your search.
            </p>
          </div>
          
          {/* Search Filters */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filter Organizations</h2>
                {(filters.location || filters.focusArea || filters.engagementType) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear All Filters
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Dynamic filters based on directory schema */}
                {directory.schema && directory.schema.properties ? (
                  <>
                    {/* Location Filter - if present in schema */}
                    {directory.schema.properties.location && (
                      renderFilterDropdown(
                        "location",
                        directory.schema.properties.location.title || 'Location',
                        locations,
                        filters.location,
                        (value) => updateFilter('location', value)
                      )
                    )}
                    
                    {/* Focus Areas Filter - if present in schema */}
                    {directory.schema.properties.focusAreas && (
                      renderFilterDropdown(
                        "focusArea",
                        directory.schema.properties.focusAreas.title || 'Focus Areas',
                        focusAreas,
                        filters.focusArea,
                        (value) => updateFilter('focusArea', value)
                      )
                    )}
                    
                    {/* Engagement Types Filter - if present in schema */}
                    {directory.schema.properties.engagementTypes && (
                      renderFilterDropdown(
                        "engagementType",
                        directory.schema.properties.engagementTypes.title || 'Engagement Types',
                        engagementTypes,
                        filters.engagementType,
                        (value) => updateFilter('engagementType', value)
                      )
                    )}
                    
                    {/* Add custom filters for any other schema properties */}
                    {Object.entries(directory.schema.properties)
                      .filter(([key]) => !['location', 'focusAreas', 'engagementTypes', 'name', 'description', 'title', 'summary'].includes(key))
                      .slice(0, 3) // Limit to 3 additional filters
                      .map(([key, prop]: [string, any]) => {
                        // Get unique values for this property
                        const values = listings
                          .map(listing => listing.data?.[key])
                          .filter(Boolean)
                          .filter((value, index, self) => 
                            typeof value === 'string' && self.indexOf(value) === index
                          )
                          .sort((a, b) => a.localeCompare(b));
                        
                        if (values.length > 0) {
                          return (
                            <div key={key}>
                              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                                {prop.title || key}
                              </label>
                              <select
                                id={key}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={filters.additionalFilters[key] || ''}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value) {
                                    fetchData(value, key);
                                  } else {
                                    // Clear this filter
                                    setFilters(prev => {
                                      const newFilters = {...prev};
                                      const newAdditionalFilters = {...prev.additionalFilters};
                                      delete newAdditionalFilters[key];
                                      newFilters.additionalFilters = newAdditionalFilters;
                                      return newFilters;
                                    });
                                  }
                                }}
                              >
                                <option value="">All {prop.title || key}</option>
                                {values.map((val, idx) => (
                                  <option key={idx} value={val}>{val}</option>
                                ))}
                              </select>
                            </div>
                          );
                        }
                        return null;
                      })
                    }
                  </>
                ) : (
                  <>
                    {/* Fallback filters if no schema is defined */}
                    {renderFilterDropdown(
                      "location",
                      "Location",
                      locations,
                      filters.location,
                      (value) => updateFilter('location', value)
                    )}
                    
                    {renderFilterDropdown(
                      "focusArea",
                      "Focus Areas",
                      focusAreas,
                      filters.focusArea,
                      (value) => updateFilter('focusArea', value)
                    )}
                    
                    {renderFilterDropdown(
                      "engagementType",
                      "Engagement Types",
                      engagementTypes,
                      filters.engagementType,
                      (value) => updateFilter('engagementType', value)
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Listings */}
          <div className="space-y-8">
            {loading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            )}
            
            {!loading && listings.length === 0 && (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-4">No organizations found matching your criteria.</p>
                <Link 
                  href={`/directories/${directory.id}/submit`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add an Organization
                </Link>
              </div>
            )}
            
            {/* Render filtered listings */}
            {!loading && filteredListings.map(listing => renderListingCard(listing))}
            
            {/* No results message */}
            {!loading && listings.length > 0 && filteredListings.length === 0 && (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-4">No organizations found matching your filter criteria.</p>
                <button 
                  onClick={clearAllFilters}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          
          {/* Add Listing CTA */}
          <div className="mt-12 text-center">
            <Link 
              href={`/directories/${directory.id}/submit`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add Your Organization
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListingsIndexPage;
