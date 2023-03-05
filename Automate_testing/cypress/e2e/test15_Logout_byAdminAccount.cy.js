describe("Test15", () => {
    it('test15', () => {
        cy.visit("http://localhost:3000/")
        cy.get('.MuiContainer-root > :nth-child(1) > .MuiButton-contained').click()
        cy.get('#standard-required').type("admin")
        cy.get('#standard-password-input').type("123456")
        cy.get('.MuiBox-root > :nth-child(1) > .MuiButtonBase-root').click()
        cy.get('.css-8iyz7s-MuiGrid-root > .MuiButtonBase-root').click()
    });
})