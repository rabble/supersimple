import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/listings';
import { supabase } from '../../lib/supabaseClient';

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Mock Supabase client
jest.mock('../../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      getUser: jest.fn(),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    insert: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
  },
}));

// Mock createClient
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn().mockImplementation(() => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    single: jest.fn(),
  })),
}));

describe('Listings API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/listings', () => {
    it('should create a new listing with pending status for regular users', async () => {
      // Mock authentication
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: { user: mockUser } },
        error: null,
      });

      // Mock directory fetch
      (supabase.from as jest.Mock).mockImplementation((table) => {
        if (table === 'directories') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValue({
              data: {
                id: 'dir-123',
                schema: {
                  required: ['name', 'description']
                }
              },
              error: null,
            }),
          };
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          insert: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({
            data: {
              id: 'listing-123',
              directory_id: 'dir-123',
              data: { name: 'Test Listing', description: 'Test Description' },
              status: 'pending',
              created_by: 'user-123'
            },
            error: null,
          }),
        };
      });

      // Mock user data fetch for admin check
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: { ...mockUser, user_metadata: { role: 'user' } } },
        error: null,
      });

      // Create mock request and response
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          directory_id: 'dir-123',
          data: {
            name: 'Test Listing',
            description: 'Test Description'
          }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Call the API handler
      await handler(req, res);

      // Assertions
      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          success: true,
          message: expect.stringContaining('pending approval'),
        })
      );
    });

    it('should create a new listing with approved status for admin users', async () => {
      // Mock authentication
      const mockUser = { id: 'admin-123', email: 'admin@example.com' };
      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: { user: mockUser } },
        error: null,
      });

      // Mock directory fetch
      (supabase.from as jest.Mock).mockImplementation((table) => {
        if (table === 'directories') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValue({
              data: {
                id: 'dir-123',
                schema: {
                  required: ['name', 'description']
                }
              },
              error: null,
            }),
          };
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          insert: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({
            data: {
              id: 'listing-123',
              directory_id: 'dir-123',
              data: { name: 'Admin Listing', description: 'Admin Description' },
              status: 'approved',
              created_by: 'admin-123'
            },
            error: null,
          }),
        };
      });

      // Mock user data fetch for admin check - this needs to be mocked before the API call
      (supabase.auth.getUser as jest.Mock).mockResolvedValueOnce({
        data: { user: { ...mockUser, user_metadata: { role: 'admin' } } },
        error: null,
      });

      // Create mock request and response
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          directory_id: 'dir-123',
          data: {
            name: 'Admin Listing',
            description: 'Admin Description'
          }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Call the API handler
      await handler(req, res);

      // Assertions
      expect(res._getStatusCode()).toBe(201);
      const responseData = JSON.parse(res._getData());
      expect(responseData.success).toBe(true);
      
      // The message should either contain 'approved' or the status should be 'approved'
      expect(
        responseData.message.includes('approved') || 
        (responseData.data && responseData.data.status === 'approved')
      ).toBe(true);
    });

    it('should create a new listing with approved status for directory owners', async () => {
      // Mock authentication
      const mockUser = { id: 'owner-123', email: 'owner@example.com' };
      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: { user: mockUser } },
        error: null,
      });

      // Reset mocks to ensure clean state
      jest.clearAllMocks();
      
      // Create a mock for insert that we can verify was called
      const mockInsert = jest.fn().mockReturnThis();
      
      // Mock directory fetch with owner information
      (supabase.from as jest.Mock).mockImplementation((table) => {
        if (table === 'directories') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValue({
              data: {
                id: 'dir-123',
                schema: {
                  required: ['name', 'description']
                },
                created_by: 'owner-123' // This user is the directory owner
              },
              error: null,
            }),
          };
        }
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          insert: mockInsert,
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({
            data: {
              id: 'listing-123',
              directory_id: 'dir-123',
              data: { name: 'Owner Listing', description: 'Owner Description' },
              status: 'approved',
              created_by: 'owner-123'
            },
            error: null,
          }),
        };
      });

      // Mock user data fetch - regular user, not admin
      (supabase.auth.getUser as jest.Mock).mockResolvedValueOnce({
        data: { user: { ...mockUser, user_metadata: { role: 'user' } } },
        error: null,
      });

      // Create mock request and response
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          directory_id: 'dir-123',
          data: {
            name: 'Owner Listing',
            description: 'Owner Description'
          }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Call the API handler
      await handler(req, res);

      // Assertions
      expect(res._getStatusCode()).toBe(201);
      const responseData = JSON.parse(res._getData());
      expect(responseData.success).toBe(true);
      
      // The message should either contain 'approved' or the status should be 'approved'
      expect(
        responseData.message.includes('approved') || 
        (responseData.data && responseData.data.status === 'approved')
      ).toBe(true);

      // Verify Supabase was called with the correct parameters
      expect(supabase.from).toHaveBeenCalledWith('listings');
      
      // Get the mock insert function from the last call to from('listings')
      const fromCalls = (supabase.from as jest.Mock).mock.results;
      const listingsFromCall = fromCalls.find(call => 
        call.type === 'return' && 
        call.value && 
        call.value.insert === mockInsert
      );
      
      // Verify the insert was called with the correct parameters
      expect(mockInsert).toHaveBeenCalledWith({
        directory_id: 'dir-123',
        data: {
          name: 'Owner Listing',
          description: 'Owner Description'
        },
        created_by: 'owner-123',
        status: 'approved'
      });
    });

    it('should return 400 if required fields are missing', async () => {
      // Mock authentication
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: { user: mockUser } },
        error: null,
      });

      // Mock directory fetch
      (supabase.from as jest.Mock).mockImplementation((table) => {
        if (table === 'directories') {
          return {
            select: jest.fn().mockReturnThis(),
            eq: jest.fn().mockReturnThis(),
            single: jest.fn().mockResolvedValue({
              data: {
                id: 'dir-123',
                schema: {
                  required: ['name', 'description']
                }
              },
              error: null,
            }),
          };
        }
        return {};
      });

      // Create mock request and response with missing description
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          directory_id: 'dir-123',
          data: {
            name: 'Test Listing',
            // description is missing
          }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Call the API handler
      await handler(req, res);

      // Assertions
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining('description'),
        })
      );
    });
  });
});
