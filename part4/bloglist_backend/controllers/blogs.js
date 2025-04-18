const blogsRouter = require('express').Router()
const { response } = require('../app')
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
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

// Updating the likes of a blog
blogsRouter.put('/:id', async (request, response, next) => {
  const blogLikes = request.body

  try {
    // Retrieve the blog that we want to update by the id
    blogToUpdate = await Blog.findById(request.params.id)

    if (!blogToUpdate) {
      return response.status(404).send({ error: 'Blog not found' })
    }

    // Update the blog likes using the spread operation
    const updatedBlog = { ...blogToUpdate.toObject(), blogLikes}

    // // Save the updated blog back to the database
    // const savedBlog = await Blog.findByIdAndUpdate()

  } catch (exception) {
    next (exception)
  }
})

module.exports = blogsRouter