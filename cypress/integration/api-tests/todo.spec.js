describe('TODO api testing', () => {
    let todoItem = 9;
    it('fetches Todo items - GET', () => {
        cy.request('/todos/').as('todoRequest');
        cy.get('@todoRequest').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isArray(todos.body, 'Todos Response is an array')
        });
    });

    it('deletes Todo items - DELETE', () => {
        cy.request('DELETE', `/todos/${todoItem}`).as('todoRequest');
        // deletes Todo item with id = 9
        cy.get('@todoRequest').then(todos => {
            expect(todos.status).to.eq(200);
            assert.isString(todos.body, 'todo deleted!')
        });
    });


    it('Adds Todo item - POST', () => {
        cy.request('POST', '/todos/', { task: "deep dive on cypress" }).as('todoRequest');
        // adds new Todo item by defining Todo name
        cy.get('@todoRequest').then(todos => {
            expect(todos.status).to.eq(200);
            cy.wrap(todos.body).should('deep.include', {
                task: 'deep dive on cypress',
                completed: false,
            });
        });   
    });   


    it.only('Welcome!', () => {
        cy.visit("/")
        cy.get('.h-scroll-on > .featured-deals > .ft-deals-set > .ft-deals-list > :nth-child(1) > .ft-deal__details > .ft-deal-pkg__title > .ft-deal__heading').click()
        // cy.get('.ft-deals-list.ft-deals-list--3.offer-active').find('li')
        expect(true).to.equal(true)
    });
})

    

    // context('Errors', () => {
    //     const errorMsg = 'Oops! Try again later'

    //     it('simulates a server error', () => {
    //         cy.intercept(
    //             'GET',
    //             '**/search?query=cypress',
    //             { statusCode: 500 }
    //         ).as('getServerFailure')

    //         cy.visit('/search')

    //         cy.get('[data-cy="search-field"]')
    //             .should('be.visible')
    //             .type('cypress{enter}')
    //         cy.wait('@getServerFailure')

    //         cy.contains(errorMsg)
    //             .should('be.visible')
    //     })

    //     it('simulates a network failure', () => {
    //         cy.intercept(
    //             'GET',
    //             '**/search?query=cypressio',
    //             { forceNetworkError: true }
    //         ).as('getNetworkFailure')

    //         cy.visit('/search')

    //         cy.get('[data-cy="search-field"]')
    //             .should('be.visible')
    //             .type('cypressio{enter}')
    //         cy.wait('@getNetworkFailure')

    //         cy.contais(errorMsg)
    //             .should('be.visible')
    //     })
    // })
