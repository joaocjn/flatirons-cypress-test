// Note:
// This test focuses only on validating the plan change functionality,
// and intentionally does not test the checkout form again.
// The checkout modal only appears the first time a credit card is added.
// Since the card remains saved after the first subscription,
// the checkout UI cannot be consistently revalidated on repeated runs.
//
// To test the Stripe checkout form every time, one would need to create
// a new user account on each run. However, this would make the test brittle
// and dependent on multiple chained steps (account creation, email confirmation, etc).
// That approach violates good E2E testing practices — tests must be
// deterministic, isolated, and not rely on prior tests or data.
//
// A better long-term solution would be for the test environment to provide
// a way to reset the user's account state, including subscription status
// and stored payment methods. That would enable complete and repeatable
// testing of the checkout experience without coupling tests.
//
// For that reason, this test assumes the card is already stored
// and focuses on verifying that the user can successfully upgrade the plan.

import billingPage from "../pages/billingPage";

const viewports = [
    { name: "Desktop", width: 1280, height: 720 },
    { name: "Mobile", width: 375, height: 667 },
];

viewports.forEach((viewport) => {
    describe(`Billing Page Tests on ${viewport.name}`, () => {
        before(() => {
            cy.viewport(viewport.width, viewport.height);

            cy.intercept("GET", "**/organizations/plans").as("plans");

            cy.login(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
            cy.visit("account/billing");
        });

        it("As a user, I can subscribe to the Professional Plan using my credit card", () => {
            cy.wait("@plans");

            cy.intercept("PUT", "**/organizations/subscriptions/**").as(
                "updatePlan"
            );

            cy.log("upgrading to professional plan");
            billingPage.clickUpgradePlan();

            cy.wait("@updatePlan");

            billingPage.elements.successUpdateNotification(
                "Plan updated successfully"
            );

            billingPage.elements
                .planCard()
                .contains("professional")
                .parentsUntil("body")
                .contains("Your Plan")
                .should("be.visible")
                .and("have.attr", "disabled");

            cy.log("downgrading to standard plan (reset state)");
            billingPage.clickDowngradePlan();

            cy.wait("@updatePlan");

            billingPage.elements.successUpdateNotification(
                "Plan updated successfully"
            );
            billingPage.elements
                .planCard()
                .contains("standard")
                .parentsUntil("body")
                .contains("Your Plan")
                .should("be.visible")
                .and("have.attr", "disabled");
        });
    });
});
