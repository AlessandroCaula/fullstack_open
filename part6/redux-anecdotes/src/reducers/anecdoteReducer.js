import { createSlice } from "@reduxjs/toolkit"
import anecdotesServices from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // Add ne anecdote to the state array 
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    // Increment the number of votes
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      // Create a new anecdote with the increased number of votes
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const updatedAnecdotes = state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
      // Sort the anecdotes based on the number of votes and return them.
      // Create a shallow copy [...anecdotes]. Important cause .sort() changes the array is is called on. 
      // By copying it first, we keep the original Redux state array unchanged.
      return [...updatedAnecdotes].sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer