import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterAnecdote from './components/FilterAnecdote'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterAnecdote />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App