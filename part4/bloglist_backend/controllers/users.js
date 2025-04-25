const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Route handler for retrieving all the users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs') //, title: 1, author: 1, id: 1
  response.json(users)
})

// Adding a new user
usersRouter.post('/', async( request, response) => {
  const { username, name, password } = request.body
  
  try {
    // Validate the length of the password before is passed to bcrypt to create the passwordHash
    if (!password) {
      return response.status(400).json({
        error: "Missing is password"
      })
    } else if (password.length < 3) {
      return response.status(400).json({
        error: "Password must be at least 3 characters"
      })
    }

    // Checking that the username is unique. 
    const users = await User.find({})
    if (users.map(user => user.username).includes(username)) {
      return response.status(400).json({
        error: 'Username must be unique'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const user = new User({
        username, 
        name,
        passwordHash,
    })
  
    const savedUser = await user.save()
    // Correctly save the new user
    response.status(201).json(savedUser)

  } catch (exception) {
    // Handling the error
    const errorMessage = exception.message.includes('minimum')
      ? 'Username must be at least 3 characters'
      : exception.message.includes('required')
      ? 'Missing is username'
      : 'Incorrect error'

    response.status(400).json({
      error: errorMessage
    })    
  }
})

module.exports = usersRouter