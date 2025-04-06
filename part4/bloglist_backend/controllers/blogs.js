const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blog => {
    response.json(blog)
  })
})

blogsRouter.post('/', (request, response) => {
  // Retrieve the added blog body
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: "content missing" });
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog.save().then((savedBlog) => {
    response.json(savedBlog)
  })
})

module.exports = blogsRouter