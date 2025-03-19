import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import CreateDirectoryPage from '../../../pages/directories/create';

// Mock the dependencies
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

jest.mock('../../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('../../../components/Layout', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="layout">{children}</div>
    )
  };
});

jest.mock('../../../components/admin/DirectoryWizard', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="directory-wizard">Directory Wizard Component</div>
  };
});

describe('CreateDirectoryPage', () => {
  const mockRouter = { push: jest.fn() };
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });
  
  test('redirects to login page if user is not authenticated', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    
    render(<CreateDirectoryPage />);
    
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/auth/login');
    });
  });
  
  test('renders loading spinner while checking authentication', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    
    render(<CreateDirectoryPage />);
    
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('layout').querySelector('.animate-spin')).toBeInTheDocument(); // The spinner
  });
  
  test('renders directory wizard when user is authenticated', async () => {
    (useAuth as jest.Mock).mockReturnValue({ 
      user: { id: 'user-123', email: 'test@example.com' } 
    });
    
    render(<CreateDirectoryPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('directory-wizard')).toBeInTheDocument();
      expect(screen.getByText('Create New Directory')).toBeInTheDocument();
    });
  });
});
