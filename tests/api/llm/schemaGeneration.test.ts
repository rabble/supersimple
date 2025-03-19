import { createMocks } from 'node-mocks-http';
import schemaGenerationHandler from '../../../pages/api/llm/schemaGeneration';
import { withAdminAuth } from '../../../lib/admin';

// Mock the admin auth middleware
jest.mock('../../../lib/admin', () => ({
  withAdminAuth: jest.fn((handler) => handler),
  isAdmin: jest.fn().mockResolvedValue(true),
}));

// Mock the Supabase client
jest.mock('../../../lib/supabaseClient', () => ({
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
    }
  }
}));

// Mock fetch for API calls
global.fetch = jest.fn();

describe('/api/llm/schemaGeneration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });
    
    await schemaGenerationHandler(req, res);
    
    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Method not allowed' });
  });
  
  it('generates a schema for business directory', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Business Directory',
        description: 'A directory of businesses',
        domain: 'business',
        interviewAnswers: {
          directoryType: 'Business Directory',
          exampleOrganizations: 'Google, Microsoft, Amazon',
          requiredFields: 'Name, Industry, Website',
          optionalFields: 'Logo, Year Founded, Number of Employees'
        }
      },
    });
    
    await schemaGenerationHandler(req, res);
    
    expect(res._getStatusCode()).toBe(200);
    
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('schema');
    expect(data.schema).toHaveProperty('properties');
    
    // Check that the schema has the expected fields for a business directory
    expect(data.schema.properties).toHaveProperty('name');
    expect(data.schema.properties).toHaveProperty('industry');
    expect(data.schema.properties).toHaveProperty('website');
    
    // Check that metadata is included
    expect(data).toHaveProperty('metadata');
    expect(data.metadata).toHaveProperty('directoryName', 'Business Directory');
  });
  
  it('generates a schema for nonprofit directory', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Nonprofit Directory',
        description: 'A directory of nonprofit organizations',
        domain: 'nonprofit',
        interviewAnswers: {
          directoryType: 'Nonprofit Organization Directory',
          exampleOrganizations: 'Red Cross, UNICEF, WWF',
          requiredFields: 'Name, Mission, Category',
          optionalFields: 'Logo, Year Founded, Tax Status'
        }
      },
    });
    
    await schemaGenerationHandler(req, res);
    
    expect(res._getStatusCode()).toBe(200);
    
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('schema');
    expect(data.schema).toHaveProperty('properties');
    
    // Check that the schema has the expected fields for a nonprofit directory
    expect(data.schema.properties).toHaveProperty('name');
    expect(data.schema.properties).toHaveProperty('mission');
    expect(data.schema.properties).toHaveProperty('category');
  });
  
  it('generates a default schema when directory type is unknown', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Custom Directory',
        description: 'A custom directory',
        domain: 'custom',
        interviewAnswers: {
          directoryType: 'Something Unique',
          exampleOrganizations: 'Example 1, Example 2',
          requiredFields: 'Name, Description',
          optionalFields: 'Image, Website'
        }
      },
    });
    
    await schemaGenerationHandler(req, res);
    
    expect(res._getStatusCode()).toBe(200);
    
    const data = JSON.parse(res._getData());
    expect(data).toHaveProperty('schema');
    expect(data.schema).toHaveProperty('properties');
    
    // Check that the schema has the default fields
    expect(data.schema.properties).toHaveProperty('name');
    expect(data.schema.properties).toHaveProperty('description');
  });
  
  it('handles errors during schema generation', async () => {
    // Mock a failed API response
    (global.fetch as jest.Mock).mockImplementation(() => {
      throw new Error('LLM service error');
    });
    
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'Business Directory',
        description: 'A directory of businesses',
        domain: 'business',
        interviewAnswers: {
          directoryType: 'Business Directory',
          exampleOrganizations: 'Google, Microsoft, Amazon',
          requiredFields: 'Name, Industry, Website',
          optionalFields: 'Logo, Year Founded, Number of Employees'
        }
      },
    });
    
    await schemaGenerationHandler(req, res);
    
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toHaveProperty('schema');
  });
});
