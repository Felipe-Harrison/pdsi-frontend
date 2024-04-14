export function resetUserPage() {
    cy.visit('/');
    cy.login('admin1','Admin@123');
}

describe("Users page", () => {

    beforeEach( () => {
        resetUserPage();
    });

    it("Deve acessar página inicial", () => {

        // Assert
        cy.url().should('contain','/users');
        cy.get('h1').should('contain.text',"Bem vindo Usuario, selecione um chat");

    });

    it("Deve conseguir acessar novo chat", () => {

        // Act
        cy.acessarNovoChat();

        // Assert
        cy.url().should('contain',"/users/chat/new");
        cy.get("div#msg-newchat").should('contain.text','Envie uma mensagem para começar')
    });

    it("Deve conseguir acessar chat recente", () => {
        cy.acessarChatRecente();

        cy.get('div.min-h-chat>div').should('have.length',2);
    });

    it("Deve conseguir acessar favoritos", () => {
        cy.acessarFavoritos();
        
        cy.url().should('contain','/users/favorites');
    });

    it("Deve conseguir fazer log out", () => {
        cy.openSidebar().then( () => {
            cy.get("div#sidebar-config-itens>a:last-child").click()
        });
        
        cy.url().should('contain','/');
    });

});


describe("Users Member page", () => {

    beforeEach( () => {
        resetUserPage();
    });

    it("Nao deve apresentar botões para virar vip", () => {
        // Arrange e Act
        cy.openSidebar();

        // Assert
        cy.get("button#btn-vip-modal")
            .should('not.exist')
    });

});

describe("Users Free page", () => {

    beforeEach( () => {
        resetUserPage();
    });

    it("Nao deve acessar chat recente", () => {
        // Arrange e Act
        cy.openSidebar();
        cy.acessarChatRecente();

        // Assert
        cy.url().should('contain',"/users");
    });

});