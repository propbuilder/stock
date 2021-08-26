/// <reference types="Cypress" />
// above directive is for intellisense to show intelligent code
// suggestions by cypress code snippet extension.

describe('Visit the stock widget', () => {
    beforeEach(() => {
        cy.stubSetup();
        cy.visit('http://localhost:3001/')
    });

    it('1. Search dashboard for the widget should be loaded', () => {
        cy.contains('h3.widget-header', 'Stock Widget');
    });

    it('2. search bar should be visible', () => {
        cy.get('[data-testid="searchBar"]').should('be.visible');
    });

    it('3. search bar should have focus on load', () => {
        cy.focused().should('have.attr', 'id').and('eq', 'autocomplete');
    });

    it('4. Entering few characters should show up auto suggestions', () => {
        cy.get('[data-testid="searchBar"]').as('searchBar');
        cy.get('@searchBar').type('tes');
    });

    it('5. Clicking on an option should open the search result page', () => {
        cy.get('[data-testid="searchBar"]').as('searchBar');
        cy.get('@searchBar').type('tes');
        cy.get('[id="autocomplete-option-0"]').click();
        cy.get('[data-testid="searchResult"]').should('be.visible');
    });

    it('6. Clearing out search input should remove search results', () => {
        cy.get('[data-testid="searchBar"]').as('searchBar');
        cy.get('@searchBar').type('tes');
        cy.get('[id="autocomplete-option-0"]').click();
        cy.get('@searchBar').type('{backspace}');
        cy.get('@searchBar').type('{backspace}');
        cy.get('@searchBar').type('{backspace}');
        cy.get('@searchBar').type('{backspace}');
        cy.get('@searchBar').type('{backspace}');
        cy.get('@searchBar').type('{backspace}');
        cy.get('@searchBar').type('{backspace}');
        cy.get('@searchBar').type('{backspace}');
    });
});