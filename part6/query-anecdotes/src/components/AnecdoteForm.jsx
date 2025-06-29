/* eslint-disable react/prop-types */
const AnecdoteForm = ({ newAnecdoteMutation, notificationDispatch }) => {

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // console.log('new anecdote')
    
    // Display the notification
    notificationDispatch({
      type: "NEW_ANECDOTE", 
      payload: content 
    })

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
