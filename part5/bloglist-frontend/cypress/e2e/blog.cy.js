describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Hashery Going',
      username: 'hashery',
      password: 'onetwo'
    }
    const user2 = {
      name: 'Alice Love',
      username: 'alice',
      password: 'onetwo'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)

    cy.visit('http://localhost:5173')
  })

  // 5.17 Make a test for checking that the application displays the login form by default
  it('Login form is shown', function () {
    cy.contains('Blog Lists')
    cy.get('#login-form')
    cy.contains('login').click()
  })


  // 5.18 Make tests for logging in. Test both successful and unsuccessful login attempts.
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('hashery')
      cy.get('#password').type('onetwo')
      cy.get('#login-button').click()
      cy.contains('Successful login')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Marshmallow')
      cy.get('#password').type('cutecute')
      cy.get('#login-button').click()
      // Check that the notification shown with unsuccessful login is displayed red.
      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // cy.get('#username').type('hashery')
      // cy.get('#password').type('onetwo')
      // cy.get('#login-button').click()
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'hashery', password: 'onetwo'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })

    // 5.19 Make a test that verifies a logged-in user can create a new blog.
    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Hashery write a wonderful book')
      cy.get('#author').type('Hashery')
      cy.get('#url').type('http://hashery.com')
      cy.get('#create-button').click()

      cy.contains('Hashery write a wonderful book')
    })


    // 5.20 Make a test that confirms users can like a blog.
    it('A blog can be liked', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Hashery write a wonderful book')
      cy.get('#author').type('Hashery')
      cy.get('#url').type('http://hashery.com')
      cy.get('#create-button').click()
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('likes : 1')
      cy.get('#like-button').click()
      cy.contains('likes : 2')
    })

    // 5.21 Make a test for ensuring that the user who created a blog can delete it.
    it('A blog can be deleted', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Hashery write a wonderful book')
      cy.get('#author').type('Hashery')
      cy.get('#url').type('http://hashery.com')
      cy.get('#create-button').click()
      cy.contains('Hashery write a wonderful book')
      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.contains('Hashery write a wonderful book').should('not.exist')
    })

    // 5.22 Make a test for ensuring that only the creator can see the delete button of a blog, not anyone else.
    it('A blog cannot be deleted', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Hashery write a wonderful book')
      cy.get('#author').type('Hashery')
      cy.get('#url').type('http://hashery.com')
      cy.get('#create-button').click()
      cy.contains('Hashery write a wonderful book')
      // switch to another user
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'alice', password: 'onetwo'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
      cy.get('#view-button').click()
      cy.get('#delete-button').should('not.exist')
      // cy.contains('Hashery write a wonderful book').should('not.exist')
    })

    // 5.23 Make a test that checks that the blogs are ordered according to likes with the blog with the most likes being first.
    it('Blogs are ordered by like', function () {
      // create the first blog
      cy.contains('New Blog').click()
      cy.get('#title').type('Hashery write a wonderful book')
      cy.get('#author').type('Hashery')
      cy.get('#url').type('http://hashery.com')
      cy.get('#create-button').click()
      cy.contains('Hashery write a wonderful book')

      // create the second blog
      cy.contains('New Blog').click()
      cy.get('#title').type('Hashery write a second wonderful book')
      cy.get('#author').type('Hashery')
      cy.get('#url').type('http://hashery.com')
      cy.get('#create-button').click()
      cy.contains('Hashery write a second wonderful book')

      cy.get('.defaultBlog').eq(0).find('#view-button').click()
      cy.get('.defaultBlog').eq(1).find('#view-button').click()

      // before clicking like, the first blog is the first book
      cy.get('.detailBlog').eq(0).contains('Hashery write a wonderful book')

      cy.get('.detailBlog').eq(1).find('#like-button').click()
      // after clicking like, the first blog is the second book
      cy.get('.detailBlog').eq(0).contains('Hashery write a second wonderful book')
    })

  })


})