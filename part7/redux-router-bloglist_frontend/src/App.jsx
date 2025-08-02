import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import usersService from './services/users'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, updateBlog } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import UserView from './components/UserView'
import UsersView from './components/UsersView'
import HomeView from './components/HomeView'
import BlogView from './components/BlogView'
import { AppBar, Button, Container, IconButton, Toolbar } from '@mui/material'

const App = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()
  // All users
  const [allUsers, setAllUsers] = useState(null);
  // Retrieve the blogs from the redux store
  const blogs = useSelector(allRedux => allRedux.blogs)
  // Use Navigate to automatically navigate to the HomeView ("/") when user changed and at first load
  const navigate = useNavigate()

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

  // Fetch all the users
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await usersService.getAll()
      setAllUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  // Retrieve the logged user from the redux store
  const loggedUser = useSelector(allRedux => allRedux.loggedUser)

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logoutUser())
    // Reset to the HomeView
    navigate("/")
  }

  // Handle like blog - It's here cause the like can be done both in the HomeView and the BlogView
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

  if (!loggedUser) {
    // If the user has not logged in, then return the loginForm
    return (
      <LoginForm />
    )
  }

  // Defining padding for the style
  const padding = {
    padding: 10
  }

  // If the user has logged in, enter the application
  return (
    <Container>

      {/* NavBar */}
      <AppBar position='static'> {/* sx={{ height: 50 }}} */}
        <Toolbar size='small'>
          <Button color='inherit' component={Link} to='/'>
            Blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            Users
          </Button>
          <span style={{ display: 'flex', alignItems: 'center' }}>{loggedUser.name} logged in</span>
          <Button style={{marginLeft: '5px'}} onClick={handleLogout} variant="outlined" size='small' color=''>
            Log out
          </Button>
        </Toolbar>
      </AppBar>

      <h2>blogs</h2>

      {/* Show the notification if there is some message */}
      <Notification />

      {/* Add some spacing */}
      <div style={{height: '20px'}} />

      <Routes>
        <Route path='/' element={<HomeView handleBlogLikesUpdate={handleBlogLikesUpdate}/>} /> 
        <Route path='/users' element={<UsersView allUsers={allUsers} />} />
        <Route path='/users/:id' element={<UserView allUsers={allUsers} />} />
        <Route path='/blogs/:id' element={<BlogView handleBlogLikesUpdate={handleBlogLikesUpdate} />} />
      </Routes>

    </Container>
  )
}

export default App