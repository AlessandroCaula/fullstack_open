import { useEffect, useState } from "react"
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from "./components/Notification"

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
  // Controlled component 
  // Accessing the data contained in the form's input element. 
  const [newNote, setNewNote] = useState('')
  // Let's add a new functionality to our application that allows us to only view the important notes. 
  const [showAll, setShowAll] = useState(true)
  // Error message useState hook
  const [errorMessage, setErrorMessage] = useState('some error happened...')

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

  console.log('render', notes.length, 'notes')

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
      .catch(error => {
        // Setting the errorMessage
        setErrorMessage(`The note ${note.content} was already deleted from the server`)
        // Setting the timer, that will set the errorMessage state to null after five seconds. 
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // Define an event handler that will be called when the form is submitted, by clicking the submit button.
  // the event parameter is the event that triggers the call to the event handler function.
  const addNote = (event) => {
    // The event handler immediately calls the event.preventDefault() method, which prevents the default action of submitting a form. The default action would, among other things, cause the page to reload.
    event.preventDefault()
    if (newNote !== '') {
      // Creating the new notes
      const noteObject = {
        content: newNote,
        // Our note has 50% chance of being marked as important.
        important: Math.random() < 0.5,
        // // Generate a unique identifier
        // id: String(notes.length + 1)
      }

      noteService
        .create(noteObject)
        .then(returnedNote => {
          // Adding the notes to the setNotes
          setNotes(notes.concat(returnedNote))
          // Reset new note
          setNewNote('')
        })
      // console.log('Add note button clicked', event.target)
    }
  }

  // The event handler is called every time a change occurs in the input element. The event handler function receives the event objects as its event parameter. 
  const handleNoteChange = (event) => {
    // The target property of the event object now corresponds to the controlled input element, and event.target.value refers to the input value of that element.
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // List of all the notes to be displayed. If show all is true then notesToShow is equal to the entire list, otherwise, filter only the important one. Using conditional operator.
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true) // filter and retrieve only the notes that are important.

  return (
    <div>

      <h1>Notes</h1>

      <Notification message={errorMessage} />

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
      {/* Adding an HTML form that will be used for adding new notes. */}
      <form onSubmit={addNote}>
        <input
          placeholder="a new note..."
          value={newNote}
          // Register an event handler to the onChange attribute of the form's input element
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>

      <Footer />

    </div>
  )
}

export default App
