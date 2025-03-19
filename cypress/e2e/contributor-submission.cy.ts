describe('Contributor Listing Submission', () => {
  // Use environment variables or hardcoded test credentials that exist in your system
  const contributorEmail = Cypress.env('CONTRIBUTOR_EMAIL') || 'contributor@directory-saas.com';
  const contributorPassword = Cypress.env('CONTRIBUTOR_PASSWORD') || 'testpassword';
  const organizationName = 'Test Organization ' + new Date().getTime();
  
  beforeEach(() => {
    // Clear cookies and local storage between tests
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should allow a contributor to submit a new listing with autofill', () => {
    // Login as contributor
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(contributorEmail);
    cy.get('input[name="password"]').type(contributorPassword);
    cy.get('form').submit();
    
    // Wait for dashboard to load
    cy.url().should('include', '/dashboard');
    
    // Navigate to directories page
    cy.visit('/directories');
    
    // Click on the first directory
    cy.get('a[href^="/directories/"]').first().click();
    
    // Click on "Submit Listing" button
    cy.contains('a', 'Submit Listing').click();
    
    // Use autofill
    cy.get('textarea[placeholder*="Enter organization name"]').type(organizationName);
    cy.contains('button', 'Autofill').click();
    
    // Wait for autofill to complete
    cy.contains('button', 'Autofilling...').should('exist');
    cy.contains('button', 'Autofilling...').should('not.exist', { timeout: 15000 });
    
    // Verify some fields were filled
    cy.get('input[id="name"]').should('have.value', organizationName);
    
    // Submit the form
    cy.contains('button', 'Submit').click();
    
    // Verify success
    cy.contains('Your listing has been submitted successfully', { timeout: 10000 });
    
    // Should redirect back to directory page
    cy.url().should('include', '/directories/');
  });
});
