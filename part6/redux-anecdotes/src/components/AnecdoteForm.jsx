import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()

  // Called when the form is submitted to add new note
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value   // Get the input value
    event.target.anecdote.value = ''    // Clear the input 
    // Dispatch an action to add the new note
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm