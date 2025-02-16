describe('New Entry Form:', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#username').type('user1@gmail.com');
    cy.get('#password').type('password');
    cy.get('[data-cy="submit"]').click();
  });

  it('should register a new entry in the workout diary', () => {
    cy.get('[data-cy="new-entry-menu"]').click();
    cy.contains('Date');
    cy.get('#date').type('2025-02-02');
    cy.get('#exercise').type('Press');
    cy.get('#sets').type('4');
    cy.get('#reps').type('6');
    cy.get('[data-cy="submit"]').click();
    cy.contains('Item Created!');
  });

  it('should validate field information and show the validation message', () => {
    cy.get('[data-cy="new-entry-menu"]').click();
    cy.contains('Date');
    cy.get('#date').type('2025-02-02');
    cy.get('#exercise').type('Press');
    cy.get('#sets').type('3');
    cy.get('#reps').type('6');
    cy.contains('Sets is required and must be a positive number.');
    cy.contains('Sets is required and must be multiple of 2.');
  });
});
