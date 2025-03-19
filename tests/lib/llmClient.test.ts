import { mockCreateChatCompletion } from '../../lib/llmClient';

describe('LLM Client', () => {
  describe('mockCreateChatCompletion', () => {
    it('should generate a schema for schema generation requests', async () => {
      const params = {
        messages: [
          { role: 'system', content: 'You are a helpful assistant' },
          { role: 'user', content: 'Create a JSON schema for a directory of companies' }
        ]
      };

      const result = await mockCreateChatCompletion(params);
      
      // Check that we got a response
      expect(result.data.choices[0].message.content).toBeDefined();
      
      // Parse the JSON to make sure it's valid
      const schema = JSON.parse(result.data.choices[0].message.content);
      
      // Check schema structure
      expect(schema.type).toBe('object');
      expect(Array.isArray(schema.required)).toBe(true);
      expect(typeof schema.properties).toBe('object');
    });

    it('should generate entity data for autofill requests', async () => {
      const params = {
        messages: [
          { role: 'system', content: 'You are a helpful assistant' },
          { role: 'user', content: 'I need information about "Acme Corp"' }
        ]
      };

      const result = await mockCreateChatCompletion(params);
      
      // Check that we got a response
      expect(result.data.choices[0].message.content).toBeDefined();
      
      // Parse the JSON to make sure it's valid
      const data = JSON.parse(result.data.choices[0].message.content);
      
      // Check data structure
      expect(data.name).toBe('Acme Corp');
      expect(data.website).toBeDefined();
      expect(data.industry).toBeDefined();
    });
  });
});
