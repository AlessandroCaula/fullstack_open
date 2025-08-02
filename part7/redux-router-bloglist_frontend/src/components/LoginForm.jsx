import { useState } from 'react'
import loginService from '../services/login'
import { loginUser } from '../reducers/userReducer'
import Notification from './Notification'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Button, TextField } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'

const LoginForm = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()

  // User login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      
      // Set the user to the redux store
      dispatch(loginUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      // alert('Wrong credentials')
      console.log(exception)
      const message = 'Wrong username or password'
      // handleNotificationShow(message, 'red')
      dispatch(setNotification(message, 'red', 3))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>

      {/* Notification component. It will be rendered only when there exists text */}
      <Notification />

      <form onSubmit={handleLogin} data-testid='login form'>
        {/* Username field */}
        <div>
          <TextField 
            label='Username'
            data-testid='username'
            type="text"
            value={username}
            name="Username"
            margin="dense"
            size="small"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        {/* Password field */}
        <div>
          <TextField 
            label='Password'
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            margin="dense"
            size="small"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          style={{ marginTop: '5px' }}
          type="submit" 
          variant="contained" 
          color="primary" 
          size="small"
          margin="dense"
          startIcon={<LoginIcon />}
        >Log In</Button>
      </form>
    </div>
  )
}

export default LoginForm