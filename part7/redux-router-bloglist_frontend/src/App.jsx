import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import usersService from './services/users'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs, updateBlog } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import LoginForm from './components/LoginForm'

// Users component view
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

// Users component view
const UsersView = ({ allUser, setAllUser }) => {
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
          {/* <div style={{ width: '150px' }}>{user.name}</div> */}
          <Link style={{ width: '150px' }} to={`/users/${user.id}`}>{user.name}</Link>
          <div style={{ width: '150px' }}>{user.blogs.length}</div>
        </div>
      ))}
    </div>
  )
}

const UserView = () => {  //selectedUser
  return (
    <div>
      prova
    </div>
  )
}

const App = () => {
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

  // Retrieve the logged user from the redux store
  const loggedUser = useSelector(allRedux => allRedux.loggedUser)

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }

  if (!loggedUser) {
    // If the user has not logged in, then return the loginForm
    return (
      <LoginForm />
    )
  }

  // Defining padding for the style
  const padding = {
    padding: 5
  }

  // // Only if all the users have been fetched, match it with the one selected from the route
  // let selectedUser = null
  // if (allUser) {
  //   // Matching the selected user with the router
  //   const match = useMatch('/users/:id')
  //   selectedUser = match && allUser
  //     ? allUser.find(user => user.id === Number(match.params.id))
  //     : null
  // }

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

      {/* Logged in user text */}
      <p>{loggedUser.name} logged in</p>

      {/* Button for logging out */}
      <button onClick={handleLogout}>Log out</button>

      {/* Add some spacing */}
      <div style={{height: '20px'}} />

      <Routes>
        {/* selectedUser={selectedUser} */}
        <Route path='/users/:id' element={<UserView />} />
        <Route path='/users' element={<UsersView allUser={allUser} setAllUser={setAllUser}/>} />
        <Route path='/' element={<HomeView loggedUser={loggedUser}/>} />
      </Routes>

    </div>
  )
}

export default App