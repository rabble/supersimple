describe('Edge Cases', () => {
  // Use environment variables or hardcoded test credentials that exist in your system
  const adminEmail = Cypress.env('ADMIN_EMAIL') || 'admin@directory-saas.com';
  const adminPassword = Cypress.env('ADMIN_PASSWORD') || 'testpassword';
  const contributorEmail = Cypress.env('CONTRIBUTOR_EMAIL') || 'contributor@directory-saas.com';
  const contributorPassword = Cypress.env('CONTRIBUTOR_PASSWORD') || 'testpassword';
  
  beforeEach(() => {
    // Clear cookies and local storage between tests
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should handle invalid listing data submission', () => {
    // Login as contributor
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(contributorEmail);
    cy.get('input[name="password"]').type(contributorPassword);
    cy.get('form').submit();
    
    // Navigate to directories page
    cy.visit('/directories');
    
    // Click on the first directory
    cy.get('a[href^="/directories/"]').first().click();
    
    // Click on "Submit Listing" button
    cy.contains('a', 'Submit Listing').click();
    
    // Submit the form without filling required fields
    cy.contains('button', 'Submit').click();
    
    // Should show validation error
    cy.contains('Error').should('be.visible');
  });

  it('should prevent non-admin from accessing admin pages', () => {
    // Login as contributor
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(contributorEmail);
    cy.get('input[name="password"]').type(contributorPassword);
    cy.get('form').submit();
    
    // Try to access admin page
    cy.visit('/admin/pending-listings');
    
    // Should be redirected away from admin page
    cy.url().should('not.include', '/admin/pending-listings');
  });

  it('should handle LLM fallback when autofilling', () => {
    // This test assumes the OPENAI_API_KEY might be missing or invalid
    
    // Login as contributor
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(contributorEmail);
    cy.get('input[name="password"]').type(contributorPassword);
    cy.get('form').submit();
    
    // Navigate to directories page
    cy.visit('/directories');
    
    // Click on the first directory
    cy.get('a[href^="/directories/"]').first().click();
    
    // Click on "Submit Listing" button
    cy.contains('a', 'Submit Listing').click();
    
    // Use autofill with a random organization name
    const randomOrg = 'Random Org ' + new Date().getTime();
    cy.get('textarea[placeholder*="Enter organization name"]').type(randomOrg);
    cy.contains('button', 'Autofill').click();
    
    // Wait for autofill to complete (should work even with fallback)
    cy.contains('button', 'Autofilling...').should('exist');
    cy.contains('button', 'Autofilling...').should('not.exist', { timeout: 15000 });
    
    // Some data should be filled in regardless of LLM availability
    cy.get('input[id="name"]').should('have.value', randomOrg);
  });
});
