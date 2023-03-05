describe("Test8", () => {
    it('test8', () => {
        cy.visit("http://localhost:3000/")
        cy.get('.MuiContainer-root > :nth-child(1) > .MuiButton-contained').click()
        cy.get('#standard-required').type("1")
        cy.get('#standard-password-input').type("A2crocodile2002")
        cy.get('.MuiBox-root > :nth-child(1) > .MuiButtonBase-root').click()
        cy.get('.MuiGrid-container > :nth-child(3) > .MuiButtonBase-root').click()
        cy.get('.MuiContainer-root > :nth-child(2) > form > .MuiFormControl-root').type("auto")
        cy.get('.MuiContainer-root > :nth-child(2) > form > .MuiButton-contained').click()
        cy.get('.MuiCardActions-root > .MuiButtonBase-root').click()
        
        cy.get('[href="/Lpostedit?postId=6404880062c87f0decc0f626"]').click()
        cy.get('.MuiContainer-maxWidthLg > form > :nth-child(1) > .MuiInputBase-root').type("editone")
        cy.get(':nth-child(2) > .MuiInputBase-root').type("editone")
        cy.get(':nth-child(3) > .MuiInputBase-root').type("editone")
        cy.get(':nth-child(4) > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get('.MuiContainer-maxWidthLg > form > .MuiButton-root').click()
        

    });
})
