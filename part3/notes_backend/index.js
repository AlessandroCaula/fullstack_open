require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

// Middleware that prints information about every request that is sent to the server
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

// Route to handle the GET request for the main "Hello World"
app.get('/', (request, response) => {
  response.send('<h1>Hello World!!!!!!</h1>')
})

// Route to handle the GET request for all the notes from mongoDB.
app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

// Route to handle the GET request and retrieve a specific note by ID
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Route to DELETE a note by ID
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// Handling the POST request and creation of a new note to the server
app.post('/api/notes', (request, response, next) => {
  const body = request.body // Accessing the data from the body property of the request object
  // If there is no content.
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  console.log(note) // { content: 'Postman is good in testing backend', important: true }

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error))
})

// Functionality to update a single note, allowing the importance of the note to be changed.
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end()
      }
      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})

// Middleware used for catching requests made to non-existent routes.
const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint',
  })
}

// Handler of requests with unknown endpoint
app.use(unknownEndpoint)

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// This has to be the last loaded middleware, also all the routes should be registered before this.
// Handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - http://localhost:${PORT}`)
})
