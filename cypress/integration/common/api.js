import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(`fethcing product list made to the products endpoint`, () => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:4000/products',
    headers: {
      'Content-Type': 'application/json',
    },
    failOnStatusCode: false
  }).then((res) => cy.wrap(res).should('not.be.empty'));
})