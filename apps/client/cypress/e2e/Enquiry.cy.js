// submitting a new enquiry
describe('submit new enquiry spec', () => {
  it('create a new enquiry', () => {
    cy.visit("localhost:5173/enquiry");

    cy.get("#enquiry-name-input").type("Sarah and George").should("have.value", "Sarah and George");
    cy.get("#enquiry-email-input").type("sarah-george@mail.com").should("have.value", "sarah-george@mail.com");
    cy.get("#enquiry-contact-input").type("93117812").should("have.value", "93117812");
    cy.get("#enquiry-date-input").type("2022-08-26").should("have.value", "2022-08-26");
    cy.get("#enquiry-description-input").type("Looking for balloon decor for our wedding ballroom. Have some photos we can share during our consult!").should("have.value", "Looking for balloon decor for our wedding ballroom. Have some photos we can share during our consult!");
    cy.get("#submit-enquiry-btn").click();

    cy.checkToastMessage("enquiry-success-msg", "Your enquiry has been successfully submitted!");
    cy.get("#enquiry-name-input").should("have.value", "");
  })

  it("reroute to the login page and log in", () => {
    cy.get("#go-to-login").click();

    cy.url().should("include", "/login");
    cy.get("#login-legend").contains("in summary;");
  })
})


// ensuring the page will reroute to login if no one is logged in
describe('reroute to login if no user', () => {
  it('try to access enquiry page', () => {
    cy.visit('localhost:5173/enquiries');

    cy.url().should("include", "/login");
    cy.get("#login-legend").contains("too long; read later");
  })
})

// ensuring that non-staff cannot access this page even if they are logged in
describe('unauthorized to access enquiries spec', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login/client',
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

  it('try to access enquiry page', () => {
    cy.visit('localhost:5173/enquiries');

    cy.url().should("include", "/unauthorized");
    cy.get("#unauth-msg").contains("you are not authorized to access this page");
  })
})

// checking that staff can follow up on 
describe('follow up on enquiry spec', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login/staff',
      body: {
        email: "yvette-pang@mail.com",
        password: "welcome123"
      }
    })
    .then((resp) => {
      window.localStorage.setItem('currUser', JSON.stringify(resp.body.user));
      window.localStorage.setItem('token', JSON.stringify(resp.body.token));
    })
  })

  it('respond to enquiry', () => {
    cy.visit('localhost:5173/enquiries');
    cy.url().should("include", "/enquiries");

    cy.contains('Sarah and George')
      .parent('tr')
      .within(() => {
        // cy.get('td').eq(1).contains('93117812 sarah-george@mail.com')
        cy.get('td').eq(2).contains('2022-08-26')
        cy.get('td').eq(3).contains('wedding')
        cy.get('td').eq(4).contains('Looking for balloon decor for our wedding ballroom. Have some photos we can share during our consult!')
        cy.get('[type="checkbox"]').check();
        cy.get('td').eq(5).contains('Yvette Pang');
      })
  })
})