const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch(action.type) {
    case 'NEW_ANECDOTE':
      // Add the new anecdote to the state array
      return [...state, action.payload]
    case 'VOTE_ANECDOTE': {
      // Find the anecdote to increase the number of votes
      const id = action.payload.id
      const anecdoteToChange = state.find(n => n.id === id)
      // Create a new anecdote with the increased number of vote
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      // Return a new state array with the changed note
      return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
    }
    default:
      return state
  }
}

// Action creator for increasing the vote count
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    payload: { id }
  }
}

// Action creator for adding a new anecdote
export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer