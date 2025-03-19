import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '../../../lib/llmClient';

type InterviewAnswers = {
  directoryType: string;
  exampleOrganizations: string;
  requiredFields: string;
  optionalFields: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { interviewAnswers } = req.body as { interviewAnswers: InterviewAnswers };

    if (!interviewAnswers) {
      return res.status(400).json({ error: 'Interview answers are required' });
    }

    // Construct the prompt for the LLM
    const prompt = `
      Create a JSON schema for a directory of ${interviewAnswers.directoryType}.
      
      Example organizations in this directory would be: ${interviewAnswers.exampleOrganizations}
      
      Required fields: ${interviewAnswers.requiredFields}
      
      Optional fields: ${interviewAnswers.optionalFields}
      
      Return ONLY a valid JSON schema object with these properties:
      - "type": "object"
      - "required": [array of required field names]
      - "properties": {object containing all fields with their types and descriptions}
      
      For each field, include:
      - "type": appropriate JSON schema type (string, number, boolean, etc.)
      - "title": human-readable title for the field
      - "description": brief description of what the field is for
      
      The response should be ONLY the JSON schema object, nothing else.
    `;

    // Call the OpenAI API if available
    let responseText = '';
    
    try {
      if (openai) {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that generates JSON schemas for directories.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        });
        responseText = completion.choices[0]?.message?.content || '';
      } else {
        // No OpenAI client available, return a basic schema
        return res.status(200).json({ 
          schema: generateBasicSchema(interviewAnswers),
        });
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return res.status(200).json({ 
        schema: generateBasicSchema(interviewAnswers),
      });
    }
    
    // Try to parse the JSON from the response
    try {
      // Extract JSON if it's wrapped in markdown code blocks or other text
      const jsonMatch = responseText.match(/```(?:json)?([\s\S]*?)```/) || 
                        responseText.match(/({[\s\S]*})/) || 
                        [null, responseText];
      
      const jsonText = jsonMatch[1].trim();
      const schema = JSON.parse(jsonText);
      
      return res.status(200).json({ 
        schema
      });
    } catch (parseError) {
      console.error('Error parsing LLM response as JSON:', parseError);
      console.error('Raw response that failed to parse:', responseText);
      
      return res.status(500).json({ 
        error: 'Failed to parse schema from LLM response',
        rawResponse: responseText,
        parseError: parseError.message,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error: any) {
    // More detailed error logging
    console.error('Error generating schema:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    // Return a more informative error response
    return res.status(500).json({ 
      error: 'Failed to generate schema',
      message: error.message || 'Unknown error occurred',
      code: error.code || 'UNKNOWN_ERROR'
    });
  }
}

// Function to generate a basic schema when OpenAI is not available
function generateBasicSchema(interviewAnswers: InterviewAnswers) {
  const requiredFields = interviewAnswers.requiredFields
    .split(',')
    .map(field => field.trim().toLowerCase())
    .filter(field => field);
    
  const optionalFields = interviewAnswers.optionalFields
    .split(',')
    .map(field => field.trim().toLowerCase())
    .filter(field => field);
  
  const properties: Record<string, any> = {};
  
  // Add required fields
  requiredFields.forEach(field => {
    const fieldName = field.replace(/\s+/g, '_');
    properties[fieldName] = {
      type: 'string',
      title: field.charAt(0).toUpperCase() + field.slice(1),
      description: `The ${field} of the entity`
    };
    
    // Special handling for common field types
    if (field.includes('email')) {
      properties[fieldName].format = 'email';
    } else if (field.includes('url') || field.includes('website')) {
      properties[fieldName].format = 'uri';
    } else if (field.includes('date')) {
      properties[fieldName].format = 'date';
    } else if (field.includes('phone')) {
      properties[fieldName].pattern = '^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$';
    }
  });
  
  // Add optional fields
  optionalFields.forEach(field => {
    const fieldName = field.replace(/\s+/g, '_');
    properties[fieldName] = {
      type: 'string',
      title: field.charAt(0).toUpperCase() + field.slice(1),
      description: `The ${field} of the entity`
    };
    
    // Special handling for common field types
    if (field.includes('email')) {
      properties[fieldName].format = 'email';
    } else if (field.includes('url') || field.includes('website')) {
      properties[fieldName].format = 'uri';
    } else if (field.includes('date')) {
      properties[fieldName].format = 'date';
    } else if (field.includes('phone')) {
      properties[fieldName].pattern = '^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$';
    } else if (field.includes('year')) {
      properties[fieldName].type = 'integer';
    } else if (field.includes('count') || field.includes('number') || field.includes('size')) {
      properties[fieldName].type = 'integer';
    }
  });
  
  // Ensure name is always included
  if (!properties.name) {
    properties.name = {
      type: 'string',
      title: 'Name',
      description: 'The name of the entity'
    };
    
    if (!requiredFields.includes('name')) {
      requiredFields.push('name');
    }
  }
  
  return {
    type: 'object',
    required: requiredFields.map(field => field.replace(/\s+/g, '_')),
    properties: properties
  };
}
