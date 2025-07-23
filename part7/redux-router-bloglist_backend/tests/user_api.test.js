const { beforeEach, test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user') 

// Initialize the User test database before every test is run
beforeEach(async () => {
  await User.deleteMany({})

  const userObject = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObject.map(user => user.save())
  await Promise.all(promiseArray)
})

// Check that the users are correctly returned 
test('users are correctly returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Testing POST 
describe('testing adding new users', () => {
  
  // Testing if a new user can be correctly added
  test('a new user can be correctly added', async () =>{
    const usersAtStart = await helper.usersInDb()
    // New user
    const newUser = {
      username: "NewUser1",
      name: "Alessandro Caula",
      password: "password"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)
  })
  
  // Testing that it's not possible to add a user without the username or password
  test('a user without username cannot be added', async () =>{
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "",
      name: "User Name",
      password: "password"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert(result.body.error.includes('Missing is username'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('a user without password cannot be added', async () =>{
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "UserName1",
      name: "User Name",
      password: ""
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert(result.body.error.includes('Missing is password'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  // Testing that the username and the password must be at least long 3 characters
  test('a username shorter that 3 cannot be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "Us",
      name: "User Name",
      password: "password"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('Username must be at least 3 characters'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('a password shorter that 3 cannot be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "Username",
      name: "User Name",
      password: "pa"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('Password must be at least 3 characters'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  // Test that a username must be unique
  test('two users cannot have same username', async () => {
    const usersAtStart = await helper.usersInDb()
    const firstUsername = usersAtStart[0].username

    const newUser = {
      username: firstUsername,
      name: "Name",
      password: "password"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    assert(result.body.error.includes('Username must be unique'))
  })
})

after(async () => {
  await mongoose.connection.close()
})