// import { useSelector, useDispatch } from 'react-redux'
// import { voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  // const vote = (id) => {
  //   // console.log('vote', id)
  //   dispatch(voteAnecdote(id))
  // }

  // // Sort anecdotes based on number of votes
  // // Create a shallow copy [...anecdotes]. Important cause .sort() changes the array is is called on. By copying it first, we keep the original Redux state array unchanged.
  // const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App