import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/llm/autofill';
import * as llmClient from '../../../lib/llmClient';
import { supabase } from '../../../lib/supabaseClient';

// Mock the LLM client
jest.mock('../../../lib/llmClient', () => ({
  isUsingMockLLM: true,
  mockCreateChatCompletion: jest.fn(),
  openai: null
}));

// Mock Supabase
jest.mock('../../../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn()
  }
}));

describe('/api/llm/autofill', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation for LLM
    (llmClient.mockCreateChatCompletion as jest.Mock).mockResolvedValue({
      data: {
        choices: [{
          message: {
            content: `{
  "name": "Acme Corp",
  "website": "https://www.acmecorp.com",
  "industry": "Technology",
  "description": "Acme Corp is a leading provider of innovative solutions."
}`
          }
        }]
      }
    });
    
    // Default mock implementation for Supabase
    (supabase.from as jest.Mock).mockReturnThis();
    (supabase.select as jest.Mock).mockReturnThis();
    (supabase.eq as jest.Mock).mockReturnThis();
    (supabase.single as jest.Mock).mockResolvedValue({
      data: {
        schema_json: {
          type: 'object',
          required: ['name', 'website'],
          properties: {
            name: {
              type: 'string',
              title: 'Name',
              description: 'Organization name'
            },
            website: {
              type: 'string',
              title: 'Website',
              description: 'Organization website'
            },
            industry: {
              type: 'string',
              title: 'Industry',
              description: 'Organization industry'
            },
            description: {
              type: 'string',
              title: 'Description',
              description: 'Organization description'
            }
          }
        }
      },
      error: null
    });
  });

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: 'Method not allowed',
      }),
    );
  });

  it('should return 400 if required fields are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        directoryId: 'dir123'
        // Missing entityName
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: false,
        error: expect.stringContaining('Missing required fields')
      }),
    );
  });

  it('should return 404 if directory is not found', async () => {
    // Mock directory not found
    (supabase.single as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: 'Directory not found' }
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        directoryId: 'dir123',
        entityName: 'Acme Corp'
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        success: false,
        error: 'Directory not found'
      }),
    );
  });

  it('should generate data successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        directoryId: 'dir123',
        entityName: 'Acme Corp',
        entityUrl: 'https://www.acmecorp.com'
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.data.name).toBe('Acme Corp');
    expect(data.data.website).toBeDefined();
    expect(data.data.industry).toBeDefined();
  });

  it('should handle LLM errors gracefully', async () => {
    // Mock an error from the LLM
    (llmClient.mockCreateChatCompletion as jest.Mock).mockRejectedValue(
      new Error('LLM service unavailable')
    );

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        directoryId: 'dir123',
        entityName: 'Acme Corp'
      },
    });

    await handler(req, res);

    // Should still return 200 because it falls back to mock data
    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.data.name).toBe('Acme Corp');
  });

  it('should handle JSON parsing errors', async () => {
    // Mock an invalid JSON response
    (llmClient.mockCreateChatCompletion as jest.Mock).mockResolvedValue({
      data: {
        choices: [{
          message: {
            content: `This is not valid JSON`
          }
        }]
      }
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        directoryId: 'dir123',
        entityName: 'Acme Corp'
      },
    });

    await handler(req, res);

    // Should still return 200 because it falls back to mock data
    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.data.name).toBe('Acme Corp');
  });
});
