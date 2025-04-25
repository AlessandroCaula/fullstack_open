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
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  // console.log(contents)
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

// Test that verifies that if the likes property is missing from the request, it will default to the value 0.
test('missing likes will default to value 0', async () => {
  const newBlog = {
    title: "Default to 0",
    author: "Alessandro Caula",
    url: "https://github.com/AlessandroCaula",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const addedBlog = (await helper.blogsInDb()).find(blog => blog.title === 'Default to 0')
  assert.strictEqual(addedBlog.likes, 0)
})

// Test that verify that if the title or url properties are missing from the request data, the backend responds to the request status code 404 Bad Request
test('cannot add blogs without title or url', async () => {
  const newBlog = {
    title: 'Test without title or url',
    author: 'Alessandro Caula',
    // url: 'https://github.com/AlessandroCaula',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

// Test for checking if the deletion of a blog works with a correct id
test('note is successfully deleted with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()
  
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

  const contents = blogsAtEnd.map(r => r.title)
  assert(!contents.includes(blogToDelete.title))
})

// Test that the likes of a note can be changed
test('note likes can be correctly updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  // Define the new number of likes
  const newNumberOfLikes = 101

  // Send a PUT request to update the likes
  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: newNumberOfLikes })
    .expect(200) // Expect a successful response
    .expect('Content-Type', /application\/json/)

  // Verify that the response contains the updated likes
  assert.strictEqual(response.body.likes, newNumberOfLikes)

  // Retrieve the blogs from the database again
  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find(blog => blog.id == blogToUpdate.id)

  // Verify that the database reflects the updated likes
  assert.strictEqual(updatedBlog.likes, newNumberOfLikes)
})

after(async () => {
  await mongoose.connection.close()
})