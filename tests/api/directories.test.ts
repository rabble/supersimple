import { createMocks } from 'node-mocks-http';
import directoriesHandler from '../../pages/api/directories/index';
import { withAdminAuth } from '../../lib/admin';
import { supabase } from '../../lib/supabaseClient';

// Mock the admin auth middleware
jest.mock('../../lib/admin', () => ({
  withAdminAuth: jest.fn((handler) => handler),
  isAdmin: jest.fn().mockResolvedValue(true),
}));

// Mock the Supabase client
jest.mock('../../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({
        data: {
          session: {
            user: { id: 'test-user-id' }
          }
        },
        error: null
      })
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
  }
}));

describe('/api/directories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('returns 405 for unsupported methods', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
    });
    
    await directoriesHandler(req, res);
    
    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Method not allowed' });
  });
  
  describe('POST /api/directories', () => {
    it('creates a new directory', async () => {
      // Mock the Supabase response
      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                id: 'new-directory-id',
                name: 'Test Directory',
                schema_json: { fields: [] },
                owner_user_id: 'test-user-id',
                created_at: new Date().toISOString()
              },
              error: null
            })
          })
        })
      });
      
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'Test Directory',
          schema_json: { fields: [] }
        },
      });
      
      await directoriesHandler(req, res);
      
      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toHaveProperty('id', 'new-directory-id');
      
      // Check that Supabase was called correctly
      expect(supabase.from).toHaveBeenCalledWith('directories');
      expect(supabase.from().insert).toHaveBeenCalledWith({
        name: 'Test Directory',
        schema_json: { fields: [] },
        owner_user_id: 'test-user-id'
      });
    });
    
    it('returns 400 if required fields are missing', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          // Missing name
          schema_json: { fields: [] }
        },
      });
      
      await directoriesHandler(req, res);
      
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Missing required fields' });
    });
    
    it('returns 500 if Supabase returns an error', async () => {
      // Mock the Supabase error response
      (supabase.from as jest.Mock).mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' }
            })
          })
        })
      });
      
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          name: 'Test Directory',
          schema_json: { fields: [] }
        },
      });
      
      await directoriesHandler(req, res);
      
      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Failed to create directory' });
    });
  });
  
  describe('GET /api/directories', () => {
    it('returns all directories', async () => {
      // Mock the Supabase response
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            data: [
              {
                id: 'directory-1',
                name: 'Directory 1',
                schema_json: { fields: [] },
                owner_user_id: 'test-user-id',
                created_at: new Date().toISOString()
              },
              {
                id: 'directory-2',
                name: 'Directory 2',
                schema_json: { fields: [] },
                owner_user_id: 'test-user-id',
                created_at: new Date().toISOString()
              }
            ],
            error: null
          })
        })
      });
      
      const { req, res } = createMocks({
        method: 'GET',
      });
      
      await directoriesHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data).toBeInstanceOf(Array);
      expect(data.length).toBe(2);
      expect(data[0]).toHaveProperty('id', 'directory-1');
      expect(data[1]).toHaveProperty('id', 'directory-2');
      
      // Check that Supabase was called correctly
      expect(supabase.from).toHaveBeenCalledWith('directories');
      expect(supabase.from().select).toHaveBeenCalledWith('*');
      expect(supabase.from().select().order).toHaveBeenCalledWith('created_at', { ascending: false });
    });
    
    it('returns 500 if Supabase returns an error', async () => {
      // Mock the Supabase error response
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database error' }
          })
        })
      });
      
      const { req, res } = createMocks({
        method: 'GET',
      });
      
      await directoriesHandler(req, res);
      
      expect(res._getStatusCode()).toBe(500);
      expect(JSON.parse(res._getData())).toEqual({ error: 'Failed to fetch directories' });
    });
  });
});
