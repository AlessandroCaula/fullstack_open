import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs, updateBlog } from './reducers/blogReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  // User login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // Reference
  const blogFormRef = useRef()
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()

  // Use Effect to retrieve all the blogs at first DOM load
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // Retrieve the blogs from the redux store
  const blogs = useSelector(allRedux => allRedux.blogs)

  // Use effect to check if a user is already logged in at first DOM load
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    // If it exist, set the user
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      // Saving the logged in user to the local storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      // Setting the token for the logged in user.
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // alert('Wrong credentials')
      const message = 'Wrong username or password'
      handleNotificationShow(message, 'red')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addNewBlog = async (newBlog) => {
    try {
      // Use the Ref to close the newBlog form creation
      blogFormRef.current.toggleVisibility()      
      // Dispatch and add the new blog to the list of blogs
      dispatch(createBlog(newBlog))

      // set Notification message and color
      const message = `A new blog: ${newBlog.title} by ${newBlog.author} added`
      handleNotificationShow(message, 'green')
    } catch (exception) {
      // alert('Blog cannot be created')
      const message = 'Blog cannot be created'
      handleNotificationShow(message, 'red')
    }
  }

  const handleBlogDeletion = async (id) => {
    const confirmation = window.confirm('Are you sure you want to remove the blog?')
    if (!confirmation) {
      return
    }

    try {
      const deletedBlog = blogs.find(s => s.id === id)

      // // Deleting the blog from the database
      // await blogService.remove(id)
      // // Deleting the blog from the blogs collection and update it
      // const blogsAfterDeletion = blogs.filter(s => s.id !== id)
      // setBlogs(blogsAfterDeletion)

      dispatch(deleteBlog(deletedBlog))

      // Show Notification message
      const message = `${deletedBlog.title} successfully deleted`
      handleNotificationShow(message, 'green')
    } catch (exception) {
      const message = 'Not able to delete the blog'
      handleNotificationShow(message, 'red')
    }
  }

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
      handleNotificationShow(message, 'red')
    }
  }

  // Handle notification 
  const handleNotificationShow = (message, color) => {
    // Dispatching the notification text and color to the redux store
    dispatch(setNotification(message, color, 3))
  }

  // If the user is not logged in, return the login form
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>

        {/* Notification component. It will be rendered only when there exists text */}
        <Notification />

        <form onSubmit={handleLogin} data-testid='login form'>
          {/* Username field */}
          <div>
            Username
            <input
              type='text'
              data-testid='username'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          {/* Password field */}
          <div>
            Password
            <input
              type='password'
              data-testid='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

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
      blog => blog.user && (blog.user.id === user.id || blog.user === user.id)
    )
    // Sort the blogs based on likes count
    const sortedBlogs = userBlogs.sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  }

  // If the user has logged in, return the blogs posted by the user
  return (
    <div>

      <h2>blogs</h2>

      {/* Show the notification if there is some message */}
      <Notification />

      <p>{user.name} logged in</p>

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

      {/* Button for logging out */}
      <button onClick={handleLogout}>Log out</button>

    </div>
  )
}

export default App