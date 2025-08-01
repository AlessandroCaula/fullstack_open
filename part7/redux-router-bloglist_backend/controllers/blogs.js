const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require('jsonwebtoken');

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

// Adding one blog
blogsRouter.post("/", async (request, response) => {
  try {
    // Retrieve the added blog body
    const body = request.body;

    const decodedToken = jwt.verify(request.token, process.env.SECRET) // getTokenFrom(request)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    // Retrieving the user from the middleware
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes || 0,
    });

    // Update the user object. The id of the blog is stored in the notes field of the user object.
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
    // Check the logged in user. Only the user that posts the blog can delete it.
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    // Retrieve the user that sent the delete request
    // const user = await User.findById(decodedToken.id)
    const user = request.user
    // Retrieve the blog that we want to delete
    const blog = await Blog.findById(request.params.id)
    // Check if the user that wants to delete the blog is the same that posted it.
    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndDelete(blog.id)
      response.status(204).end()
    } else {
      response.status(400).json({
        error: 'Only user that post the blog can delete it'
      })
    }
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

// Adding a new comment to the blog
blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const comment = request.body.comment
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }
    // Add the comment to the blog
    blog.comments = blog.comments.concat(comment)
    // Save the blog with the added comment
    const updatedBlog = await blog.save()
    response.status(204).json(updatedBlog)
  } catch {
    next(exception)
  }
})

module.exports = blogsRouter;
