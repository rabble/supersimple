import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DirectoryWizard from '../../components/admin/DirectoryWizard';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

// Mock the useAuth hook
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock fetch for API calls
global.fetch = jest.fn();

describe('DirectoryWizard', () => {
  beforeEach(() => {
    // Mock the auth context
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 'test-user-id' },
    });
    
    // Mock the router
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    
    // Reset fetch mock
    (global.fetch as jest.Mock).mockReset();
  });
  
  it('renders the first step (Basic Info) by default', () => {
    render(<DirectoryWizard />);
    
    // Check that the first step is rendered
    expect(screen.getByText('Basic Directory Information')).toBeInTheDocument();
    expect(screen.getByLabelText(/What is the name of your directory?/i)).toBeInTheDocument();
  });
  
  it('progresses to the next step when Next is clicked', () => {
    render(<DirectoryWizard />);
    
    // Fill in required fields in the first step
    fireEvent.change(screen.getByLabelText(/What is the name of your directory?/i), {
      target: { value: 'Test Directory' },
    });
    
    // Click the Next button
    fireEvent.click(screen.getByText('Next'));
    
    // Check that the second step is rendered
    expect(screen.getByText('Directory Interview')).toBeInTheDocument();
  });
  
  it('calls the LLM API when generating schema', async () => {
    // Mock successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        fields: [
          { name: 'name', type: 'string', required: true, label: 'Name' },
        ],
      }),
    });
    
    render(<DirectoryWizard />);
    
    // Fill in required fields in the first step
    fireEvent.change(screen.getByLabelText(/What is the name of your directory?/i), {
      target: { value: 'Test Directory' },
    });
    
    // Click the Next button to go to the interview step
    fireEvent.click(screen.getByText('Next'));
    
    // Fill in required fields in the interview step
    fireEvent.change(screen.getByLabelText(/What type of directory is this?/i), {
      target: { value: 'Business Directory' },
    });
    
    // Click the Generate Schema button
    fireEvent.click(screen.getByText('Generate Schema'));
    
    // Wait for the API call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/llm/schemaGeneration',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: expect.any(String),
        })
      );
    });
    
    // Check that we moved to the schema editor step
    await waitFor(() => {
      expect(screen.getByText('Edit Directory Schema')).toBeInTheDocument();
    });
  });
  
  it('saves the directory when the form is submitted', async () => {
    // Mock successful API responses
    (global.fetch as jest.Mock)
      // First call for schema generation
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          fields: [
            { name: 'name', type: 'string', required: true, label: 'Name' },
          ],
        }),
      })
      // Second call for directory creation
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'new-directory-id' }),
      });
    
    render(<DirectoryWizard />);
    
    // Fill in required fields in the first step
    fireEvent.change(screen.getByLabelText(/What is the name of your directory?/i), {
      target: { value: 'Test Directory' },
    });
    
    // Click the Next button to go to the interview step
    fireEvent.click(screen.getByText('Next'));
    
    // Fill in required fields in the interview step
    fireEvent.change(screen.getByLabelText(/What type of directory is this?/i), {
      target: { value: 'Business Directory' },
    });
    
    // Click the Generate Schema button
    fireEvent.click(screen.getByText('Generate Schema'));
    
    // Wait for the schema editor step to appear
    await waitFor(() => {
      expect(screen.getByText('Edit Directory Schema')).toBeInTheDocument();
    });
    
    // Click the Next button to go to the review step
    fireEvent.click(screen.getByText('Next'));
    
    // Wait for the review step to appear
    await waitFor(() => {
      expect(screen.getByText('Review Directory')).toBeInTheDocument();
    });
    
    // Click the Create Directory button
    fireEvent.click(screen.getByText('Create Directory'));
    
    // Wait for the API call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/directories',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: expect.any(String),
        })
      );
    });
    
    // Check that the router was called to redirect
    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith('/admin/directories');
  });
});
