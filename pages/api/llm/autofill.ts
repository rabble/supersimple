import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import { openai } from '../../../lib/llmClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { directoryId, entityName, entityUrl } = req.body;
    
    if (!directoryId || !entityName) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: directoryId and entityName are required' 
      });
    }
    
    // Get the directory schema
    const { data: directory, error: directoryError } = await supabase
      .from('directories')
      .select('schema_json')
      .eq('id', directoryId)
      .single();
    
    if (directoryError || !directory) {
      return res.status(404).json({ 
        success: false, 
        error: 'Directory not found' 
      });
    }

    // Generate data using LLM
    const data = await generateDataWithLLM(directory.schema_json, entityName, entityUrl);
    
    return res.status(200).json({ 
      success: true, 
      data: data
    });
  } catch (error: any) {
    // More detailed error logging
    console.error('Error in autofill:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    // Return a more informative error response
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred during autofill',
      code: error.code || 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString()
    });
  }
}

async function generateDataWithLLM(schema: any, entityName: string, entityUrl?: string) {
  try {
    // Create a description of each field from the schema
    const fieldDescriptions = Object.entries(schema.properties || {})
      .map(([key, field]: [string, any]) => {
        const type = field.type || 'string';
        const description = field.description || '';
        const required = schema.required?.includes(key) ? '(required)' : '(optional)';
        return `- ${key}: ${type} ${required} - ${description}`;
      })
      .join('\n');

    // Construct the prompt for the LLM
    const prompt = `
      I need information about "${entityName}"${entityUrl ? ` (website: ${entityUrl})` : ''}.
      
      Please provide accurate information for a directory listing with the following fields:
      ${fieldDescriptions}
      
      If you don't know the exact information, make a reasonable guess based on the entity name${entityUrl ? ' and website' : ''}.
      Return ONLY a valid JSON object with values for each field. Do not include explanations or markdown formatting.
    `;

    // Call the OpenAI API if available
    let responseText = '';
    
    try {
      if (openai) {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful assistant that provides structured information about organizations and entities.' 
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        });
        responseText = completion.choices[0]?.message?.content || '';
      } else {
        // No OpenAI client available, skip to fallback
        console.log('No OpenAI client available, using fallback data');
        return generateFallbackData(schema, entityName);
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return generateFallbackData(schema, entityName);
    }
    
    // Try to parse the JSON from the response
    try {
      // Extract JSON if it's wrapped in markdown code blocks or other text
      const jsonMatch = responseText.match(/```(?:json)?([\s\S]*?)```/) || 
                        responseText.match(/({[\s\S]*})/) || 
                        [null, responseText];
      
      const jsonText = jsonMatch[1].trim();
      const data = JSON.parse(jsonText);
      
      // Ensure the name field is set to the provided entity name
      data.name = entityName;
      
      return data;
    } catch (parseError) {
      console.error('Error parsing LLM response as JSON:', parseError);
      console.error('Raw response that failed to parse:', responseText);
      // Fall back to mock data if parsing fails
      return generateFallbackData(schema, entityName);
    }
  } catch (error: any) {
    console.error('Error generating data with LLM:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    // Fall back to mock data if LLM call fails
    return generateFallbackData(schema, entityName);
  }
}

// Fallback function that generates basic data if the LLM fails
function generateFallbackData(schema: any, entityName: string) {
  const result: Record<string, any> = {};
  
  // Always include the name field
  result.name = entityName;
  
  // Generate basic data for each field in the schema
  if (schema && schema.properties) {
    Object.entries(schema.properties).forEach(([key, field]: [string, any]) => {
      // Skip the name field as we already set it
      if (key === 'name') return;
      
      switch (field.type) {
        case 'string':
          if (field.format === 'uri' || key.includes('website') || key.includes('url')) {
            result[key] = `https://www.${entityName.toLowerCase().replace(/\s+/g, '')}.com`;
          } else if (key.includes('email')) {
            result[key] = `info@${entityName.toLowerCase().replace(/\s+/g, '')}.com`;
          } else if (key.includes('phone')) {
            result[key] = '+1 (555) 123-4567';
          } else if (key.includes('description')) {
            result[key] = `${entityName} is a leading provider in its industry.`;
          } else if (key.includes('address')) {
            result[key] = '123 Main Street, Anytown, CA 94043';
          } else if (key.includes('logo') || key.includes('image')) {
            result[key] = `https://via.placeholder.com/150?text=${encodeURIComponent(entityName)}`;
          } else {
            result[key] = `Sample ${field.title || key}`;
          }
          break;
        case 'integer':
        case 'number':
          if (key.includes('year')) {
            result[key] = new Date().getFullYear() - 10;
          } else if (key.includes('employee') || key.includes('size')) {
            result[key] = 100;
          } else {
            result[key] = 42;
          }
          break;
        case 'boolean':
          result[key] = true;
          break;
        case 'array':
          result[key] = ['Sample Item 1', 'Sample Item 2'];
          break;
        case 'object':
          result[key] = { key1: 'value1', key2: 'value2' };
          break;
        default:
          result[key] = null;
      }
    });
  }
  
  return result;
}
