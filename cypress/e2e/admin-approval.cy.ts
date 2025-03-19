describe('Admin Listing Approval', () => {
  // Use environment variables or hardcoded test credentials that exist in your system
  const adminEmail = Cypress.env('ADMIN_EMAIL') || 'admin@directory-saas.com';
  const adminPassword = Cypress.env('ADMIN_PASSWORD') || 'testpassword';
  
  beforeEach(() => {
    // Clear cookies and local storage between tests
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should allow an admin to approve a pending listing', () => {
    // Login as admin
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(adminEmail);
    cy.get('input[name="password"]').type(adminPassword);
    cy.get('form').submit();
    
    // Wait for dashboard to load
    cy.url().should('include', '/dashboard');
    
    // Navigate to pending listings page
    cy.visit('/admin/pending-listings');
    
    // Check if there are any pending listings
    cy.get('body').then(($body) => {
      if ($body.text().includes('No pending listings found')) {
        cy.log('No pending listings to approve');
      } else {
        // Click approve on the first pending listing
        cy.contains('button', 'Approve').first().click();
        
        // Verify the listing was approved
        cy.contains('Listing approved successfully', { timeout: 10000 });
        
        // The approved listing should no longer be in the pending list
        cy.reload();
        cy.get('body').then(($newBody) => {
          if ($newBody.find('button:contains("Approve")').length === 0) {
            cy.log('All listings have been approved');
          } else {
            cy.log('There are still pending listings');
          }
        });
      }
    });
  });
});
