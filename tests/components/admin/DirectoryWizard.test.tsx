import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import DirectoryWizard from '../../../components/admin/DirectoryWizard';
import { supabase } from '../../../lib/supabaseClient';

// Mock the dependencies
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('../../../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn()
  }
}));

// Mock fetch for API calls
global.fetch = jest.fn();

describe('DirectoryWizard', () => {
  const mockUser = { id: 'user-123', email: 'test@example.com' };
  const mockRouter = { push: jest.fn() };
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup default mocks
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ schema: { fields: [] } })
    });
    (supabase.single as jest.Mock).mockResolvedValue({
      data: { id: 'dir-123' },
      error: null
    });
  });
  
  test('renders the first step (Basic Info) by default', () => {
    render(<DirectoryWizard />);
    
    expect(screen.getByText('Create New Directory')).toBeInTheDocument();
    expect(screen.getByText('Basic Info')).toBeInTheDocument();
  });
  
  test('moves to the interview step when clicking next on basic info step', async () => {
    render(<DirectoryWizard />);
    
    // Fill out the basic info form
    fireEvent.change(screen.getByLabelText(/What is the name of your directory/i), { target: { value: 'Test Directory' } });
    fireEvent.change(screen.getByLabelText(/Describe your directory/i), { target: { value: 'A test directory' } });
    fireEvent.change(screen.getByLabelText(/Domain or category/i), { target: { value: 'test.com' } });
    
    // Click the next button
    fireEvent.click(screen.getByText('Next'));
    
    // Check that we moved to the interview step
    await waitFor(() => {
      expect(screen.getByText('Directory Type')).toBeInTheDocument();
    });
  });
  
  test('calls the schema generation API when completing the interview step', async () => {
    render(<DirectoryWizard />);
    
    // Fill out the basic info form and move to interview step
    fireEvent.change(screen.getByLabelText(/What is the name of your directory/i), { target: { value: 'Test Directory' } });
    fireEvent.change(screen.getByLabelText(/Describe your directory/i), { target: { value: 'A test directory' } });
    fireEvent.change(screen.getByLabelText(/Domain or category/i), { target: { value: 'test.com' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Fill out the interview form
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Directory Type/i), { 
        target: { value: 'Business Directory' } 
      });
      fireEvent.change(screen.getByLabelText(/Example Organizations/i), { 
        target: { value: 'Google, Apple, Microsoft' } 
      });
      fireEvent.change(screen.getByLabelText(/Required Fields/i), { 
        target: { value: 'Name, Website, Industry' } 
      });
      fireEvent.change(screen.getByLabelText(/Optional Fields/i), { 
        target: { value: 'Logo, Founded Year, Size' } 
      });
    });
    
    // Click the next button to generate schema
    fireEvent.click(screen.getByText('Next'));
    
    // Verify the API was called with the right data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/llm/schemaGeneration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: expect.stringContaining('Test Directory')
      });
    });
  });
  
  test('saves the directory when completing the wizard', async () => {
    render(<DirectoryWizard />);
    
    // Fill out the basic info form and move to interview step
    fireEvent.change(screen.getByLabelText(/What is the name of your directory/i), { target: { value: 'Test Directory' } });
    fireEvent.change(screen.getByLabelText(/Describe your directory/i), { target: { value: 'A test directory' } });
    fireEvent.change(screen.getByLabelText(/Domain or category/i), { target: { value: 'test.com' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Fill out the interview form and move to schema editor
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Directory Type/i), { 
        target: { value: 'Business Directory' } 
      });
      fireEvent.click(screen.getByText('Next'));
    });
    
    // Move from schema editor to review
    await waitFor(() => {
      fireEvent.click(screen.getByText('Next'));
    });
    
    // Submit the form
    await waitFor(() => {
      fireEvent.click(screen.getByText('Create Directory'));
    });
    
    // Verify the directory was saved
    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('directories');
      expect(supabase.insert).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Test Directory',
        description: 'A test directory',
        domain: 'test.com',
        created_by: 'user-123'
      }));
      expect(mockRouter.push).toHaveBeenCalledWith('/directories/dir-123');
    });
  });
  
  test('displays an error message when schema generation fails', async () => {
    // Mock the fetch to return an error
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: 'Failed to generate schema' })
    });
    
    render(<DirectoryWizard />);
    
    // Fill out the basic info form and move to interview step
    fireEvent.change(screen.getByLabelText(/What is the name of your directory/i), { target: { value: 'Test Directory' } });
    fireEvent.change(screen.getByLabelText(/Describe your directory/i), { target: { value: 'A test directory' } });
    fireEvent.change(screen.getByLabelText(/Domain or category/i), { target: { value: 'test.com' } });
    fireEvent.click(screen.getByText('Next'));
    
    // Fill out the interview form and try to generate schema
    await waitFor(() => {
      fireEvent.click(screen.getByText('Next'));
    });
    
    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Failed to generate schema/i)).toBeInTheDocument();
    });
  });
});
