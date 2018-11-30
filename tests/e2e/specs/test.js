// https://docs.cypress.io/api/introduction/api.html

describe('Fireball tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('displays the drawer when the info icon clicked', () => {
    cy.get('[data-test=drawer-toggler]').click()
    cy.get('[data-test=drawer]').should('be.visible')
  })
  it('shows the modal when the dashcam link clicked', () => {
    cy.get('[data-test=drawer-toggler]').click()
    cy.get('[data-test=fireball-modal]').click({
      force: true
    })
    cy.get('[data-test=modal]').should('be.visible')
  })
})
