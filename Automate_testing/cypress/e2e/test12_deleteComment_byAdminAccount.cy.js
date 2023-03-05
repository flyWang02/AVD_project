describe("Test12", () => {
    it('test12', () => {
        cy.visit("http://localhost:3000/")
        cy.get('.MuiContainer-root > :nth-child(1) > .MuiButton-contained').click()
        cy.get('#standard-required').type("admin")
        cy.get('#standard-password-input').type("123456")
        cy.get('.MuiBox-root > :nth-child(1) > .MuiButtonBase-root').click()
        cy.get('.MuiFormControl-root').type("edit")
        cy.get('form > .MuiButton-contained').click()
        cy.get('.MuiCardActions-root > .MuiButtonBase-root').click()
        
        cy.get('[href="/Acommentdelete?postId=6404881062c87f0decc0f62e"]').click()
        cy.get('.MuiBox-root > :nth-child(2) > .MuiButtonBase-root').click()
        
    });
})