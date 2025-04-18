const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Retrieving all the blogs
blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

// Adding one note
blogsRouter.post('/', async (request, response, next) => {
  // Retrieve the added blog body
  const body = request.body
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    // next(exception)
    response.status(400).end()
  }
})

// Deleting a note
blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    nest(exception)
  }
})

module.exports = blogsRouter