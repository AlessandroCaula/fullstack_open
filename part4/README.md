In this part, we will continue our work on the backend. Our first major theme will be writing unit and integration tests for the backend. After we have covered testing, we will take a look at implementing user authentication and authorization.

# Table of Content


# Part 4

## Part4a - Structure of backend application, introduction to testing

Let's continue our work on the backend of the notes application we started in part 3.

### Project structure

__Note__: this course material was written with version v22.3.0 of Node.js. Please make sure that your version of Node is at least as new as the version used in the material (you can check the version by running `node -v` in the command line).

Before we move into the topic of testing, we will modify the structure of our project to adhere to Node.js best practices.

Once we make the changes to the directory structure of our project, we will end up with the following structure:

```
├── controllers
│   └── notes.js
├── dist
│   └── ...
├── models
│   └── note.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
├── app.js
├── index.js
├── package-lock.json
├── package.json
```

So far we have been using _console.log_ and _console.error_ to print different information from the code. However, this is not a very good way to do things. Let's separate all printing to the console to its own module _utils/logger.js_:

```js
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }
```

The logger has two functions, __info__ for printing normal log messages, and __error__ for all error messages.

Extracting logging into its own module is a good idea in several ways. If we wanted to start writing logs to a file or send them to an external logging service like [graylog](https://graylog.org/) or [papertrail](https://www.papertrail.com/) we would only have to make changes in one place.

The handling of environment variables is extracted into a separate _utils/config.js_ file:

```js
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT }
```

The route handlers have also been moved into a dedicated module. The event handlers of routes are commonly referred to as _controllers_, and for this reason we have created a new _controllers_ directory. All of the routes related to notes are now in the _notes.js_ module under the _controllers_ directory.

```js
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

module.exports = notesRouter
```

This is almost an exact copy-paste of our previous _index.js_ file.

However, there are a few significant changes. At the very beginning of the file we create a new [router](https://expressjs.com/en/api.html#router) object:

```js
const notesRouter = require('express').Router()

//...

module.exports = notesRouter
```

The module exports the router to be available for all consumers of the module.

All routes are now defined for the router object, similar to what was done before with the object representing the entire application.

It's worth noting that the paths in the route handlers have shortened. In the previous version, we had:

```js
app.delete('/api/notes/:id', (request, response, next) => {
```

And in the current version, we have:

```js
notesRouter.delete('/:id', (request, response, next) => {
```

So what are these router objects exactly? The Express manual provides the following explanation:

>A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

The router is in fact a _middleware_, that can be used for defining "related routes" in a single place, which is typically placed in its own module.

The _app.js_ file that creates the actual application takes the router into use as shown below:

```js
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)
```

The router we defined earlier is used _if_ the URL of the request starts with _/api/notes_. For this reason, the notesRouter object must only define the relative parts of the routes, i.e. the empty path / or just the parameter _/:id_.

A file defining the application, _app.js_, has been created in the root of the repository:

```js
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
```