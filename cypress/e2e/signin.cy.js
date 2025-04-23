import signInPage from "../pages/signInPage";

const viewports = [
    { name: "Desktop", width: 1280, height: 720 },
    { name: "Mobile", width: 375, height: 667 },
];

viewports.forEach((viewport) => {
    describe(`Sign In Page Tests on ${viewport.name}`, () => {
        beforeEach(() => {
            cy.viewport(viewport.width, viewport.height);
            cy.visit("users/sign-in");
        });

        it("As a user, I can login to the platform using email and password", () => {
            cy.intercept("POST", "**/users/sessions").as("userLogin");

            signInPage.typeEmail(Cypress.env("EMAIL"));
            signInPage.typePassword(Cypress.env("PASSWORD"));

            signInPage.clickSignIn();

            cy.wait("@userLogin");

            cy.url().should("include", "/account/importers");
            signInPage.elements
                .successTitle("Importers")
                .scrollIntoView()
                .should("be.visible");
        });

        it("As a user, I can login to the platform using GitHub", () => {
            cy.intercept("POST", "**/users/sessions").as("userLogin");

            signInPage.clickSignInGithub();

            cy.origin("https://github.com", () => {
                cy.get("input#login_field").type(
                    Cypress.env("GITHUB_USERNAME")
                );
                cy.get("input#password").type(Cypress.env("GITHUB_PASSWORD"));

                cy.get("input.js-sign-in-button[type='submit']").click();
            });

            cy.wait("@userLogin");

            cy.url().should("include", "/account/importers");
            signInPage.elements
                .successTitle("Importers")
                .scrollIntoView()
                .should("be.visible");
        });

        it("should show error for incorrect email or password", () => {
            cy.intercept("POST", "**/users/sessions").as("userLogin");

            signInPage.typeEmail("joao_test_Morar@gmail.com");
            signInPage.typePassword("AAAAAA");

            signInPage.clickSignIn();

            cy.wait("@userLogin");

            signInPage.elements
                .invalidLoginErrorNotification("Invalid email or password")
                .scrollIntoView()
                .should("be.visible");
            signInPage.elements
                .signInTitle("Sign In")
                .scrollIntoView()
                .should("be.visible");
        });

        it("should show error when fields are left blank", () => {
            signInPage.clickSignIn();

            signInPage.elements
                .inputErrorMessage("email", "Email is required")
                .scrollIntoView()
                .should("be.visible");
            signInPage.elements
                .inputErrorMessage("password", "This is a required field")
                .scrollIntoView()
                .should("be.visible");

            signInPage.elements
                .signInTitle("Sign In")
                .scrollIntoView()
                .should("be.visible");
        });

        it("should validate invalid email format", () => {
            signInPage.typeEmail("joao_test");
            signInPage.elements
                .inputErrorMessage("email", "Invalid email")
                .scrollIntoView()
                .should("be.visible");
        });

        it("should show an error when trying to log in with an unconfirmed email", () => {
            cy.intercept("POST", "**/users/sessions").as("userLogin");

            signInPage.typeEmail(Cypress.env("UNCONFIRMED_EMAIL"));
            signInPage.typePassword(Cypress.env("UNCONFIRMED_PASSWORD"));

            signInPage.clickSignIn();

            cy.wait("@userLogin");

            signInPage.elements
                .invalidLoginErrorNotification(
                    "You have to confirm your email address before continuing."
                )
                .scrollIntoView()
                .should("be.visible");
            signInPage.elements
                .signInTitle("Sign In")
                .scrollIntoView()
                .should("be.visible");
        });

        it("should disable the Sign Ip button when any required field is invalid", () => {
            signInPage.typeEmail("joao_test");
            signInPage.elements
                .signInBtn()
                .scrollIntoView()
                .should("have.attr", "disabled");
        });
    });
});
