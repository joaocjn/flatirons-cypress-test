class signInPage {
    elements = {
        emailInput: () => cy.get('input#email[data-cy="html-input"]'),
        passwordInput: () => cy.get('input#password[data-cy="html-input"]'),
        signInBtn: () => cy.get('div[data-cy="SignIn"]', { timeout: 8000 }),
        signInGithubBtn: () =>
            cy.get('div[role="button"]:contains("Sign in with Github")', {
                timeout: 8000,
            }),
        signInGithubPageBtn: () =>
            cy.get("input[type='submit']:contains(Sign in)"),
        signInTitle: (message) =>
            cy.contains('div[data-cy="sign-in-title"]', message),
        successTitle: (message) =>
            cy.contains('[data-cy="importerTitle"]', message),
        inputErrorMessage: (inputName, message) =>
            cy.contains(`div[name=${inputName}] div.sc-gWoSmj`, message),
        invalidLoginErrorNotification: (message) =>
            cy.contains("div.sc-kDvujY", message),
    };

    typeEmail(email) {
        this.elements
            .emailInput()
            .scrollIntoView()
            .should("be.visible")
            .type(email);
    }
    typePassword(password) {
        this.elements
            .passwordInput()
            .scrollIntoView()
            .should("be.visible")
            .type(password);
    }

    clickSignIn() {
        this.elements.signInBtn().scrollIntoView().should("be.visible").click();
    }
    clickSignInGithub() {
        this.elements
            .signInGithubBtn()
            .scrollIntoView()
            .should("be.visible")
            .click();
    }
}

module.exports = new signInPage();
