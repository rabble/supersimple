import React, { useState } from 'react';
import AutofillStatus from './AutofillStatus';

interface AutofillWrapperProps {
  directoryId: string;
  onDataFetched: (data: any) => void;
}

const AutofillWrapper: React.FC<AutofillWrapperProps> = ({
  directoryId,
  onDataFetched
}) => {
  const [entityName, setEntityName] = useState('');
  const [entityUrl, setEntityUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mockMode, setMockMode] = useState(false);

  const fetchData = async () => {
    if (!entityName.trim()) {
      setError('Please enter an entity name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/llm/autofill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          directoryId,
          entityName: entityName.trim(),
          entityUrl: entityUrl.trim() || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch entity data');
      }

      // Check if we're in mock mode
      if (data.mockMode) {
        setMockMode(true);
      }

      onDataFetched(data.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data');
      console.error('Autofill error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="entityName" className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name
          </label>
          <input
            type="text"
            id="entityName"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Acme Corporation"
          />
        </div>
        <div>
          <label htmlFor="entityUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Website URL (optional)
          </label>
          <input
            type="text"
            id="entityUrl"
            value={entityUrl}
            onChange={(e) => setEntityUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., https://www.acme.com"
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={fetchData}
          disabled={isLoading || !entityName.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Fetching Data...' : 'Autofill with AI'}
        </button>
      </div>
      
      <AutofillStatus 
        isLoading={isLoading} 
        mockMode={mockMode} 
        error={error} 
      />
    </div>
  );
};

export default AutofillWrapper;
