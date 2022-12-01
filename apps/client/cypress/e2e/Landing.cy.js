describe("landing spec", () => {
  it("login redirects to the login page", () => {
    cy.visit("localhost:5173");

    cy.get("#landing").children(1).contains("login").click();

    cy.url().should("include", "/login")
  })

  it("submit enquiry", () => {
    cy.visit("localhost:5173");

    cy.get("#landing").children(2).contains("submit enquiry").click();
  })
})