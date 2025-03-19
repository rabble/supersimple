import React from 'react';

interface InterviewStepProps {
  formData: {
    interviewAnswers: {
      directoryType: string;
      exampleOrganizations: string;
      requiredFields: string;
      optionalFields: string;
    };
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

export default function InterviewStep({ 
  formData, 
  onChange, 
  onNext, 
  onPrevious,
  isLoading
}: InterviewStepProps) {
  // Validate the form
  const isValid = formData.interviewAnswers.directoryType.trim() !== '';
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      onNext();
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Directory Schema Interview</h2>
      <p className="text-gray-600 mb-4">
        Answer these questions to help us generate a schema for your directory.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="directoryType" className="block text-sm font-medium text-gray-700 mb-1">
            What type of entities will be listed in this directory? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="directoryType"
            value={formData.interviewAnswers.directoryType}
            onChange={(e) => onChange('directoryType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Companies, Restaurants, Schools"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="exampleOrganizations" className="block text-sm font-medium text-gray-700 mb-1">
            Can you provide some examples of entities that would be in this directory?
          </label>
          <textarea
            id="exampleOrganizations"
            value={formData.interviewAnswers.exampleOrganizations}
            onChange={(e) => onChange('exampleOrganizations', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Google, Apple, Microsoft"
            rows={2}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="requiredFields" className="block text-sm font-medium text-gray-700 mb-1">
            What information is required for each listing?
          </label>
          <textarea
            id="requiredFields"
            value={formData.interviewAnswers.requiredFields}
            onChange={(e) => onChange('requiredFields', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Name, Industry, Website"
            rows={3}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="optionalFields" className="block text-sm font-medium text-gray-700 mb-1">
            What optional information would you like to include?
          </label>
          <textarea
            id="optionalFields"
            value={formData.interviewAnswers.optionalFields}
            onChange={(e) => onChange('optionalFields', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Logo, Year Founded, Number of Employees"
            rows={3}
          />
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
            type="submit"
            disabled={!isValid || isLoading}
            className={`px-4 py-2 rounded-md text-white ${
              isValid && !isLoading
                ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Generating Schema...' : 'Generate Schema & Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
