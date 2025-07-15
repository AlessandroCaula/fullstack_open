/* eslint-disable react/prop-types */
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = ({ newAnecdoteMutation }) => {

  const [notificationText, notificationDispatch] = useContext(NotificationContext)
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
        
    // Display the notification
    notificationDispatch({ type: "NEW_ANECDOTE", payload: content })
    setTimeout(() => {
      notificationDispatch({ type: "HIDE" })    // Hide the notification
    }, 3000)

    newAnecdoteMutation.mutate({ 
      content, 
      votes: 0 
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
