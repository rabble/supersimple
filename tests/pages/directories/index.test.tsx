import { render, screen } from '@testing-library/react';
import DirectoriesPage from '../../../pages/directories/index';

// Mock the next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
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

describe('Directories Page', () => {
  it('renders the directories page with data', () => {
    const mockDirectories = [
      {
        id: '1',
        name: 'Test Directory 1',
        description: 'This is a test directory',
        domain: 'test.com',
        created_at: '2023-01-01T00:00:00.000Z',
      },
      {
        id: '2',
        name: 'Test Directory 2',
        description: 'This is another test directory',
        domain: 'test2.com',
        created_at: '2023-01-02T00:00:00.000Z',
      },
    ];

    render(<DirectoriesPage directories={mockDirectories} />);
    
    // Check for page title
    expect(screen.getByText('Directories')).toBeInTheDocument();
    
    // Check for directory names
    expect(screen.getByText('Test Directory 1')).toBeInTheDocument();
    expect(screen.getByText('Test Directory 2')).toBeInTheDocument();
    
    // Check for descriptions
    expect(screen.getByText('This is a test directory')).toBeInTheDocument();
    expect(screen.getByText('This is another test directory')).toBeInTheDocument();
    
    // Check for links to individual directories
    const links = screen.getAllByText(/Browse listings →/i);
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/directories/1');
    expect(links[1]).toHaveAttribute('href', '/directories/2');
  });

  it('shows a message when no directories are available', () => {
    render(<DirectoriesPage directories={[]} />);
    
    expect(screen.getByText('No directories available yet')).toBeInTheDocument();
    expect(screen.getByText('Check back soon for new directories!')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    render(<DirectoriesPage directories={[]} error="Failed to load directories" />);
    
    expect(screen.getByText('Error loading directories')).toBeInTheDocument();
    expect(screen.getByText('Failed to load directories')).toBeInTheDocument();
  });
});
