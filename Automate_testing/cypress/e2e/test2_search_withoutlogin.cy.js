describe("Test4", () => {
    it('test4', () => {
        cy.visit("http://localhost:3000/")
        cy.get('.MuiFormControl-root').type("1")
        cy.get('form > .MuiButton-contained').click()
    });
})