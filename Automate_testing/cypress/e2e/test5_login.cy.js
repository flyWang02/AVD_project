describe("Test2", () => {
    it('test2', () => {
        cy.visit("http://localhost:3000/")
        cy.get('.MuiContainer-root > :nth-child(1) > .MuiButton-contained').click()
        cy.get('#standard-required').type("auto_test_2")
        cy.get('#standard-password-input').type("A2crocodile2002")
        cy.get('.MuiBox-root > :nth-child(1) > .MuiButtonBase-root').click()
    });
})