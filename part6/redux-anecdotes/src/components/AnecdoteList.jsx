/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote }) => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()

  // Called when an anecdote is voted
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    
    // Dispatch the notification to be shown
    const notificationText = `You voted '${anecdote.content}'`
    dispatch(setNotification(notificationText, 5))
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  // Get the current state (the collection of anecdotes) from the Redux store
  // Filter the anecdotes based on the filter string
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
  })
  
  // // Sort anecdotes based on number of votes
  // // Create a shallow copy [...anecdotes]. Important cause .sort() changes the array is is called on. 
  // // By copying it first, we keep the original Redux state array unchanged.
  // const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote 
          key={anecdote.id} 
          anecdote={anecdote} 
        />
      ))}
    </div>
  )
}

export default AnecdoteList