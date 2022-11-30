describe('home spec', () => {
  it("home page restricted without login", () => {
    cy.visit("localhost:5173/home");
    cy.get("#no-login-msg").contains("please log in to view this page")
  })
})