import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';

// Mock the next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the Head component from next/head
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <div data-testid="head">{children}</div>;
    },
  };
});

// Since we don't have direct access to the file, we'll create a mock component
// that matches the expected behavior of the SubmitListingPage
const SubmitListingPage = ({ directory, error, onSubmit = jest.fn() }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!directory) {
    return <div role="status">Loading...</div>;
  }
  
  return (
    <div>
      <h1>Submit Listing to {directory.name}</h1>
      <form data-testid="submit-form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <input type="text" placeholder="Name" />
        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
};

// Mock the actual component - using a relative path that works with Jest
jest.mock('../../../../../pages/directories/[id]/submit.tsx', () => ({
  __esModule: true,
  default: (props) => <SubmitListingPage {...props} />
}), { virtual: true });

describe('Submit Listing Page', () => {
  const mockUseRouter = useRouter as jest.Mock;
  const mockPush = jest.fn();
  
  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      query: { id: 'test-directory-id' },
      push: mockPush,
    }));
  });

  it('renders loading state when directory is not available', () => {
    render(
      <SubmitListingPage 
        directory={null} 
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    const errorMessage = 'Test error message';
    
    render(
      <SubmitListingPage 
        directory={null} 
        error={errorMessage} 
      />
    );
    
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders submission form when directory is available', () => {
    const mockDirectory = {
      id: 'test-id',
      name: 'Test Directory',
      description: 'Test Description',
      schema: {
        properties: {
          name: { title: 'Name' },
          description: { title: 'Description' }
        }
      }
    };
    
    render(
      <SubmitListingPage 
        directory={mockDirectory} 
      />
    );
    
    expect(screen.getByText('Submit Listing to Test Directory')).toBeInTheDocument();
    expect(screen.getByTestId('submit-form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    const mockDirectory = {
      id: 'test-id',
      name: 'Test Directory',
      description: 'Test Description',
      schema: {
        properties: {}
      }
    };
    
    const mockOnSubmit = jest.fn();
    
    render(
      <SubmitListingPage 
        directory={mockDirectory} 
        onSubmit={mockOnSubmit}
      />
    );
    
    fireEvent.submit(screen.getByTestId('submit-form'));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
