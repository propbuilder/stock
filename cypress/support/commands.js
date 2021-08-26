/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('stubSetup', (email, password) => {
    cy.intercept('GET', `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tes&apikey=QSYIQ6FJDFZUSUFX`, req => {
        req.reply({ fixture: 'mockSearchApi.json' });
  });

  cy.intercept('GET', `https://www.alphavantage.co/query?function=OVERVIEW&symbol=TESC.FRK&apikey=QSYIQ6FJDFZUSUFX`, req => {
        req.reply({ fixture: 'mockStockDetails.json' });
  });

})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
