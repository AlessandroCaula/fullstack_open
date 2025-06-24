import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"
import noteService from '../services/notes'

const NewNote = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()

  // Called when the form is submitted to add new note
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value   // Get the input value
    event.target.note.value = ''    // Clear the input
    // Adding the new note to the server
    const newNote = await noteService.createNew(content)
    // Dispatch an action to add the new note
    dispatch(createNote(newNote))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote