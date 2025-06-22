import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  // Called when the form is submitted to add new note
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value   // Get the input value
    event.target.anecdote.value = ''    // Clear the input 
    // Dispatch an action to add the new note
    dispatch(createAnecdote(content))
  }

  // Sort anecdotes based on number of votes
  // Create a shallow copy [...anecdotes]. Important cause .sort() changes the array is is called on. By copying it first, we keep the original Redux state array unchanged.
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App