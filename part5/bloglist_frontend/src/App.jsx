import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // User login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // Notification message
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')
  // Reference
  const blogFormRef = useRef()

  // Use Effect to retrieve all the blogs at first DOM load
  useEffect(() => {
    // Since you cannot directly use an async function inside the useEffect hook. 
    // We should define an async function inside the useEffect and call it.
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

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
      const newBlogAdded = await blogService.create(newBlog)
      const updatedBlogs = blogs.concat(newBlogAdded)
      setBlogs(updatedBlogs)
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
    try {
      const deletedBlog = blogs.find(s => s.id === id)
      // Deleting the blog from the database
      const blogDelete = await blogService.deleteBlog(id)
      // Deleting the blog from the blogs collection and update it
      const blogsAfterDeletion = blogs.filter(s => s.id !== id)
      setBlogs(blogsAfterDeletion)
      // Show Notification message
      const message = `${deletedBlog.title} successfully deleted`
      handleNotificationShow(message, 'green')
    } catch (exception) {
      const message = 'Not able to delete the blog'
      handleNotificationShow(message, 'red')
    }
  }

  // Handle notification 
  const handleNotificationShow = (message, color) => {
    setNotificationMessage(message)
    setNotificationColor(color)
    // Set the timer, after which the Notification will disappear
    setTimeout(() => {
      setNotificationMessage('')
      setNotificationColor('')
    }, 2000)
  }

  // If the user is not logged in, return the login form
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>

        {/* Show the notification if there is some message */}
        {notificationMessage && <Notification message={notificationMessage} color={notificationColor}/>}
        
        <form onSubmit={handleLogin}>
          {/* Username field */}
          <div>
            Username
            <input 
              type='text'
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
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm 
        createBlog={addNewBlog}
      />
    </Togglable>
  )

  // If the user has logged in, return the blogs posted by the user
  return (
    <div>
      <h2>blogs</h2>

      {/* Show the notification if there is some message */}
      {notificationMessage && <Notification message={notificationMessage} color={notificationColor}/>}
      
      <p>{user.name} logged in</p>

      {/* Rendering the toggle for the new blog creation */}
      {blogForm()}

      {blogs
        .filter(blog => 
          blog.user && (blog.user.id === user.id || blog.user === user.id))
        .map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            blogDeletion={() => handleBlogDeletion(blog.id)}
          />
      )}

      {/* Button for logging out */}
      <button onClick={handleLogout}>Log out</button>
    </div>    
  )
}

export default App