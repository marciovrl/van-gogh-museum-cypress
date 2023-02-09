import collectionPage from "../pages/collection"
import homePage from "../pages/home"

const paintingTitle = 'Het Gele Huis'

describe('Test automation assignment', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it(`As a user I must navigate the collection page`, () => {
        homePage.goToCollectionPage()

        cy.url().should('include', '/collection')
        cy.title().should('include', 'Collection - Van Gogh Museum')
    })

    context('be on the collection page', () => {
        beforeEach(() => {
            homePage.goToCollectionPage()
        })

        it(`As a user I must view the paintings as my search "${paintingTitle}"`, () => {
            collectionPage.searchItem(paintingTitle)

            collectionPage.elements.resultLabel().contains('3')
        })

        it(`As a user I must view details of the painting I selected`, () => {
            collectionPage.searchItem(paintingTitle)
            collectionPage.selectItemByOrderInList(1) //select the first item

            cy.get('.definition-list')
                .within(() => {
                    collectionPage.elements.detailsItemdt().eq(0).contains('F-number')
                    collectionPage.elements.detailsItemdd().eq(0).contains('F1350r')

                    collectionPage.elements.detailsItemdt().eq(1).contains('JH-number')
                    collectionPage.elements.detailsItemdd().eq(1).contains('JH0976')

                    collectionPage.elements.detailsItemdt().eq(2).contains('Object number')
                    collectionPage.elements.detailsItemdd().eq(2).contains('d0025V1962r')
                })
        })
    })
})