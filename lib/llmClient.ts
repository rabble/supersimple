import OpenAI from 'openai';

// Check if we have an API key
const hasApiKey = !!process.env.OPENAI_API_KEY;
console.log('OpenAI API Key available:', !!process.env.OPENAI_API_KEY);

// Create the OpenAI client if possible
export const openai = hasApiKey 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

// Flag to check if we're in mock mode
export const isUsingMockLLM = !hasApiKey;

// Warning message for mock mode
export const mockModeWarning = "⚠️ Using mock AI responses - for full AI-powered features, configure OPENAI_API_KEY in your environment.";

// Mock implementation of createChatCompletion
export async function mockCreateChatCompletion(params: any) {
  console.log('Using mock LLM response (OPENAI_API_KEY not configured)');
  
  // Extract the prompt from the messages
  const userMessage = params.messages.find((m: any) => m.role === 'user')?.content || '';
  
  // Check what kind of request this is
  if (userMessage.includes('JSON schema')) {
    // This is a schema generation request
    return {
      data: {
        choices: [{
          message: {
            content: `{
  "type": "object",
  "required": ["name", "website", "industry"],
  "properties": {
    "name": {
      "type": "string",
      "title": "Organization Name",
      "description": "The official name of the organization"
    },
    "website": {
      "type": "string",
      "format": "uri",
      "title": "Website",
      "description": "The organization's official website URL"
    },
    "industry": {
      "type": "string",
      "title": "Industry",
      "description": "The primary industry the organization operates in"
    },
    "description": {
      "type": "string",
      "title": "Description",
      "description": "A brief description of the organization"
    },
    "foundedYear": {
      "type": "integer",
      "title": "Founded Year",
      "description": "The year the organization was founded"
    },
    "employeeCount": {
      "type": "integer",
      "title": "Number of Employees",
      "description": "Approximate number of employees"
    },
    "headquarters": {
      "type": "string",
      "title": "Headquarters",
      "description": "Location of the organization's headquarters"
    },
    "logo": {
      "type": "string",
      "format": "uri",
      "title": "Logo URL",
      "description": "URL to the organization's logo image"
    }
  }
}`
          }
        }]
      }
    };
  } else {
    // This is an autofill request
    // Extract the entity name from the prompt
    const entityNameMatch = userMessage.match(/information about "([^"]+)"/);
    const entityName = entityNameMatch ? entityNameMatch[1] : 'Sample Organization';
    
    return {
      data: {
        choices: [{
          message: {
            content: `{
  "name": "${entityName}",
  "website": "https://www.${entityName.toLowerCase().replace(/\s+/g, '')}.com",
  "industry": "Technology",
  "description": "${entityName} is a leading provider of innovative solutions.",
  "foundedYear": 2010,
  "employeeCount": 250,
  "headquarters": "San Francisco, CA",
  "logo": "https://via.placeholder.com/150?text=${encodeURIComponent(entityName)}"
}`
          }
        }]
      }
    };
  }
}
