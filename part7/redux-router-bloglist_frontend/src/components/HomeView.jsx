import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import Blog from "./Blog"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog, deleteBlog, updateBlog } from "../reducers/blogReducer"

// Blogs component view
const HomeView = ({ loggedUser }) => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()
  // Reference
  const blogFormRef = useRef()
  // Retrieve the blogs from the redux store
  const blogs = useSelector(allRedux => allRedux.blogs)

  // Rendering the Add new blog form
  const blogForm = () => (
    <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addNewBlog}
      />
    </Togglable>
  )

  // Extracting and rearranging the blogs to be displayed
  const blogsToRender = () => {
    // Filter the blogs to displayed based on the logged user
    const userBlogs = blogs.filter(
      blog => blog.user && (blog.user.id === loggedUser.id || blog.user === loggedUser.id)
    )
    // Sort the blogs based on likes count
    const sortedBlogs = userBlogs.sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  }

  // Handle like blog
  const handleBlogLikesUpdate = async (id) => {
    try {
      // Find the blog that we want to update
      const blogToUpdate = blogs.find(b => b.id === id)
      // Compute the new number of likes
      const updatedLikes = blogToUpdate.likes + 1
      // Creating the new blog object, with the likes count updated by on
      const updatedBlog = { ...blogToUpdate, likes: updatedLikes }
      // Dispatching and updating the blog
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      const message = 'Likes cannot be updated'
      // handleNotificationShow(message, 'red')
      dispatch(setNotification(message, 'red', 3))
    }
  }

  // Handle deletion blog
  const handleBlogDeletion = async (id) => {
    const confirmation = window.confirm('Are you sure you want to remove the blog?')
    if (!confirmation) {
      return
    }

    try {
      const deletedBlog = blogs.find(s => s.id === id)
      // Dispatch the deletion of the blog
      dispatch(deleteBlog(deletedBlog))

      // Show Notification message
      const message = `${deletedBlog.title} successfully deleted`
      // handleNotificationShow(message, 'green')
      dispatch(setNotification(message, 'green', 3))
    } catch (exception) {
      const message = 'Not able to delete the blog'
      // handleNotificationShow(message, 'red')
      dispatch(setNotification(message, 'red', 3))
    }
  }

  // Handling adding new blog
  const addNewBlog = async (newBlog) => {
    try {
      // Use the Ref to close the newBlog form creation
      blogFormRef.current.toggleVisibility()      
      // Dispatch and add the new blog to the list of blogs
      dispatch(createBlog(newBlog))
      // set Notification message and color
      const message = `A new blog: ${newBlog.title} by ${newBlog.author} added`
      // handleNotificationShow(message, 'green')
      dispatch(setNotification(message, 'green', 3))
    } catch (exception) {
      // alert('Blog cannot be created')
      const message = 'Blog cannot be created'
      // handleNotificationShow(message, 'red')
      dispatch(setNotification(message, 'red', 3))
    }
  }

  return (
    <div>
      {/* Rendering the toggle for the new blog creation */}
      {blogForm()}

      {blogsToRender().map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogDeletion={() => handleBlogDeletion(blog.id)}
          blogLikesUpdate={() => handleBlogLikesUpdate(blog.id)}
        />
      )}
    </div>
  )
}

export default HomeView