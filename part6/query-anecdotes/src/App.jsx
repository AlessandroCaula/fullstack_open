import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

const App = () => {

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
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation}/>
    
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
