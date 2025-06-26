import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()

  // Called when the form is submitted to add new note
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value   // Get the input value
    event.target.anecdote.value = ''    // Clear the input 
    // Dispatch an action to add the new note on the server and on the state
    dispatch(createAnecdote(content))

    // // Dispatch an action and show the notification
    // dispatch(showNotification(content))
    // // Setting the timer. After 5 seconds hide the notification, by dispatching a new action with an empty string
    // setTimeout(() => {
    //   dispatch(hideNotification())
    // }, 2000)
    // // Or use the helper function in the notificationReducer
    const notificationText = `You added '${content}'`
    dispatch(setNotification(notificationText, 5))    // (text, timer[seconds])
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