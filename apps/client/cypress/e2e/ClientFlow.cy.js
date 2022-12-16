describe("testing client login spec", () => {
  it("check for successful client login", () => {
    cy.visit("localhost:5173/login");

    cy.get("#login-email-input").type("ed-kelly@mail.com").should("have.value", "ed-kelly@mail.com");
    cy.get("#login-password-input").type("welcome123").should("have.value", "welcome123");
    cy.get("#acc-type-select").select("client");
    cy.get("#login-btn").click();

    cy.url().should("include", "/projects");
    cy.get("#click-proj-msg").contains("click one of your projects to view more details");
  });
});

describe("testing client flow spec", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/auth/login/client",
      body: {
        email: "ed-kelly@mail.com",
        password: "welcome123",
      }
    })
    .then((resp) => {
      window.localStorage.setItem('currUser', JSON.stringify(resp.body.user));
      window.localStorage.setItem('token', JSON.stringify(resp.body.token));
    })
  })

  it("view project details", () => {
    cy.get("#client-proj-0").click();

    cy.get("#project-title").contains("WEDDING OF ED AND KELLY");
  });
});