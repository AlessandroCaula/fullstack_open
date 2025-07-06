import { useState } from 'react'

// Routing
import { 
  BrowserRouter as Router,
  Routes, Route, useNavigate
} from 'react-router-dom'

// Importing components
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    // Set the timeout to show the notification
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        {/* Menu bar */}
        <Menu />
        
        {/* Showing the notification if a new anecdote is added */}
        {notification && <Notification notificationText={notification} />}

        {/* Routes to the different component */}
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/create' element={<CreateNew addNew={addNew} />} />
          <Route path='/about' element={<About />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
        </Routes>

        {/* The footer is always visible in all the routes */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
