describe("Test5", () => {
    it('test5', () => {
        cy.visit("http://localhost:3000/")
        cy.get(':nth-child(1) > .MuiGrid-root > .MuiPaper-root > .MuiCardActions-root > .MuiButtonBase-root').click()
    });
})