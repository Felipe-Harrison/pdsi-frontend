import { createUser } from "../../support/commands"

const pageElements = {
    'inputUsername': "input#username",
    'inputSenha': "input#psw",
    'inputConfirmaSenha': "input#pswConf",
    'inputEmail': "input#email",
    'planoGratis': "input#gratuito",
    'planoMembro': "input#member",
    'btnCadastrar': "button#btn-register",
    'btnLogin': "button#btn-login-page",
};

function preencherFormulario( {username, password, email, passwordConfirm} ) {
    
    if( passwordConfirm == undefined) {
        passwordConfirm = password
    }

    cy.get(pageElements['inputUsername']).type(username);
    cy.get(pageElements['inputSenha']).type(password);
    cy.get(pageElements['inputConfirmaSenha']).type(passwordConfirm);
    cy.get(pageElements['inputEmail']).type(email);

}

describe("Register Page", () => {

    beforeEach( () => {
        cy.visit('/');
        cy.clickButton("button#btn-register");
    });

    it("Deve fazer cadastro", () => {
        
        // Arrange 
        let newUser = createUser();

        // Act
        preencherFormulario(newUser);

        cy.get(pageElements['btnCadastrar']).click();
        // Assert

        cy.url().should('contain','/users');

    });

    it("Deve aparecer popup validação senha", () => {
        // Act
        cy.get(pageElements['inputSenha']).click().type('Aa@1');
        cy.wait(500).get('div#psw-feedback').then( ($input) => {
            // Assert
            cy.wrap($input)
                .should('contain.text', 'Pelo menos uma letra minúscula')
                .should('contain.text', 'Pelo menos uma letra maiúscula')
                .should('contain.text', 'Pelo menos um caracter especial (Ex: @.-_!)')
                .should('contain.text', 'Pelo menos um número')
        });
    });

    it("Deve validar senhas diferentes", () => {
        // Arrange
        let newUser = createUser();
        newUser.passwordConfirm = "a";

        // Act
        preencherFormulario(newUser);
        cy.get(pageElements['btnCadastrar']).click();

        // Assert
        cy.validaTextoToast('Senhas diferentes: Confirme sua senha novamente');
    });

    it("Deve validar senha formato inválido", () => {
        // Arrange
        let newUser = createUser();
        newUser['password'] = "aaa";

        // Act
        preencherFormulario(newUser);
        cy.get(pageElements['btnCadastrar']).click();

        // Assert
        cy.validaTextoToast('Senha inválida: Verifique senha informada');
    });

    it("Deve conseguir acessar login", () => {

        // Act
        cy.get(pageElements['btnLogin']).click();

        // Assert
        cy.get('button#btn-login').should('contain.text','Entrar');

    });
});