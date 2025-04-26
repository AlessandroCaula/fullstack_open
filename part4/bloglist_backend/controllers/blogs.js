const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require('jsonwebtoken')

// Retrieving all the blogs
blogsRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

// Let's ensure that only logged in users can post new blogs
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// Adding one note
blogsRouter.post("/", async (request, response, next) => {
  try {
    // Retrieve the added blog body
    const body = request.body;

    // Retrieve a random User that has posted this blog
    const users = await User.find({})
    // Randomize a number index that will be the user 
    const randomIdx = Math.floor(Math.random() * users.length)
    // Retrieve the userId of the random user
    const user = users[randomIdx]

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id,
      likes: body.likes || 0,
    });

    // Update the user object. The id of the note is stored in the notes field of the user object.
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog);
  } catch (exception) {
    // next(exception)
    response.status(400).end();
  }
});

// Deleting a note
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// Updating the likes of a blog
blogsRouter.put("/:id", async (request, response, next) => {
  const { likes } = request.body;

  try {
    // Retrieve the blog that we want to update by its id
    const blogToUpdate = await Blog.findById(request.params.id);

    // If the blog to update has not been found.
    if (!blogToUpdate) {
      return response.status(404).end();
    }

    // Update the likes of the blog to update
    blogToUpdate.likes = likes;

    // Save the updated blog
    const updatedBlog = await blogToUpdate.save();
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
