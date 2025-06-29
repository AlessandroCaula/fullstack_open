import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

import { useReducer } from "react"

const notificationReducer = (state, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case "NEW_ANECDOTE":
      return `New anecdote: '${action.payload}'`
    case "VOTE_ANECDOTE":
      return `Voted: '${action.payload}'`
    case "HIDE":
      return ''
    default:
      return state
  }
}

const App = () => {
  const [notificationText, notificationDispatch] = useReducer(notificationReducer, '')

  // --- Change number of votes
  // 
  // Create new mutation
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  const handleVote = (anecdote) => {
    
    // Display the notification
    notificationDispatch({
      type: "VOTE_ANECDOTE", 
      payload: anecdote.content 
    })

    // console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  // --- Add new anecdote
  //
  const queryClient = useQueryClient()
  // New mutation for adding new anecdote
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) // Invalidate in order to re-render the anecdotes list
    }
  })

  // --- Retrieve anecdotes from the server with the React useQuery
  // 
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1    // retry the request only once
  })
  // If the query is still in loading state
  if (result.isPending) {
    return <div>loading data...</div>
  }
  // If the communication encountered any error. Display an error page
  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }
  // Get the data (anecdotes) from the result
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      {/* Display the notification when there is text to display */}
      {notificationText !== '' 
        && <Notification notificationText={notificationText}/>
      }

      <AnecdoteForm 
        newAnecdoteMutation={newAnecdoteMutation} 
        notificationDispatch={notificationDispatch}
      />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
