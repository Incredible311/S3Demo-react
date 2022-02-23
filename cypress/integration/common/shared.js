import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`I visit the URL {string}`, (URL) => {
  cy.visit(URL, { log: false, onBeforeLoad: (win) => cy.stub(win, 'open') });
  cy.wait(1500, { log: false });
})

Then(`I should see product list`, () => {
  cy.get('.MuiGrid-root')
  .should('exist');

  cy.get('.product-card')
  .should('exist');

  cy.get('.product-image')
  .should('exist');
})

Then(`I should mouseover on first product`, () => {
  cy.get('.product-image-content').first().trigger('mouseover');
})

Then(`Add cart button should be visible`, () => {
  cy.get('.add-to-cart-btn').first().should('exist');
})