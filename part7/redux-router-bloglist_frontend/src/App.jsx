import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import UserView from './components/UserView'
import UsersView from './components/UsersView'
import HomeView from './components/HomeView'

const App = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()
  // All users
  const [allUsers, setAllUsers] = useState(null);

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
        <Route path='/users/:id' element={<UserView allUsers={allUsers}/>} />
        <Route path='/users' element={<UsersView allUsers={allUsers} setAllUsers={setAllUsers}/>} />
        <Route path='/' element={<HomeView loggedUser={loggedUser}/>} />
      </Routes>

    </div>
  )
}

export default App