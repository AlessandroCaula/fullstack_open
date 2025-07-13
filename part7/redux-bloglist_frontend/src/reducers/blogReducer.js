import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../services/blogs";

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    // Retrieve all blogs
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      const changedBlog = action.payload
      const id = changedBlog.id
      // Updating the changed blog in the blog state
      return state.map(blog => blog.id === id ? changedBlog : blog)
    },
    removeBlog(state, action) {
      const id = action.payload
      // Removing the deleted blog from the state
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions

// Initialize, getAll, the blogs from the server
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsServices.getAll()
    // Update the blog state in the redux store
    dispatch(setBlogs(blogs))
  }
}

// Add a new blog to the server and the store
export const createBlog = blogToAdd => {
  return async dispatch => {
    const newBlog = await blogsServices.create(blogToAdd)
    // Updating the blog state in the redux store
    dispatch(appendBlog(newBlog))
  }
}

// Increasing the number of likes for the blog
export const updateBlog = blogToUpdate => {
  return async dispatch => {
    const updatedBlog = await blogsServices.update(blogToUpdate.id, blogToUpdate)
    // Updating the blog sate in the redux store
    dispatch(likeBlog(updatedBlog))
  }
}

// Delete blog
export const deleteBlog = blogToDelete => {
  return async dispatch => {
    await blogsServices.remove(blogToDelete.id)
    // Updating the blog state in the redux store
    dispatch(removeBlog(blogToDelete.id))
  }
}

export default blogSlice.reducer