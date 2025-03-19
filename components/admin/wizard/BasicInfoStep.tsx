import React from 'react';

interface BasicInfoStepProps {
  formData: {
    name: string;
    description: string;
    domain: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

export default function BasicInfoStep({ formData, onChange, onNext }: BasicInfoStepProps) {
  // Validate the form
  const isValid = formData.name.trim() !== '';
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext();
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Basic Directory Information</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            What is the name of your directory? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Tech Companies Directory"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Describe your directory
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., A directory of technology companies in the Bay Area"
            rows={3}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
            Domain or category
          </label>
          <input
            type="text"
            id="domain"
            value={formData.domain}
            onChange={(e) => onChange('domain', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Technology, Healthcare, Education"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isValid}
            className={`px-4 py-2 rounded-md text-white ${
              isValid 
                ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
