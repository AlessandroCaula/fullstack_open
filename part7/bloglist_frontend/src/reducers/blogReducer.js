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
    }
  }
})

export const { setBlogs, appendBlog } = blogSlice.actions

// Initialize, getAll, the blogs from the server
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

// Add a new blog to the server and the store
export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogsServices.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export default blogSlice.reducer