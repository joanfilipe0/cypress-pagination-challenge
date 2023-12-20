// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />


beforeEach(() => {
  cy.visit('public/index.html')
})

it('should click on the "Next to End" button', () => {

  // Click the "Next to End" button
  cy.get('.pagecontroller-l').click({ multiple: true, force: true });

  cy.get('[value=next]').should('be.disabled')
  cy.get('[value=last]').should('be.disabled')
})

it('should click the "Next" button until reaching the last page', () => {
  const clickNextUntilDisabled = () => {
    cy.get('.pagecontroller-n').then(($button) => {
      if ($button.is(':disabled')) {
        // If the button is disabled, exit the recursion
        return;
      }

      // Click the "Next" button and recursively call the function
      cy.get('.pagecontroller-n').click({ force: true });
      clickNextUntilDisabled();
    });
  };

  // Call the function for the first time to start the process
  clickNextUntilDisabled();

  // Confirm that we are on the last page
  cy.get('.pagecontroller-n').should('be.disabled');
  cy.get('.pagecontroller-l').should('be.disabled');

})

it('should directly access a specific page', () => {

  // Replace with the desired page number
  const desiredPage = 2;

  // Click on the desired page
  cy.get('.pagecontroller-num').contains(desiredPage).click();

  // Confirm that we are on the desired page
  cy.get('.pagecontroller-num').eq(desiredPage - 1).should('have.class', 'currentPage');
})

it('should change the quantity of items per page', () => {

  // Replace with the desired quantity
  const desiredQuantity = 10;

  // Select the items per page dropdown and change it
  cy.get('#numrows').select('10', { force: true });

  // Checks whether the number of visible elements is equal to the selected number
  cy.get('tbody tr:visible').should('have.length', desiredQuantity);

})

it('should test the search First Name functionality', () => {

  // Replace with the desired text
  const searchText = 'K';

  // Type text into the search input
  cy.get('#filter_input').type(searchText);

  // Confirm that the table rows are filtered correctly
  cy.get('tbody tr:visible td:nth-child(2)').should('contain', searchText);
 
})

it('should test the search Last Name functionality', () => {

  cy.get('#filter_by').select('Last Name', { force: true });

  // Replace with the desired text
  const searchText = 'K';

  // Type text into the search input
  cy.get('#filter_input').type(searchText);

  // Confirm that the table rows are filtered correctly
  cy.get('tbody tr:visible td:nth-child(3)').should('contain', searchText);
})

it('should test the search Points functionality', () => {

  cy.get('#filter_by').select('Points', { force: true });

  // Replace with the desired text
  const searchText = '6';

  // Type text into the search input
  cy.get('#filter_input').type(searchText);

  // Confirm that the table rows are filtered correctly
  cy.get('tbody tr:visible td:nth-child(4)').should('contain', searchText);
})