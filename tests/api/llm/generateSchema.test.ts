import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/llm/generateSchema';
import * as llmClient from '../../../lib/llmClient';

// Mock the LLM client
jest.mock('../../../lib/llmClient', () => ({
  isUsingMockLLM: true,
  mockCreateChatCompletion: jest.fn(),
  openai: null
}));

describe('/api/llm/generateSchema', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    (llmClient.mockCreateChatCompletion as jest.Mock).mockResolvedValue({
      data: {
        choices: [{
          message: {
            content: `{
  "type": "object",
  "required": ["name", "website"],
  "properties": {
    "name": {
      "type": "string",
      "title": "Name",
      "description": "Organization name"
    },
    "website": {
      "type": "string",
      "title": "Website",
      "description": "Organization website"
    }
  }
}`
          }
        }]
      }
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

  it('should return 400 if interview answers are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: 'Interview answers are required',
      }),
    );
  });

  it('should generate a schema successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        interviewAnswers: {
          directoryType: 'tech companies',
          exampleOrganizations: 'Google, Apple, Microsoft',
          requiredFields: 'name, website',
          optionalFields: 'description, founded year'
        }
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.schema).toBeDefined();
    expect(data.schema.type).toBe('object');
    expect(data.schema.required).toContain('name');
    expect(data.schema.properties.name).toBeDefined();
  });

  it('should handle LLM errors gracefully', async () => {
    // Mock an error from the LLM
    (llmClient.mockCreateChatCompletion as jest.Mock).mockRejectedValue(
      new Error('LLM service unavailable')
    );

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        interviewAnswers: {
          directoryType: 'tech companies',
          exampleOrganizations: 'Google, Apple, Microsoft',
          requiredFields: 'name, website',
          optionalFields: 'description, founded year'
        }
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: 'Failed to generate schema',
      }),
    );
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
        interviewAnswers: {
          directoryType: 'tech companies',
          exampleOrganizations: 'Google, Apple, Microsoft',
          requiredFields: 'name, website',
          optionalFields: 'description, founded year'
        }
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: 'Failed to parse schema from LLM response',
      }),
    );
  });
});
