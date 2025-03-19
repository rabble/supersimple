import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import BasicInfoStep from './wizard/BasicInfoStep';
import InterviewStep from './wizard/InterviewStep';
import SchemaEditorStep from './wizard/SchemaEditorStep';
import ReviewStep from './wizard/ReviewStep';

// Wizard steps
enum WizardStep {
  BASIC_INFO = 0,
  INTERVIEW = 1,
  SCHEMA_EDITOR = 2,
  REVIEW = 3
}

export default function DirectoryWizard() {
  const { user } = useAuth();
  const router = useRouter();
  
  // State for the current step
  const [currentStep, setCurrentStep] = useState<WizardStep>(WizardStep.BASIC_INFO);
  
  // State for the form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    domain: '',
    interviewAnswers: {
      directoryType: '',
      exampleOrganizations: '',
      requiredFields: '',
      optionalFields: ''
    },
    schema: null
  });
  
  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle form data changes
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle interview answers changes
  const handleInterviewChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      interviewAnswers: {
        ...prev.interviewAnswers,
        [field]: value
      }
    }));
  };
  
  // Handle schema changes
  const handleSchemaChange = (schema: any) => {
    setFormData(prev => ({
      ...prev,
      schema
    }));
  };
  
  // Generate schema from LLM
  const generateSchema = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/llm/schemaGeneration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          domain: formData.domain,
          interviewAnswers: formData.interviewAnswers
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate schema');
      }
      
      const data = await response.json();
      handleSchemaChange(data.schema);
      
      // Move to the next step
      setCurrentStep(WizardStep.SCHEMA_EDITOR);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the schema');
      console.error('Schema generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Save the directory
  const saveDirectory = async () => {
    if (!user) {
      setError('You must be logged in to create a directory');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Save to Supabase directly
      const { data, error: saveError } = await supabase
        .from('directories')
        .insert({
          name: formData.name,
          description: formData.description,
          domain: formData.domain,
          schema: formData.schema,
          created_by: user.id
        })
        .select()
        .single();
      
      if (saveError) {
        throw new Error(saveError.message || 'Failed to save directory');
      }
      
      // Redirect to the directory page
      router.push(`/directories/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the directory');
      console.error('Directory save error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle next step
  const handleNext = () => {
    if (currentStep === WizardStep.INTERVIEW) {
      // Generate schema before moving to the next step
      generateSchema();
    } else if (currentStep === WizardStep.REVIEW) {
      // Save the directory
      saveDirectory();
    } else {
      // Just move to the next step
      setCurrentStep(prev => prev + 1);
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case WizardStep.BASIC_INFO:
        return (
          <BasicInfoStep
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
          />
        );
      case WizardStep.INTERVIEW:
        return (
          <InterviewStep
            formData={formData}
            onChange={handleInterviewChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLoading={isLoading}
          />
        );
      case WizardStep.SCHEMA_EDITOR:
        return (
          <SchemaEditorStep
            schema={formData.schema}
            onChange={handleSchemaChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case WizardStep.REVIEW:
        return (
          <ReviewStep
            formData={formData}
            onSubmit={handleNext}
            onPrevious={handlePrevious}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Directory</h1>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {['Basic Info', 'Interview', 'Schema Editor', 'Review'].map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                index < currentStep ? 'bg-blue-600 text-white' : 
                index === currentStep ? 'border-2 border-blue-600 text-blue-600' : 
                'border-2 border-gray-300 text-gray-400'
              }`}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className="text-sm">{step}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {/* Current step */}
      {renderStep()}
    </div>
  );
}
