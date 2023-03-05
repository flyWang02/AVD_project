describe("Test7", () => {
    it('test7', () => {
        cy.visit("http://localhost:3000/")
        cy.get('.MuiContainer-root > :nth-child(1) > .MuiButton-contained').click()
        cy.get('#standard-required').type("1")
        cy.get('#standard-password-input').type("A2crocodile2002")
        cy.get('.MuiBox-root > :nth-child(1) > .MuiButtonBase-root').click()
        cy.get('.MuiGrid-container > :nth-child(3) > .MuiButtonBase-root').click()
        cy.get('.MuiContainer-root > :nth-child(2) > form > .MuiFormControl-root').type("auto")
        cy.get('.MuiContainer-root > :nth-child(2) > form > .MuiButton-contained').click()
        cy.get('.MuiCardActions-root > .MuiButtonBase-root').click()
        cy.get(':nth-child(6) > .MuiButtonBase-root').click()
        cy.get('.MuiContainer-maxWidthLg > form > .MuiFormControl-root > .MuiInputBase-root').type("good job!")
        cy.get('.MuiContainer-maxWidthLg > form > .MuiButtonBase-root').click()
    });
})
/*
        cy.get(':nth-child(1) > .MuiGrid-root > .MuiPaper-root > .MuiCardActions-root > .MuiButtonBase-root').click()
        cy.get(':nth-child(6) > .MuiButtonBase-root').click()
        cy.get('.MuiContainer-maxWidthLg > form > .MuiFormControl-root > .MuiInputBase-root').type("good job!")
        cy.get('.MuiContainer-maxWidthLg > form > .MuiButtonBase-root').click()
*/
/*cy.get('.MuiContainer-root > :nth-child(2) > form > .MuiFormControl-root').type("1")*/