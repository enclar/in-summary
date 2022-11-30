describe("login spec", () => {
  it("visit login page", () => {
    cy.visit("localhost:5173/login");
  })

  it("check if typing appears in input boxes", () => {
    cy.get("#login-email-input").type("anne_lee@mail.com").should("have.value", "anne_lee@mail.com");
    cy.get("#login-password-input").type("welcome12").should("have.value", "welcome12");
  })

  it("check for login fail with wrong password", () => {
    cy.get("#login-btn").click();
    cy.checkToastMessage("login-fail-msg", "Wrong password").wait(6500);;
  })

  it("check for login pass with correct password", () => {
    cy.get("#login-password-input").clear().type("welcome123{enter}");
    cy.checkToastMessage("login-pass-msg", "Successfully logged in!");
  })
})