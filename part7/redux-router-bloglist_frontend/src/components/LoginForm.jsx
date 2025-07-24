import React, { useState } from 'react'
import loginService from '../services/login'
import { loginUser } from '../reducers/userReducer'
import Notification from './Notification'
import blogService from '../services/blogs'

const LoginForm = ({ handleNotificationShow, dispatch }) => {

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
      handleNotificationShow(message, 'red')
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

export default LoginForm