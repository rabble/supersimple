import { render, screen } from '@testing-library/react';
import DirectoryPage from '../../../../pages/directories/[id]/index';

// Mock the next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1' },
  }),
}));

// Mock the AuthContext
jest.mock('../../../../context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
  }),
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

describe('Directory Page', () => {
  it('renders the directory details correctly', () => {
    const mockDirectory = {
      id: '1',
      name: 'Test Directory',
      description: 'This is a test directory',
      domain: 'test.com',
      schema: { type: 'object', properties: {} },
      created_at: '2023-01-01T00:00:00.000Z',
    };

    render(<DirectoryPage directory={mockDirectory} listingsCount={5} />);
    
    // Check for directory name (using queryAllByText since it appears in both title and h1)
    const titleElements = screen.queryAllByText('Test Directory');
    expect(titleElements.length).toBeGreaterThan(0);
    
    // Check for description
    expect(screen.getByText('This is a test directory')).toBeInTheDocument();
    
    // Check for domain
    expect(screen.getByText('test.com')).toBeInTheDocument();
    
    // Check for listings count
    expect(screen.getByText('5')).toBeInTheDocument();
    
    // Check for action buttons
    expect(screen.getByText('Browse Listings')).toBeInTheDocument();
    expect(screen.getByText('Submit a Listing')).toBeInTheDocument();
  });

  it('shows an error message when there is an error', () => {
    render(<DirectoryPage directory={null} error="Failed to load directory" listingsCount={0} />);
    
    expect(screen.getByText('Error loading directory')).toBeInTheDocument();
    expect(screen.getByText('Failed to load directory')).toBeInTheDocument();
    expect(screen.getByText('← Back to directories')).toBeInTheDocument();
  });

  it('shows a loading state when directory is null without error', () => {
    render(<DirectoryPage directory={null} listingsCount={0} />);
    
    // Check for loading spinner instead of checking document.title
    expect(screen.getByTestId('head')).toBeInTheDocument();
    expect(screen.getByTestId('head').textContent).toContain('Loading...');
  });
});
