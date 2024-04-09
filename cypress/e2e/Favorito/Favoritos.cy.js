describe("Favorites", () => {

    const SCROLL_FAVORITES = 'div#favorites-itens-scroll'
    beforeEach( () => {
        cy.visit('/');
        cy.login('admin','admin');
        cy.acessarFavoritos();
    });

    it("Deve carregar listagem favoritos", () => {
        cy.get(SCROLL_FAVORITES).find('div').should('have.length.at.least',1);
    });

    it("Deve conseguir acessar um favorito", () => {
        cy.get(SCROLL_FAVORITES+">div:first-child").click();

        cy.get('div#modal-favorite').should('exist');

    });
});