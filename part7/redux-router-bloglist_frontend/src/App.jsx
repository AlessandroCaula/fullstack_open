import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import usersService from './services/users'
// import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs, updateBlog } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'

const App = () => {
  // Reference
  const blogFormRef = useRef()
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()
  // All users
  const [allUser, setAllUser] = useState(null);

  // Use Effect to retrieve all the blogs at first DOM load
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // Use effect to check if a user is already logged in at first DOM load
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    // If it exist, set the user
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // Set the user to the store
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  // Retrieve the blogs from the redux store
  const blogs = useSelector(allRedux => allRedux.blogs)
  const loggedUser = useSelector(allRedux => allRedux.loggedUser)

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logoutUser())
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
      // Dispatch the deletion of the blog
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

  if (!loggedUser) {
    // If the user has not logged in, then return the loginForm
    return (
      <LoginForm handleNotificationShow={handleNotificationShow} dispatch={dispatch} />
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
      blog => blog.user && (blog.user.id === loggedUser.id || blog.user === loggedUser.id)
    )
    // Sort the blogs based on likes count
    const sortedBlogs = userBlogs.sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  }

  // Users component view
  const UserView = () => {
    // Fetch all the users
    useEffect(() => {
      const fetchUsers = async () => {
        const fetchedUsers = await usersService.getAll()
        setAllUser(fetchedUsers)
      }
      fetchUsers()
    }, [])

    // If all the users are not yet fetched return 
    if (!allUser) {
      return
    }

    return (
      <div>
        <h1>Users</h1>
        <div style={{ display: 'flex', fontWeight: 'bold' }}>
          <div style={{ width: '150px' }}></div>
          <div style={{ width: '150px' }}>blogs created</div>
        </div>
        {/* Mapping through all the Users and display them */}
        {allUser.map(user => (
          <div key={user.id} style={{ display: 'flex' }}>
            <div style={{ width: '150px' }}>{user.name}</div>
            <div style={{ width: '150px' }}>{user.blogs.length}</div>
          </div>
        ))}
      </div>
    )
  }

  // Users component view
  const HomeView = () => (
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

  const padding = {
    padding: 5
  }

  // If the user has logged in, enter the application
  return (
    <div>

      {/* NavBar */}
      <div>
        <Link style={padding} to='/'>Blogs</Link>
        <Link style={padding} to='/users'>Users</Link>
      </div>

      <h2>blogs</h2>

      {/* Show the notification if there is some message */}
      <Notification />

      <p>{loggedUser.name} logged in</p>

      {/* Button for logging out */}
      <button onClick={handleLogout}>Log out</button>

      {/* Add some spacing */}
      <div style={{height: '20px'}} />

      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/users' element={<UserView />} />
      </Routes>

    </div>
  )
}

export default App