import { render, screen } from '@testing-library/react';
import ListingsPage from '../../../../../pages/directories/[id]/listings/index';

// Mock the next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1' },
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

describe('Listings Page', () => {
  it('renders the listings page with data', () => {
    const mockDirectory = {
      id: '1',
      name: 'Test Directory',
      description: 'This is a test directory',
      schema: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', title: 'Name' },
          description: { type: 'string', title: 'Description' },
          website: { type: 'string', title: 'Website' },
        }
      },
    };

    const mockListings = [
      {
        id: '101',
        directory_id: '1',
        data: {
          name: 'Test Listing 1',
          description: 'This is test listing 1',
          website: 'https://example1.com'
        },
        created_at: '2023-01-01T00:00:00.000Z',
      },
      {
        id: '102',
        directory_id: '1',
        data: {
          name: 'Test Listing 2',
          description: 'This is test listing 2',
          website: 'https://example2.com'
        },
        created_at: '2023-01-02T00:00:00.000Z',
      },
    ];

    render(<ListingsPage directory={mockDirectory} listings={mockListings} />);
    
    // Check for page title (using queryAllByText since it appears in both title and h1)
    const titleElements = screen.queryAllByText(/Test Directory Listings/i);
    expect(titleElements.length).toBeGreaterThan(0);
    
    // Check for listing names
    expect(screen.getByText('Test Listing 1')).toBeInTheDocument();
    expect(screen.getByText('Test Listing 2')).toBeInTheDocument();
    
    // Check for listing details
    expect(screen.getByText('This is test listing 1')).toBeInTheDocument();
    expect(screen.getByText('This is test listing 2')).toBeInTheDocument();
    
    // Check for links to individual listings
    const links = screen.getAllByText(/View details →/i);
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/directories/1/listings/101');
    expect(links[1]).toHaveAttribute('href', '/directories/1/listings/102');
  });

  it('shows a message when no listings are available', () => {
    const mockDirectory = {
      id: '1',
      name: 'Test Directory',
      description: 'This is a test directory',
      schema: { type: 'object', properties: {} },
    };

    render(<ListingsPage directory={mockDirectory} listings={[]} />);
    
    expect(screen.getByText('No listings available yet')).toBeInTheDocument();
    expect(screen.getByText('Be the first to add a listing to this directory!')).toBeInTheDocument();
    expect(screen.getByText('Submit a Listing')).toBeInTheDocument();
  });

  it('shows an error message when there is an error', () => {
    render(<ListingsPage directory={null} listings={[]} error="Failed to load listings" />);
    
    expect(screen.getByText('Error loading listings')).toBeInTheDocument();
    expect(screen.getByText('Failed to load listings')).toBeInTheDocument();
    expect(screen.getByText('← Back to directories')).toBeInTheDocument();
  });
  
  it('renders loading state when directory is null but no error', () => {
    render(<ListingsPage directory={null} listings={[]} />);
    
    // Should show loading spinner or loading text
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
