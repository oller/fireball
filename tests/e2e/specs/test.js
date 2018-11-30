// https://docs.cypress.io/api/introduction/api.html

describe('Fireball tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('behaviour', () => {
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

  describe('responsive', () => {
    it('displays the responsive menu burger icon at 640 x 480', () => {
      cy.viewport(640, 480)
      cy.get('[data-test=navbar-burger]').should('be.visible')
    })

    it('does not display the responsive menu burger icon at 1200 x 800', () => {
      cy.viewport(1200, 800)
      cy.get('[data-test=navbar-burger]').should('not.be.visible')
    })
  })

  describe('links', () => {
    it('has an logo link which links to the home page', () => {
      cy.get('[data-test=link-home]')
        .should('have.attr', 'href')
        .and('include', '/')
    })

    it('has an about link which links to the about page', () => {
      cy.get('[data-test=link-about]')
        .should('have.attr', 'href')
        .and('include', 'about')
    })

    it('has a link to the github repo that links to github', () => {
      cy.get('[data-test=link-github]').should(
        'have.prop',
        'href',
        'https://github.com/oller/fireball'
      )
    })
  })
})
