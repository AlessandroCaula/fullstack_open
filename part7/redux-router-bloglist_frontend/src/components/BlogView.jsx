import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import blogsService from "../services/blogs";
import { updateBlog } from "../reducers/blogReducer";

const BlogView = ({ handleBlogLikesUpdate }) => {
  const [blogComment, setBlogComment] = useState('')
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()
  // Retrieve the blogs from the redux store
  const blogs = useSelector(allRedux => allRedux.blogs)
  // Retrieve the logged user from the redux store
  const loggedUser = useSelector(allRedux => allRedux.loggedUser)

  // Method for adding a new comment to the blog
  const addNewComment = async (event) => {
    event.preventDefault()
    // Adding the new blog comment to the backend
    try {
      const updatedBlog = await blogsService.addComment(selectedBlog.id, blogComment)
      // console.log(updatedBlog)
      // Update Redux state with updatedBlog
      dispatch(updateBlog(updatedBlog))
      // Reset the comment input form
      setBlogComment('')
    } catch (error) {
      console.log('An error occurred while adding the comment', error)
    }
  }

  // Filter the blogs to displayed based on the logged user
  const userBlogs = blogs.filter(
    blog => blog.user && (blog.user.id === loggedUser.id || blog.user === loggedUser.id)
  )
  // Extract the selected blog
  const blogId = useParams().id
  const selectedBlog = userBlogs.find(blog => blog.id === blogId)

  if (!selectedBlog) {
    return
  }
  return (
    <>
      <h2>{selectedBlog.title}</h2>
      <a>{selectedBlog.url}</a>
      <div>
        likes {selectedBlog.likes}
        <button onClick={() => handleBlogLikesUpdate(selectedBlog.id)}>Like</button>
      </div>
      <p>added by {selectedBlog.user.name ?? loggedUser}</p>
      <></>
      <h3>Comments</h3>
      <form onSubmit={addNewComment}>
        <input 
          type="text"
          value={blogComment}
          onChange={({ target }) => setBlogComment(target.value)}
          placeholder="Comment here"
        />
        <button type="submit">add comment</button>
      </form>
      {/* Display all the comments */}
      <ul>
        {selectedBlog.comments.map((com, i) => (
          <li key={i}>{com}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogView