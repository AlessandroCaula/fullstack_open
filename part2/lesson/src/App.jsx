import { useState } from "react"
import Note from "./components/Note"

const App = (props) => {
  // Define the a useState for storing the notes, so that the page is updated when a new note is added. Initialize it with the notes array passed in the props.
  const [notes, setNotes] = useState(props.notes)

  // Controlled component 
  // Accessing the data contained in the form's input element. 
  const [newNote, setNewNote] = useState('')

  // Let's add a new functionality to our application that allows us to only view the important notes. 
  const [showAll, setShowAll] = useState(true)

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
        // Generate a unique identifier
        id: String(notes.length + 1)
      }
      // Adding (concat) the new note to the notes object
      setNotes(notes.concat(noteObject))
    }
    // Reset new note
    setNewNote('')
    console.log('Add note button clicked', event.target)
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
          <Note key={note.id} note={note} />
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
    </div>
  )
}

export default App
