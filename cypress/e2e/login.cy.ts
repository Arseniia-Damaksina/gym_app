describe('Login Page:', () => {
    it('should login to the diary with the correct credentials.', () => {
      cy.visit('/')
      cy.get('#username').type('user1@gmail.com');
      cy.get('#password').type('password');
      cy.get('[data-cy="submit"]').click();
      cy.contains('Workout diary');
    })
  })
  