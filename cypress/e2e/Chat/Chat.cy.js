function beforeTest() {
    cy.visit('/');
    cy.login('admin1','Admin@123');
}

describe("New Chat", () => {

    beforeEach( () => {
        beforeTest();
        cy.acessarNovoChat();
    });

    it("Deve conseguir obter resposta do bot", () => {
        cy.enviarMensagemChef("Opa");

        cy.get("div.min-h-chat").contains("Opa")
    });

});

describe("Recent Chat", () => {

    beforeEach( () => {
        beforeTest();
        cy.acessarChatRecente();
    });

    it("Deve conseguir favoritar resposta do bot", () => {
        cy.get('button#btn-popup-msg').click();

        cy.get('button#btn-favorite-msg').click();

        cy.wait(500).get('form').then( _ => {

            cy.get('input').click().type('Favorito Teste');
            cy.get('select').select(2);

            cy.get('button[type=submit]').click();
        });

        cy.validaTextoToast('Mensagem favoritada com sucesso!!!');
    });
});