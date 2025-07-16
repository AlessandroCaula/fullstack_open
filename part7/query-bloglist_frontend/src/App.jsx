import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import NotificationContext from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {
  // User login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // Reference
  const blogFormRef = useRef()
  // useContext to dispatch the notification
  const [notificationInfo, notificationDispatch] = useContext(NotificationContext)
  // Query Client for retrieving the data from the server
  const queryClient = useQueryClient()

  // --- Retrieve the bloglist from the server with useQuery
  // 
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    // retry: 1
  })
  console.log(result)
  // If the communication encountered any error. Display an error message
  if (result.isError) {
    console.log('error')
  }
  // Get the data (bloglist) from the result
  const blogs = result.data

  // --- Add new bloglist
  // 
  // New mutation for adding a new bloglist
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] }) // Invalidate in order to re-render the anecdote list
    }
  })

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
      handleNotificationShow('ERROR_LOGIN')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addNewBlog = async (newBlog) => {
    try {
      // Use the Mutation in order to add the new blog to the server and the list of blogs
      newBlogMutation.mutate(newBlog)
      // Handle and show notification
      handleNotificationShow('NEW_BLOG', {title: newBlog.title, author: newBlog.author})
    } catch (exception) {
      handleNotificationShow('ERROR_NEW_BLOG')
    }
  }

  const handleBlogDeletion = async (id) => {
    const confirmation = window.confirm('Are you sure you want to remove the blog?')
    if (!confirmation) {
      return 
    }

    try {
      const deletedBlog = blogs.find(s => s.id === id)
      // Deleting the blog from the database
      await blogService.remove(id)
      // Deleting the blog from the blogs collection and update it
      const blogsAfterDeletion = blogs.filter(s => s.id !== id)
      // setBlogs(blogsAfterDeletion)

      // Show Notification message
      handleNotificationShow('DELETE_BLOG', {title: deletedBlog.title})
    } catch (exception) {
      handleNotificationShow('ERROR_DELETE_BLOG')
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
      // Updating the blog in the backend service
      await blogService.update(id, updatedBlog)
      // Update the blogs collection hook
      // setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))

    } catch (exception) {
      handleNotificationShow('ERROR_LIKES')
    }
  }

  // Handle notification 
  const handleNotificationShow = (type, payload=null) => {
    // Dispatch the notification context
    notificationDispatch({ type: type, payload: payload })
    // Set the timer, after which the Notification will disappear
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 2000)
  }

  // If the user is not logged in, return the login form
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>

        {/* Show the notification if there is some message */}
        {notificationInfo.message && <Notification />}
        
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

  // If the blogs are not yet retrieved, return 
  if (!blogs) {
    return
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
      {notificationInfo.message && <Notification />}

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