describe("Test11", () => {
    it('test11', () => {
        cy.visit("http://localhost:3000/")
        cy.get('.MuiContainer-root > :nth-child(1) > .MuiButton-contained').click()
        cy.get('#standard-required').type("admin")
        cy.get('#standard-password-input').type("123456")
        cy.get('.MuiBox-root > :nth-child(1) > .MuiButtonBase-root').click()
    });
})