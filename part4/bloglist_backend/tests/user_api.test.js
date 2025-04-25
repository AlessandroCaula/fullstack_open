const { beforeEach, test } = require('node:test')
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

after(async () => {
  await mongoose.connection.close()
})