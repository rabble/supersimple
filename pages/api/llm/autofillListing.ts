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
    const { directoryId, entityName } = req.body;
    
    if (!directoryId || !entityName) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: directoryId and entityName are required' 
      });
    }
    
    // Get the directory schema
    const { data: directory, error: directoryError } = await supabase
      .from('directories')
      .select('schema')
      .eq('id', directoryId)
      .single();
    
    if (directoryError || !directory) {
      return res.status(404).json({ 
        success: false, 
        error: 'Directory not found' 
      });
    }
    
    // Use OpenAI if available, otherwise fall back to mock data
    let autofillData;
    
    if (openai) {
      try {
        // Create a prompt for the OpenAI API
        const prompt = `Please provide information about "${entityName}" formatted as a JSON object with the following fields based on this schema: ${JSON.stringify(directory.schema)}. Return ONLY valid JSON without any explanation or markdown formatting.`;
        
        // Call the OpenAI API
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
        
        // Extract the response text
        const responseText = completion.choices[0]?.message?.content || '';
        
        // Try to parse the JSON from the response
        try {
          autofillData = JSON.parse(responseText);
          console.log('Successfully parsed OpenAI response:', autofillData);
        } catch (parseError) {
          console.error('Failed to parse OpenAI response:', responseText);
          // Fall back to mock data if parsing fails
          autofillData = generateMockData(directory.schema, entityName);
        }
      } catch (openaiError) {
        console.error('Error calling OpenAI:', openaiError);
        // Fall back to mock data if OpenAI call fails
        autofillData = generateMockData(directory.schema, entityName);
      }
    } else {
      // No OpenAI client available, use mock data
      console.log('No OpenAI client available, using mock data');
      autofillData = generateMockData(directory.schema, entityName);
    }
    
    return res.status(200).json({ 
      success: true, 
      data: autofillData 
    });
  } catch (error: any) {
    console.error('Error in autofill:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred during autofill' 
    });
  }
}

// Generate mock data based on schema and entity name
function generateMockData(schema: any, entityName: string) {
  const result: Record<string, any> = {};
  
  // Always include the name field
  result.name = entityName;
  
  // Generate mock data for each field in the schema
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
            result[key] = `${entityName} is a leading provider in its industry, known for quality and innovation.`;
          } else if (key.includes('address')) {
            result[key] = '123 Main Street, Anytown, CA 94043';
          } else if (key.includes('logo') || key.includes('image')) {
            result[key] = `https://via.placeholder.com/150?text=${encodeURIComponent(entityName)}`;
          } else {
            result[key] = `Sample ${field.title || key} for ${entityName}`;
          }
          break;
        case 'integer':
        case 'number':
          if (key.includes('year')) {
            result[key] = 2010;
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
