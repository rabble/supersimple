import React, { useState } from 'react';

interface SchemaEditorStepProps {
  schema: any;
  onChange: (schema: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function SchemaEditorStep({ 
  schema, 
  onChange, 
  onNext, 
  onPrevious 
}: SchemaEditorStepProps) {
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [schemaText, setSchemaText] = useState(JSON.stringify(schema, null, 2));
  
  const handleSchemaChange = (text: string) => {
    setSchemaText(text);
    try {
      const parsedSchema = JSON.parse(text);
      onChange(parsedSchema);
      setJsonError(null);
    } catch (error) {
      setJsonError('Invalid JSON format');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Directory Schema</h2>
      <p className="text-gray-600 mb-4">
        Review and edit the generated schema below. This defines the structure of listings in your directory.
      </p>
      
      <div className="mb-4">
        <label htmlFor="schema" className="block text-sm font-medium text-gray-700 mb-1">
          Schema (JSON)
        </label>
        <textarea
          id="schema"
          value={schemaText}
          onChange={(e) => handleSchemaChange(e.target.value)}
          className={`w-full px-3 py-2 border ${
            jsonError ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm`}
          rows={15}
        />
        {jsonError && (
          <p className="mt-1 text-sm text-red-600">{jsonError}</p>
        )}
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
          onClick={onNext}
          disabled={!!jsonError}
          className={`px-4 py-2 rounded-md text-white ${
            !jsonError 
              ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
