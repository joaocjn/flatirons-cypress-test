Cypress.Commands.add("login", (email, password) => {
    cy.session([email, password], () => {
        cy.visit("users/sign-in");
        cy.get('input#email[data-cy="html-input"]').type(email);
        cy.get('input#password[data-cy="html-input"]').type(password);
        cy.get('div[data-cy="SignIn"]', { timeout: 8000 }).click();
        cy.url().should("contain", "/account/importers");
    });
});
