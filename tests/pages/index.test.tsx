import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/index';
import { AuthProvider } from '../../context/AuthContext';

// Mock the next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the AuthContext
jest.mock('../../context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    user: null,
    loading: false,
  }),
}));

describe('Home Page', () => {
  it('renders the landing page correctly', () => {
    render(<HomePage />);
    
    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    
    // Check for call-to-action buttons
    expect(screen.getByText(/get started/i)).toBeInTheDocument();
    
    // Check for features section
    expect(screen.getByText(/features/i, { selector: 'h2' })).toBeInTheDocument();
  });
  
  it('has a link to the directories page', () => {
    render(<HomePage />);
    
    // Check for directories link
    const directoriesLink = screen.getByRole('link', { name: /browse directories/i });
    expect(directoriesLink).toBeInTheDocument();
    expect(directoriesLink).toHaveAttribute('href', '/directories');
  });
});
