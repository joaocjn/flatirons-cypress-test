import signUpPage from "../pages/signUpPage";

const viewports = [
    { name: "Desktop", width: 1280, height: 720 },
    { name: "Mobile", width: 375, height: 667 },
];

viewports.forEach((viewport) => {
    describe(`Sign Up Page Tests on ${viewport.name}`, () => {
        beforeEach(() => {
            cy.viewport(viewport.width, viewport.height);
            cy.visit("users/sign-up");
        });

        it("As a user, I can register for the platform", () => {
            cy.intercept("POST", "**/users/registrations").as(
                "userRegistration"
            );

            signUpPage.generateRandomData();
            signUpPage.typeName();
            signUpPage.typeLastName();
            signUpPage.typeCompanyName();
            signUpPage.typeEmail();
            signUpPage.typePassword();

            signUpPage.clickSignUp();

            cy.wait("@userRegistration");

            signUpPage.elements
                .successTitle("Check your email!")
                .scrollIntoView()
                .should("be.visible");
            signUpPage.elements
                .successEmail(signUpPage.randomData.email)
                .scrollIntoView()
                .should("be.visible");
        });

        it("should show required field errors when leaving these blank", () => {
            signUpPage.clickSignUp();

            signUpPage.elements
                .inputErrorMessage("first_name", "First Name is required")
                .scrollIntoView()
                .should("be.visible");
            signUpPage.elements
                .inputErrorMessage("last_name", "Last Name is required")
                .scrollIntoView()
                .should("be.visible");
            signUpPage.elements
                .inputErrorMessage("company_name", "Company Name is required")
                .scrollIntoView()
                .should("be.visible");
            signUpPage.elements
                .inputErrorMessage("email", "Email is required")
                .scrollIntoView()
                .should("be.visible");
            signUpPage.elements
                .inputErrorMessage("password", "Password is required")
                .scrollIntoView()
                .should("be.visible");

            signUpPage.elements
                .signUpTitle("Create an Account")
                .scrollIntoView()
                .should("be.visible");
        });

        it("should validate invalid email format", () => {
            signUpPage.typeEmail("joao_test");
            signUpPage.elements
                .inputErrorMessage("email", "Invalid email")
                .should("be.visible");
        });

        it("should show error if email is already in use", () => {
            cy.intercept("POST", "**/users/registrations").as(
                "userRegistration"
            );

            signUpPage.generateRandomData();
            signUpPage.typeName();
            signUpPage.typeLastName();
            signUpPage.typeCompanyName();
            signUpPage.typeEmail("joao_test_Morar@gmail.com");
            signUpPage.typePassword();

            signUpPage.clickSignUp();

            cy.wait("@userRegistration");

            signUpPage.elements
                .duplicateEmailErrorNotification(
                    "This email already has an account. Please try logging in"
                )
                .should("be.visible");
            signUpPage.elements
                .signUpTitle("Create an Account")
                .scrollIntoView()
                .should("be.visible");
        });

        it("should display validation errors for invalid password formats", () => {
            const errorMessage =
                "Passwords must contain at least 6 characters and maximum of 128 characters, including at least 1 letter, 1 number and 1 special character.";

            cy.log("password with less than 6 characters");
            signUpPage.typePassword("Mn12@");
            signUpPage.elements
                .inputErrorMessage("password", errorMessage)
                .should("be.visible");
            signUpPage.elements.passwordInput().clear();

            cy.log("password with more than 128 characters");
            signUpPage.typePassword(
                "Mn12@daaaaaaaaaaaaaaaabbbbbbbbbbbbccccccccccccaaaaaaaabbbbbbbbbbbcccccccccccaaaaaaabbbbbbbccccccccccaaaaaaaaaaaaaabbbbbbbbbcccccc"
            );
            signUpPage.elements
                .inputErrorMessage("password", errorMessage)
                .should("be.visible");
            signUpPage.elements.passwordInput().clear();

            cy.log("password without uppercase letters");
            signUpPage.typePassword("mn12@d");
            signUpPage.elements
                .inputErrorMessage("password", errorMessage)
                .should("be.visible");
            signUpPage.elements.passwordInput().clear();

            cy.log("password without numbers");
            signUpPage.typePassword("Mnaa@d");
            signUpPage.elements
                .inputErrorMessage("password", errorMessage)
                .should("be.visible");
            signUpPage.elements.passwordInput().clear();

            cy.log("password without special characters");
            signUpPage.typePassword("Mn12ad");
            signUpPage.elements
                .inputErrorMessage("password", errorMessage)
                .should("be.visible");
        });

        it("should disable the Sign Up button when any required field is invalid", () => {
            signUpPage.typeEmail("joao_test");
            signUpPage.elements
                .signUpBtn()
                .scrollIntoView()
                .should("have.attr", "disabled");
        });
    });
});
