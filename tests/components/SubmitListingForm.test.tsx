import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import SubmitListingPage from '../../pages/[directoryId]/submit-listing';
import { supabase } from '../../lib/supabaseClient';

// Mock the Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the auth context
jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock the Supabase client
jest.mock('../../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
  },
}));

// Mock fetch for the autofill API
global.fetch = jest.fn();

describe('SubmitListingPage', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    user_metadata: { role: 'viewer' },
  };

  const mockRouter = {
    query: { directoryId: 'dir-123' },
    push: jest.fn(),
    asPath: '/dir-123/submit-listing',
  };

  const mockDirectory = {
    id: 'dir-123',
    name: 'Test Directory',
    description: 'A test directory',
    schema_json: {
      properties: {
        name: { type: 'string', title: 'Name' },
        description: { type: 'string', title: 'Description' },
        website: { type: 'string', title: 'Website', format: 'uri' },
      },
      required: ['name'],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup router mock
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    // Setup auth mock
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
    
    // Setup Supabase mock
    (supabase.from as jest.Mock).mockReturnThis();
    (supabase.select as jest.Mock).mockReturnThis();
    (supabase.eq as jest.Mock).mockReturnThis();
    (supabase.single as jest.Mock).mockResolvedValue({
      data: mockDirectory,
      error: null,
    });
    
    // Setup fetch mock for autofill
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          name: 'Auto Company',
          description: 'Automatically generated description',
          website: 'https://www.autocompany.com',
        },
      }),
    });
  });

  test('renders form fields based on directory schema', async () => {
    render(<SubmitListingPage />);
    
    // Wait for the directory to load and form to render
    await waitFor(() => {
      expect(screen.getByText('Submit a Listing')).toBeInTheDocument();
    });
    
    // Check if form fields are rendered based on schema
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
  });

  test('autofill button triggers the mock LLM endpoint', async () => {
    render(<SubmitListingPage />);
    
    // Wait for the form to render
    await waitFor(() => {
      expect(screen.getByText('Submit a Listing')).toBeInTheDocument();
    });
    
    // Fill in the autofill input and click the button
    const autofillInput = screen.getByPlaceholderText('Enter entity name');
    const autofillButton = screen.getByRole('button', { name: /Autofill/i });
    
    fireEvent.change(autofillInput, { target: { value: 'Auto Company' } });
    fireEvent.click(autofillButton);
    
    // Verify the fetch was called with the correct parameters
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/llm/mockAutofill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          directoryId: 'dir-123',
          entityName: 'Auto Company',
        }),
      });
    });
    
    // Verify form fields were populated with the mock data
    await waitFor(() => {
      const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
      expect(nameInput.value).toBe('Auto Company');
    });
  });

  test('displays error when autofill fails', async () => {
    // Setup fetch to return an error
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({
        success: false,
        error: 'Failed to autofill',
      }),
    });
    
    render(<SubmitListingPage />);
    
    // Wait for the form to render
    await waitFor(() => {
      expect(screen.getByText('Submit a Listing')).toBeInTheDocument();
    });
    
    // Fill in the autofill input and click the button
    const autofillInput = screen.getByPlaceholderText('Enter entity name');
    const autofillButton = screen.getByRole('button', { name: /Autofill/i });
    
    fireEvent.change(autofillInput, { target: { value: 'Auto Company' } });
    fireEvent.click(autofillButton);
    
    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to autofill')).toBeInTheDocument();
    });
  });
});
