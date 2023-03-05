describe("Test13", () => {
    it('test13', () => {
        cy.visit("http://localhost:3000/")
        cy.get('.MuiContainer-root > :nth-child(1) > .MuiButton-contained').click()
        cy.get('#standard-required').type("admin")
        cy.get('#standard-password-input').type("123456")
        cy.get('.MuiBox-root > :nth-child(1) > .MuiButtonBase-root').click()
        cy.get('.MuiFormControl-root').type("edit")
        cy.get('form > .MuiButton-contained').click()
        cy.get('.MuiCardActions-root > .MuiButtonBase-root').click()
        cy.get('[href="/Apostedit?postId=6404880062c87f0decc0f626"]').click()
        cy.get('.MuiContainer-maxWidthLg > form > :nth-child(1) > .MuiInputBase-root').type("editbyadmin")
        cy.get(':nth-child(2) > .MuiInputBase-root').type("editbyadmin")
        cy.get(':nth-child(3) > .MuiInputBase-root').type("editbyadmin")
        cy.get(':nth-child(5) > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get('.MuiContainer-maxWidthLg > form > .MuiButton-root').click()
    });
})