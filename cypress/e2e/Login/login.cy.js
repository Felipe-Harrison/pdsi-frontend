describe( "Login Page", () => {

    beforeEach( () => {
        cy.visit("/");
    });

    it("Deve Realizar Login" , () => {

        // Arrange
        
        // Act
        cy.login('admin1','Admin@123');

        // Assert
        cy.url().should('include', '/users')
        cy.getCookie("next-auth.session-token").should('exist')
    
        
    });

    it("Deve apresentar mensagem de erro", () => {

        // Act
        cy.login("admin","adm");

        // Assert
        cy.validaTextoToast('Erro ao realizar login: Nome de usuário ou senha errada');
    });

    it("Deve conseguir acessar cadastro", () => {

        // Act
        cy.clickButton("button#btn-register");

        // Assert
        cy.get('h1').should('contain.text', "Cadastro");

    });
});