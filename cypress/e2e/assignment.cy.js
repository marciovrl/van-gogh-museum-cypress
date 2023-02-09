const paintingTitle = 'Het Gele Huis'

describe('Test automation assignment', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it(`As a user I must navigate the collection page`, () => {
        cy.goToCollectionPage()

        cy.url().should('include', '/collection')
        cy.title().should('include', 'Collection - Van Gogh Museum')
    })

    context('be on the collection page', () => {
        beforeEach(() => {
            cy.goToCollectionPage()
        })

        it(`As a user I must view the paintings as my search "${paintingTitle}"`, () => {
            cy.intercept('GET', '/en/collection/').as('searchCollection')
            cy.filterPainting(paintingTitle)

            cy.wait('@searchCollection').then(({ response }) => {
                expect(response.statusCode).to.eql(200)
                expect(response.body.totalResults).to.greaterThan(700)
            })
            cy.get('.collection-art-object-list-results').contains('3')
        })

        it(`As a user I must view details of the painting I selected`, () => {
            cy.filterPainting(paintingTitle)
            cy.selectItemByOrderInList(1) //select the first item

            cy.get('.definition-list')
                .within(() => {
                    cy.get('dt').eq(0).contains('F-number')
                    cy.get('dd').eq(0).contains('F1350r')

                    cy.get('dt').eq(1).contains('JH-number')
                    cy.get('dd').eq(1).contains('JH0976')

                    cy.get('dt').eq(2).contains('Object number')
                    cy.get('dd').eq(2).contains('d0025V1962r')
                })
        })
    })
})