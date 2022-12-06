describe('empty spec', () => {
  it('create a new enquiry', () => {
    cy.visit("localhost:5173/enquiry");

    cy.get("#enquiry-name-input").type("Sarah and Philip").should("have.value", "Sarah and Philip");
    cy.get("#enquiry-email-input").type("sarah-philip@mail.com").should("have.value", "sarah-philip@mail.com");
    cy.get("#enquiry-contact-input").type("93117812").should("have.value", "93117812");
    cy.get("#enquiry-date-input").type("2022-08-26").should("have.value", "2022-08-26");
    cy.get("#enquiry-description-input").type("Looking for balloon decor for our wedding ballroom. Have some photos we can share during our consult!").should("have.value", "Looking for balloon decor for our wedding ballroom. Have some photos we can share during our consult!");
    cy.get("#submit-enquiry-btn").click();

    cy.checkToastMessage("enquiry-success-msg", "Your enquiry has been successfully submitted!");
    cy.get("#enquiry-name-input").should("have.value", "");
  })

  it("reroute to the login page", () => {
    cy.get("#go-to-login").click();

    cy.url().should("include", "/login");
    cy.get("#login-legend").contains("too long; read later");
  })
})