const { faker } = require("@faker-js/faker");

class signUpPage {
    elements = {
        nameInput: () => cy.get('input#first_name[data-cy="html-input"]'),
        lastNameInput: () => cy.get('input#last_name[data-cy="html-input"]'),
        companyNameInput: () =>
            cy.get('input#company_name[data-cy="html-input"]'),
        emailInput: () => cy.get('input#email[data-cy="html-input"]'),
        passwordInput: () => cy.get('input#password[data-cy="html-input"]'),
        signUpBtn: () => cy.get('button[data-cy="SignUp"]', { timeout: 8000 }),
        signUpTitle: (message) =>
            cy.contains('div[data-cy="sign-up-title"]', message),
        successTitle: (message) => cy.contains("div.sc-hmTbGb", message),
        successEmail: (email) => cy.contains("div.sc-czurPZ", email),
        inputErrorMessage: (inputName, message) =>
            cy.contains(`div[name=${inputName}] div.sc-gWoSmj`, message),
        duplicateEmailErrorNotification: (message) =>
            cy.contains("div.sc-kDvujY", message),
    };

    generateRandomData() {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const companyName = faker.company.name();
        const email = faker.internet.email(firstName);
        const password = faker.internet.password(
            6,
            false,
            /[A-Za-z0-9!@#$%^&*()]/,
            "Ab1@"
        );

        this.randomData = {
            firstName,
            lastName,
            companyName,
            email,
            password,
        };
    }

    typeName() {
        this.elements
            .nameInput()
            .scrollIntoView()
            .should("be.visible")
            .type(this.randomData.firstName);
    }
    typeLastName() {
        this.elements
            .lastNameInput()
            .scrollIntoView()
            .should("be.visible")
            .type(this.randomData.lastName);
    }
    typeCompanyName() {
        this.elements
            .companyNameInput()
            .scrollIntoView()
            .should("be.visible")
            .type(this.randomData.companyName);
    }
    typeEmail(email) {
        this.elements
            .emailInput()
            .scrollIntoView()
            .should("be.visible")
            .type(email || this.randomData.email);
    }
    typePassword(password) {
        this.elements
            .passwordInput()
            .scrollIntoView()
            .should("be.visible")
            .type(password || this.randomData.password);
    }

    clickSignUp() {
        this.elements.signUpBtn().scrollIntoView().should("be.visible").click();
    }
}

module.exports = new signUpPage();
