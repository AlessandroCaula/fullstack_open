import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? ' important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()
  // Get the current state (the array of notes) from the Redux store
  const notes = useSelector(state => state)

  return (
    <ul>
      {notes.map(note => (
        <Note 
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  )
}

export default Notes