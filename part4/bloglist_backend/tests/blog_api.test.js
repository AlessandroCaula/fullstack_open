const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// Initialize the test database before every test with the beforeEach function
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// Check that the returned elements form the database are JSON format.
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Check if the get method return the correct number of elements from the database
test('all the blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 6)
})

test('a valid blog can be added', async() => {
  const newBlog = {
    title: "Valid Blog",
    author: "Alessandro Caula",
    url: "https://github.com/AlessandroCaula",
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  // assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  assert(contents.includes('Valid Blog'))
})

// Test that verifies that the unique identifier property of the blog posts is named id
test("the unique identifier is the 'id'", async() => {
  const response = await api.get('/api/blogs') // Fetch all blogs from the API
  // Ensure there is at least one blog in the response
  assert(response.body.length > 0, 'No blogs found in the response')
  objectKeys = Object.keys(response.body[0])
  assert(objectKeys.includes('id'), "The unique identifier property is not named 'id'")
})

after(async () => {
  await mongoose.connection.close()
})