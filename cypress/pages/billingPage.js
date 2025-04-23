class billingPage {
    elements = {
        downgradePlanBtn: () =>
            cy.get('div[data-cy="planButton"]:contains("Downgrade")'),
        upgradePlanBtn: () =>
            cy.get('div[data-cy="planButton"]:contains("Upgrade")'),
        planCard: () => cy.get('[data-cy="plan-title"]'),
        successUpdateNotification: (message) =>
            cy.contains("div.sc-kDvujY", message),
    };

    clickDowngradePlan() {
        this.elements
            .downgradePlanBtn()
            .scrollIntoView()
            .should("be.visible")
            .click();
    }
    clickUpgradePlan() {
        this.elements
            .upgradePlanBtn()
            .scrollIntoView()
            .should("be.visible")
            .click();
    }
}

module.exports = new billingPage();
