import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"

const NewNote = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()

  // Called when the form is submitted to add new note
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value   // Get the input value
    event.target.note.value = ''    // Clear the input
    // Dispatch an action to add the new note, both on the server and on the state
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote