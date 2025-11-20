describe('Homepage', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/creatures');
  });

  it('should display a list of creatures', () => {
    cy.contains('Galactic Shelter'); // adapte le texte au titre de ton app
    cy.get('app-creature-card').should('have.length.at.least', 1);
  });

  it('should display something', () => {
    cy.get('app-creature-card').first().click();
    cy.contains('Capacités spéciales').should('be.visible');
    cy.get('button.adopt-btn').should('have.length', 1);
    cy.get('div.status-badge').contains("Disponible");
  });
});
