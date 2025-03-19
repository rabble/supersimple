import React from 'react';

interface ReviewStepProps {
  formData: {
    name: string;
    description: string;
    domain: string;
    schema: any;
  };
  onSubmit: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export default function ReviewStep({ 
  formData, 
  onSubmit, 
  onPrevious,
  isLoading 
}: ReviewStepProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Review Directory</h2>
      <p className="text-gray-600 mb-6">
        Please review your directory details before creating it.
      </p>
      
      <div className="mb-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Directory Name</h3>
          <p className="mt-1">{formData.name}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1">{formData.description || 'None provided'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Domain/Category</h3>
          <p className="mt-1">{formData.domain || 'None provided'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500">Schema</h3>
          <pre className="mt-1 p-3 bg-gray-50 rounded-md overflow-auto text-xs">
            {JSON.stringify(formData.schema, null, 2)}
          </pre>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Previous
        </button>
        
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white ${
            !isLoading 
              ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Creating Directory...' : 'Create Directory'}
        </button>
      </div>
    </div>
  );
}
