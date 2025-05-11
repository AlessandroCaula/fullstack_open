import { useEffect, useState } from "react"
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from "./components/Notification"
import loginService from './services/login'
import LoginForm from "./components/LoginForm"
import Toggable from "./components/Toggable"
import NoteForm from "./components/NoteForm"

// Bottom block component, a Footer component.
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2025</em>
    </div>
  )
}

const App = () => {
  // Define the a useState for storing the notes, so that the page is updated when a new note is added. Initialize it with the notes array fetched from the server.
  const [notes, setNotes] = useState(null)
  // Let's add a new functionality to our application that allows us to only view the important notes. 
  const [showAll, setShowAll] = useState(true)
  // Error message useState hook
  const [errorMessage, setErrorMessage] = useState('')
  // Handling login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

    // Use the useEffect hook to fetch and retrieve the notes data from teh db.json server (http://localhost:3001/notes) (npm run server)
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // Do not render anything if notes is still null
  if (!notes) {
    return null
  }

  // Define the function that will be passed to toggle the importance of each of the notes. To make it important or not important.
  const toggleImportanceOf = (id) => {
    // // Unique URL for each note resource based on its id
    // const url = `http://localhost:3001/notes/${id}`
    // Find the note we want to modify, and assign it to the note variable
    const note = notes.find(n => n.id === id)
    // Creating a new object that is an exact copy of the old note, apart from the important property that has the value flipped. 
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        // Loop through all the notes in the server, and replace the new note with the changed importance
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(() => {
        // Setting the errorMessage
        setErrorMessage(`The note ${note.content} was already deleted from the server`)
        // Setting the timer, that will set the errorMessage state to null after five seconds. 
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // Handling login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Define an event handler that will be called when the form is submitted, by clicking the submit button.
  // the event parameter is the event that triggers the call to the event handler function.
  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        // Adding the notes to the setNotes
        setNotes(notes.concat(returnedNote))
      })
  }

  // List of all the notes to be displayed. If show all is true then notesToShow is equal to the entire list, otherwise, filter only the important one. Using conditional operator.
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true) // filter and retrieve only the notes that are important.
  
  // Render the login form
  const loginForm = () => (
    // Rendering the login form within a toggable component that will show or hide the component
    <Toggable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Toggable>
  )

  // Render the note form
  const noteForm = () => (
    // Rendering an HTML form that will be used for adding new notes. Inside the togglable component
    <Toggable buttonLabel="new note">
      <NoteForm createNote={addNote} />
    </Toggable>
  )

  return (
    <div>
      <h1>Notes</h1>

      {errorMessage && <Notification message={errorMessage} />}

      {/* {user === null && loginForm()}
      {user !== null && noteForm()} */}

      {user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged</p>
          {noteForm()}
        </div>
      }

      {/* {user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged</p>
          {noteForm()}
        </div>
      } */}

      <h2>Notes</h2>
      <div>
        {/* Invert the value of the showAll state */}
        <button onClick={() => setShowAll(!showAll)}>
          {/* Conditionally setting the text of the button */}
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/* Map through the notes elements and render them as li element in the unordered list */}
        {notesToShow.map((note) =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />

    </div>
  )
}

export default App
