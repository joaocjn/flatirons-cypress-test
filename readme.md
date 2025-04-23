# Cypress Test Automation Project

This repository contains an end-to-end test automation project developed using **Cypress**, covering three main flows: **Signup**, **Login**, and **Billing**.

> 🧭 This automation project was built for the following platform:  
> **https://staging-fuse-aws.flatirons.com/users/sign-in**

🎥 **Project Walkthrough Video:**  
Watch the video explanation of the project here:  
**[▶️ Click to Watch](https://drive.google.com/file/d/1_U0eJT5vyTyIcSu0_3JaqZ9AdSs1N0n1/view?usp=sharing)**

## 🧪 Project Overview

The goal was to cover three key test scenarios, each one related to a different page. To keep the code maintainable and organized, the **Page Object Model (POM)** design pattern was used, with each page having its own file inside the `pages/` directory.

Each test suite iterates over two viewport types: **desktop** and **mobile**, using `cy.viewport()` combined with a `forEach`. This ensures that all scenarios run across both screen types without duplicating code.

## 📄 Pages and Test Scenarios

### 🔐 Signup

-   Main scenario: `As a user, I can register for the platform.`
-   Before any request is triggered, a `cy.intercept()` is declared to wait for the request to complete before continuing, avoiding flaky tests.
-   Form fields are filled with data generated using the [faker](https://github.com/faker-js/faker) library.
-   Page Object handles elements and methods, while assertions remain in the test script.

### 🔑 Login

-   Main scenarios:
    -   `As a user, I can login to the platform using email and password.`
    -   `As a user, I can login to the platform using GitHub.`
-   Configuration file required: `cypress.env.json` (template provided as `env.example`)
-   Test coverage includes:
    -   Confirmed email user
    -   Unconfirmed email user
    -   GitHub login (pre-authorized user)

### 💳 Billing

-   Uses `cy.session()` to maintain the login session across tests.
-   Follows the same POM structure used in the other pages.

## ⚙️ How to Run the Project

1. Clone this repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Create a `cypress.env.json` file using the structure from `env.example`:

    ```json
    {
        "email": "your-email@example.com",
        "password": "your-password",
        "githubEmail": "github@example.com",
        "githubPassword": "your-github-password",
        "unconfirmedEmail": "unconfirmed@example.com",
        "unconfirmedPassword": "unconfirmed-password"
    }
    ```

4. Run the tests:
    ```bash
    npx cypress open
    # or in headless mode
    npx cypress run
    ```

## ✅ Suggested Improvements

-   Add more login options (e.g., Google/Gmail).
-   Add password visibility toggle for better user experience.
-   Display validation for all required fields, not just the one interacted with.
-   Improve mobile layout for the Billing page (currently compressed and misaligned).
-   Fix bug: Using the browser's back button on the Stripe embedded checkout breaks interactions and triggers a loading state.

---

Made with ❤️ by João Cândido.
