describe("Test3", () => {
    it('test3', () => {
        cy.visit("http://localhost:3000/")
        cy.get('[href="/Register"]').click()
        cy.get('#standard-required').type("auto_test_2")
        cy.get('.MuiBox-root > :nth-child(1) > :nth-child(4)').type("A2crocodile2002")
        cy.get('.MuiBox-root > :nth-child(1) > .MuiButtonBase-root').click()
        cy.get(':nth-child(2) > .MuiButtonBase-root').click()
    });
})