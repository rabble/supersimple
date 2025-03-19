import { createMocks } from 'node-mocks-http';
import listingsHandler from '../../pages/api/listings/index';
import { supabase } from '../../lib/supabaseClient';

// Set NODE_ENV to test
process.env.NODE_ENV = 'test';

// Mock Supabase
jest.mock('../../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      getUser: jest.fn(),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    single: jest.fn(),
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

describe('Listings API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock auth session
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: {
        session: {
          user: {
            id: 'user-123',
            email: 'test@example.com',
            user_metadata: { role: 'viewer' },
          },
        },
      },
      error: null,
    });
    
    // Mock user data
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          user_metadata: { role: 'viewer' },
        },
      },
      error: null,
    });
  });

  test('creates a listing with pending status for non-admin users', async () => {
    // Mock directory data with owner information
    (supabase.single as jest.Mock).mockResolvedValueOnce({
      data: {
        id: 'dir-123',
        name: 'Test Directory',
        schema: {
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['name'],
        },
        created_by: 'user-123' // This user is the directory owner
      },
      error: null,
    });
    
    // Mock listing insertion
    (supabase.insert as jest.Mock).mockReturnThis();
    (supabase.select as jest.Mock).mockReturnThis();
    (supabase.single as jest.Mock).mockResolvedValueOnce({
      data: {
        id: 'listing-123',
        directory_id: 'dir-123',
        data: {
          name: 'Test Listing',
          description: 'Test Description',
        },
        created_by: 'user-123',
        status: 'pending',
      },
      error: null,
    });
    
    // Create mock request and response
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        directory_id: 'dir-123',
        data: {
          name: 'Test Listing',
          description: 'Test Description',
        },
      },
    });
    
    // Call the API handler
    await listingsHandler(req, res);
    
    // Verify response
    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.stringContaining('pending approval'),
        data: expect.objectContaining({
          status: 'pending',
        }),
      })
    );
    
    // Verify Supabase was called with the correct parameters
    expect(supabase.from).toHaveBeenCalledWith('listings');
    expect(supabase.insert).toHaveBeenCalledWith({
      directory_id: 'dir-123',
      data: {
        name: 'Test Listing',
        description: 'Test Description',
      },
      created_by: 'user-123',
      status: 'pending',
    });
  });

  test('creates a listing with approved status for admin users', async () => {
    // Mock admin user - this needs to be mocked before the API call
    (supabase.auth.getUser as jest.Mock).mockResolvedValueOnce({
      data: {
        user: {
          id: 'admin-123',
          email: 'admin@example.com',
          user_metadata: { role: 'admin' },
        },
      },
      error: null,
    });
    
    // Mock directory data
    (supabase.single as jest.Mock).mockResolvedValueOnce({
      data: {
        id: 'dir-123',
        name: 'Test Directory',
        schema: {
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['name'],
        },
      },
      error: null,
    });
    
    // Mock listing insertion
    (supabase.insert as jest.Mock).mockReturnThis();
    (supabase.select as jest.Mock).mockReturnThis();
    (supabase.single as jest.Mock).mockResolvedValueOnce({
      data: {
        id: 'listing-123',
        directory_id: 'dir-123',
        data: {
          name: 'Admin Listing',
          description: 'Admin Description',
        },
        created_by: 'admin-123',
        status: 'approved',
      },
      error: null,
    });
    
    // Create mock request and response
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        directory_id: 'dir-123',
        data: {
          name: 'Admin Listing',
          description: 'Admin Description',
        },
      },
    });
    
    // Call the API handler
    await listingsHandler(req, res);
    
    // Verify response
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
    expect(supabase.insert).toHaveBeenCalledWith({
      directory_id: 'dir-123',
      data: {
        name: 'Admin Listing',
        description: 'Admin Description',
      },
      created_by: 'admin-123',
      status: 'approved',
    });
  });

  test('validates required fields from schema', async () => {
    // Mock directory data with required fields
    (supabase.single as jest.Mock).mockResolvedValueOnce({
      data: {
        id: 'dir-123',
        name: 'Test Directory',
        schema: {
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            website: { type: 'string' },
          },
          required: ['name', 'website'],
        },
      },
      error: null,
    });
    
    // Create mock request with missing required field
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        directory_id: 'dir-123',
        data: {
          name: 'Test Listing',
          // website is missing but required
        },
      },
    });
    
    // Call the API handler
    await listingsHandler(req, res);
    
    // Verify response indicates validation error
    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: false,
        error: expect.stringContaining('website'),
      })
    );
  });
});
