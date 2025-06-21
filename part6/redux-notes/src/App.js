import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()
  // Get the current state (the array of notes) from the Redux store
  const notes = useSelector(state => state)

  // Called when the form is submitted to add a new note
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value   // Get the input value
    event.target.note.value = ''    // Clear the input
    // Dispatch an action to add the new note
    dispatch(createNote(content))
  }

  // Called when a note is clicked to toggle its importance
  const toggleImportance = (id) => {
    // Dispatch an action to toggle importance of the note with this id
    dispatch(toggleImportanceOf(id))
  }

  return(
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note=>
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}

export default App