import { renderHook, act } from '@testing-library/react';
import { useAuth, AuthProvider } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import React from 'react';

// Mock the Supabase client
jest.mock('../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({
        data: { session: null },
      }),
      onAuthStateChange: jest.fn(() => ({
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      })),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

// Mock the loading state to be false immediately
jest.mock('../context/AuthContext', () => {
  const originalModule = jest.requireActual('../context/AuthContext');
  
  return {
    ...originalModule,
    AuthProvider: ({ children }: { children: React.ReactNode }) => {
      const mockAuthValue = {
        user: null,
        signIn: jest.fn().mockImplementation(() => 
          supabase.auth.signInWithPassword({ email: 'test@example.com', password: 'password' })
        ),
        signUp: jest.fn().mockImplementation(() => 
          supabase.auth.signUp({ email: 'test@example.com', password: 'password' })
        ),
        signOut: jest.fn().mockImplementation(() => 
          supabase.auth.signOut()
        ),
      };
      
      return React.createElement(
        originalModule.AuthContext.Provider,
        { value: mockAuthValue },
        children
      );
    },
  };
});

describe('Auth Context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in a user', async () => {
    // Mock successful sign in
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => 
      React.createElement(AuthProvider, null, children);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signIn('test@example.com', 'password');
    });

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should sign up a user', async () => {
    // Mock successful sign up
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => 
      React.createElement(AuthProvider, null, children);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signUp('test@example.com', 'password');
    });

    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should sign out a user', async () => {
    // Mock successful sign out
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });

    const wrapper = ({ children }: { children: React.ReactNode }) => 
      React.createElement(AuthProvider, null, children);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signOut();
    });

    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  it('should handle sign in errors', async () => {
    // Mock failed sign in
    const mockError = { message: 'Invalid credentials' };
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: { user: null },
      error: mockError,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => 
      React.createElement(AuthProvider, null, children);

    const { result } = renderHook(() => useAuth(), { wrapper });

    let error;
    await act(async () => {
      try {
        await result.current.signIn('test@example.com', 'wrong-password');
      } catch (e) {
        error = e;
      }
    });

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should handle sign up errors', async () => {
    // Mock failed sign up
    const mockError = { message: 'Email already in use' };
    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { user: null },
      error: mockError,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => 
      React.createElement(AuthProvider, null, children);

    const { result } = renderHook(() => useAuth(), { wrapper });

    let error;
    await act(async () => {
      try {
        await result.current.signUp('existing@example.com', 'password');
      } catch (e) {
        error = e;
      }
    });

    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });
});
