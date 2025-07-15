import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'


const App = () => {
  const [notificationText, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  // --- Change number of votes
  // 
  // Create new mutation
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })  // Invalidate in order to re-render the anecdotes list
    }
  })
  const handleVote = (anecdote) => {
    // Display the notification
    notificationDispatch({ type: "VOTE_ANECDOTE", payload: anecdote.content })
    setTimeout(() => {
      notificationDispatch({ type: "HIDE" })
    }, 3000)

    // console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  // --- Add new anecdote
  //
  // New mutation for adding new anecdote
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) // Invalidate in order to re-render the anecdotes list
    },
    onError: () => {
      // Catch the error when the added anecdote is shorter than 5 characters
      notificationDispatch({ type: "ERROR" })
      setTimeout(() => {
        notificationDispatch({ type: "HIDE" })
      }, 3000)
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
    console.log('error')
  }
  // Get the data (anecdotes) from the result
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      {/* Display the notification when there is text to display */}
      {notificationText !== '' 
        && <Notification />
      }

      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
    
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
