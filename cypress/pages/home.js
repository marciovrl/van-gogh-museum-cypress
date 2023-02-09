class homePage {
    elements = {
        collectionPageLink: () => cy.contains('Explore the collection'),
    }

    goToCollectionPage() {
        this.elements.collectionPageLink().trigger('mouseover').click()
    }
}

module.exports = new homePage();