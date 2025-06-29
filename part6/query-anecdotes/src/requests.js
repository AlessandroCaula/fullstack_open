import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

// Get All anecdotes
export const getAnecdotes = () => 
  axios.get(baseUrl).then(res => res.data)

// Add new anecdote
export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

// Change number of votes
export const updateAnecdote = (updatedAnecdote) => 
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)