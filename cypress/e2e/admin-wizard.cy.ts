describe('Admin Directory Creation Wizard', () => {
  // Use environment variables or hardcoded test credentials that exist in your system
  const adminEmail = Cypress.env('ADMIN_EMAIL') || 'admin@directory-saas.com';
  const adminPassword = Cypress.env('ADMIN_PASSWORD') || 'testpassword';
  const directoryName = 'Test Directory ' + new Date().getTime();
  
  beforeEach(() => {
    // Clear cookies and local storage between tests
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should allow an admin to create a new directory', () => {
    // Login as admin
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(adminEmail);
    cy.get('input[name="password"]').type(adminPassword);
    cy.get('form').submit();
    
    // Wait for dashboard to load
    cy.url().should('include', '/dashboard');
    
    // Navigate to create directory wizard
    cy.visit('/admin/create-directory');
    cy.url().should('include', '/admin/create-directory');
    
    // Step 1: Basic Info
    cy.get('input#name').type(directoryName);
    cy.get('textarea#description').type('This is a test directory created by Cypress');
    cy.get('input#domain').type('test-domain');
    cy.contains('button', 'Next').click();
    
    // Step 2: Interview
    cy.get('input#directoryType').type('Business Directory');
    cy.get('textarea#exampleOrganizations').type('Google, Apple, Microsoft');
    cy.get('textarea#requiredFields').type('Name, Website, Industry');
    cy.get('textarea#optionalFields').type('Description, Founded Year, Employee Count');
    cy.contains('button', 'Next').click();
    
    // Wait for schema generation
    cy.contains('Generating schema', { timeout: 15000 });
    cy.contains('Schema generated successfully', { timeout: 30000 });
    
    // Step 3: Schema Editor
    cy.contains('button', 'Next').click();
    
    // Step 4: Review
    cy.contains(directoryName);
    cy.contains('button', 'Create Directory').click();
    
    // Verify success
    cy.contains('Directory created successfully', { timeout: 10000 });
    cy.url().should('include', '/admin/directories');
    
    // Verify the directory appears in the list
    cy.contains(directoryName);
  });
});
