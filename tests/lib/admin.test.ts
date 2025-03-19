import { isAdmin, getUserRole, UserRole } from '../../lib/admin';
import { supabase } from '../../lib/supabaseClient';

// Mock the Supabase client
jest.mock('../../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    auth: {
      admin: {
        updateUserById: jest.fn()
      }
    }
  }
}));

describe('Admin Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isAdmin', () => {
    it('returns false if user is null', async () => {
      const result = await isAdmin(null);
      expect(result).toBe(false);
    });

    it('returns true if user has admin role in metadata', async () => {
      const user = {
        id: 'user-123',
        user_metadata: { role: 'admin' }
      };

      const result = await isAdmin(user as any);
      expect(result).toBe(true);
    });

    it('returns false if user has non-admin role in metadata', async () => {
      const user = {
        id: 'user-123',
        user_metadata: { role: 'viewer' }
      };

      const result = await isAdmin(user as any);
      expect(result).toBe(false);
    });

    it('checks database if role not in metadata', async () => {
      const user = {
        id: 'user-123',
        user_metadata: {}
      };

      // Mock the Supabase chain
      const mockSingle = jest.fn().mockResolvedValue({
        data: { role: 'admin' },
        error: null
      });
      const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
      const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });
      
      // Replace the original mock with our chain
      (supabase.from as jest.Mock).mockImplementation(mockFrom);

      const result = await isAdmin(user as any);
      expect(result).toBe(true);
      expect(mockFrom).toHaveBeenCalledWith('users_roles');
      expect(mockSelect).toHaveBeenCalledWith('role');
      expect(mockEq).toHaveBeenCalledWith('user_id', 'user-123');
    });

    it('returns false if database check fails', async () => {
      const user = {
        id: 'user-123',
        user_metadata: {}
      };

      // Mock the Supabase chain
      const mockSingle = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Error fetching role' }
      });
      const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
      const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });
      
      // Replace the original mock with our chain
      (supabase.from as jest.Mock).mockImplementation(mockFrom);

      const result = await isAdmin(user as any);
      expect(result).toBe(false);
    });
  });

  describe('getUserRole', () => {
    it('returns null if user is null', async () => {
      const result = await getUserRole(null);
      expect(result).toBeNull();
    });

    it('returns role from metadata if present', async () => {
      const user = {
        id: 'user-123',
        user_metadata: { role: 'contributor' }
      };

      const result = await getUserRole(user as any);
      expect(result).toBe(UserRole.CONTRIBUTOR);
    });

    it('fetches role from database if not in metadata', async () => {
      const user = {
        id: 'user-123',
        user_metadata: {}
      };

      // Mock the Supabase chain
      const mockSingle = jest.fn().mockResolvedValue({
        data: { role: 'admin' },
        error: null
      });
      const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
      const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });
      
      // Replace the original mock with our chain
      (supabase.from as jest.Mock).mockImplementation(mockFrom);

      const result = await getUserRole(user as any);
      expect(result).toBe(UserRole.ADMIN);
    });

    it('returns null if database check fails', async () => {
      const user = {
        id: 'user-123',
        user_metadata: {}
      };

      // Mock the Supabase chain
      const mockSingle = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Error fetching role' }
      });
      const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
      const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });
      
      // Replace the original mock with our chain
      (supabase.from as jest.Mock).mockImplementation(mockFrom);

      const result = await getUserRole(user as any);
      expect(result).toBeNull();
    });
  });
});
