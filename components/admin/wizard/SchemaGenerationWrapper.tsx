import React, { useState } from 'react';
import SchemaGenerationStatus from './SchemaGenerationStatus';

interface SchemaGenerationWrapperProps {
  onSchemaGenerated: (schema: any) => void;
  interviewAnswers: {
    directoryType: string;
    exampleOrganizations: string;
    requiredFields: string;
    optionalFields: string;
  };
}

const SchemaGenerationWrapper: React.FC<SchemaGenerationWrapperProps> = ({
  onSchemaGenerated,
  interviewAnswers
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mockMode, setMockMode] = useState(false);

  const generateSchema = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/llm/generateSchema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interviewAnswers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to generate schema');
      }

      // Check if we're in mock mode
      if (data.mockMode) {
        setMockMode(true);
      }

      onSchemaGenerated(data.schema);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the schema');
      console.error('Schema generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <SchemaGenerationStatus 
        isLoading={isLoading} 
        mockMode={mockMode} 
        error={error} 
      />
      
      <div className="flex justify-center">
        <button
          onClick={generateSchema}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Schema from Interview'}
        </button>
      </div>
    </div>
  );
};

export default SchemaGenerationWrapper;
