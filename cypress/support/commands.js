import { fakerPT_BR as faker } from '@faker-js/faker';

// Login 
Cypress.Commands.add('login', (username, password) => {

    // Act
    cy.get("input#username-input").type(username);
    cy.get("input#password-input").type(password);
    cy.get("button#btn-login").click(); 

});

Cypress.Commands.add('clickButton', (btnSelector) => {
    cy.get(btnSelector).click();
});

Cypress.Commands.add('validaTextoToast', (texto) => {
    cy.get("body > div > div:nth-child(1) > div > div > div.go3958317564")
        .should('contain.text',texto);
});

Cypress.Commands.add('openSidebar', () => {
    cy.get("button#btn-sidebar").click();
});

Cypress.Commands.add('acessarNovoChat', () => {
    cy.openSidebar().then( () => {
        cy.get("div#sidebar-chat-text~a").click()
    });
});

Cypress.Commands.add('acessarChatRecente', () => {
    cy.openSidebar().then( () => {
        cy.get('div#sidebar-itens-scroll>a:first-child').click()
    });
});

Cypress.Commands.add('acessarFavoritos', () => {
    cy.openSidebar().then( () => {
        cy.get("div#sidebar-config-itens>a:first-child").click()
    });
});

Cypress.Commands.add('enviarMensagemChef', (mensagem) => {
    cy.get('input#input-chat').type(mensagem)
    cy.get('button[type="submit"]').click();
});

export function createUser() {
    let username = faker.internet.userName().toLowerCase();
    username = username.replace(/[^a-zA-Z ]/g, "");
    let email = faker.internet.email({firstName: username});
    let psw = username + "Aa1@";

    cy.log(username,email,psw)

    return {
        username: username,
        email: email,
        password: psw,
    };
}
  