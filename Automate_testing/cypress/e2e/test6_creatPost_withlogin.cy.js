describe("Test6", () => {
    it('test6', () => {
        cy.visit("http://localhost:3000/")
        cy.get('.MuiContainer-root > :nth-child(1) > .MuiButton-contained').click()
        cy.get('#standard-required').type("1")
        cy.get('#standard-password-input').type("A2crocodile2002")
        cy.get('.MuiBox-root > :nth-child(1) > .MuiButtonBase-root').click()
        cy.get('.MuiGrid-container > :nth-child(3) > .MuiButtonBase-root').click()
        cy.get('.MuiContainer-maxWidthLg > form > :nth-child(1) > .MuiInputBase-root').type("auto test")
        cy.get(':nth-child(2) > .MuiInputBase-root').type("auto test")
        cy.get(':nth-child(3) > .MuiInputBase-root').type("auto test")
        cy.get(':nth-child(7) > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get('.MuiContainer-maxWidthLg > form > .MuiButton-root').click()

    });
})