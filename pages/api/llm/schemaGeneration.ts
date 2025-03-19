import type { NextApiRequest, NextApiResponse } from 'next';

type SchemaGenerationRequest = {
  name: string;
  description: string;
  domain: string;
  interviewAnswers: {
    directoryType: string;
    exampleOrganizations: string;
    requiredFields: string;
    optionalFields: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      name,
      description,
      domain,
      interviewAnswers 
    } = req.body as SchemaGenerationRequest;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Directory name is required' });
    }

    if (!interviewAnswers?.directoryType) {
      return res.status(400).json({ error: 'Directory type is required' });
    }

    // This is a mock implementation - in a real app, you would call an actual LLM API
    // Generate a mock schema based on the directory type
    const directoryType = interviewAnswers.directoryType.toLowerCase();
    
    let schema;
    
    if (directoryType.includes('business') || directoryType.includes('company')) {
      schema = {
        type: 'object',
        required: ['name', 'industry'],
        properties: {
          name: { type: 'string', title: 'Company Name' },
          description: { type: 'string', title: 'Description' },
          website: { type: 'string', format: 'uri', title: 'Website URL' },
          industry: { type: 'string', title: 'Industry' },
          yearFounded: { type: 'integer', title: 'Year Founded' },
          employees: { type: 'integer', title: 'Number of Employees' },
          headquarters: { type: 'string', title: 'Headquarters' }
        }
      };
    } else if (directoryType.includes('restaurant') || directoryType.includes('food')) {
      schema = {
        type: 'object',
        required: ['name', 'cuisine'],
        properties: {
          name: { type: 'string', title: 'Restaurant Name' },
          description: { type: 'string', title: 'Description' },
          cuisine: { type: 'string', title: 'Cuisine Type' },
          address: { type: 'string', title: 'Address' },
          website: { type: 'string', format: 'uri', title: 'Website URL' },
          phone: { type: 'string', title: 'Phone Number' },
          priceRange: { type: 'string', title: 'Price Range' },
          openingHours: { type: 'string', title: 'Opening Hours' }
        }
      };
    } else if (directoryType.includes('person') || directoryType.includes('people')) {
      schema = {
        type: 'object',
        required: ['firstName', 'lastName'],
        properties: {
          firstName: { type: 'string', title: 'First Name' },
          lastName: { type: 'string', title: 'Last Name' },
          email: { type: 'string', format: 'email', title: 'Email' },
          profession: { type: 'string', title: 'Profession' },
          bio: { type: 'string', title: 'Biography' },
          location: { type: 'string', title: 'Location' },
          website: { type: 'string', format: 'uri', title: 'Website' }
        }
      };
    } else {
      // Default generic schema
      schema = {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', title: 'Name' },
          description: { type: 'string', title: 'Description' },
          category: { type: 'string', title: 'Category' },
          website: { type: 'string', format: 'uri', title: 'Website' }
        }
      };
    }

    // Process required fields from the interview
    if (interviewAnswers.requiredFields) {
      const requiredFields = interviewAnswers.requiredFields
        .split(',')
        .map(field => field.trim().toLowerCase())
        .filter(Boolean);
      
      requiredFields.forEach(field => {
        const fieldKey = field.replace(/\s+/g, '');
        if (!schema.properties[fieldKey]) {
          schema.properties[fieldKey] = { 
            type: 'string', 
            title: field.charAt(0).toUpperCase() + field.slice(1) 
          };
          
          if (!schema.required.includes(fieldKey)) {
            schema.required.push(fieldKey);
          }
        }
      });
    }

    // Process optional fields from the interview
    if (interviewAnswers.optionalFields) {
      const optionalFields = interviewAnswers.optionalFields
        .split(',')
        .map(field => field.trim().toLowerCase())
        .filter(Boolean);
      
      optionalFields.forEach(field => {
        const fieldKey = field.replace(/\s+/g, '');
        if (!schema.properties[fieldKey]) {
          schema.properties[fieldKey] = { 
            type: 'string', 
            title: field.charAt(0).toUpperCase() + field.slice(1) 
          };
        }
      });
    }

    // Add metadata
    schema.metadata = {
      directoryName: name,
      directoryDescription: description,
      domain: domain,
      generatedAt: new Date().toISOString()
    };

    // Simulate a delay to make it feel like the LLM is "thinking"
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return the generated schema
    res.status(200).json({ schema });
  } catch (error) {
    console.error('Error generating schema:', error);
    res.status(500).json({ error: 'Failed to generate schema' });
  }
}
