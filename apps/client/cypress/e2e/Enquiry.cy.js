describe('empty spec', () => {
  it('create a new enquiry', () => {
    cy.visit("localhost:5173/enquiry");

    cy.get("#enquiry-name-input").type("Sarah and Philip").should("have.value", "Sarah and Philip");
    cy.get("#enquiry-email-input").type("sarah@mail.com").should("have.value", "sarah@mail.com");
    cy.get("#enquiry-contact-input").type("90081221").should("have.value", "90081221");
    cy.get("#enquiry-date-input").type("2022-08-26").should("have.value", "2022-08-26");
    cy.get("#enquiry-description-input").type("Looking for balloon decor for our wedding ballroom. Have some photos we can share during our consult!").should("have.value", "Looking for balloon decor for our wedding ballroom. Have some photos we can share during our consult!");
    cy.get("#submit-enquiry-btn").click();

    cy.checkToastMessage("enquiry-success-msg", "Your enquiry has been submitted!");
    cy.get("#enquiry-name-input").should("have.value", "");
  })
})