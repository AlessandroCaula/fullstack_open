import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  // Match and find the anecdote to display
  const anecdote = anecdotes.find(a => a.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>{`Has ${anecdote.votes} votes`}</div>
      <br />
      <div>{`For more info see ${anecdote.info}`}</div>
      <br />
    </div>
  )
}

export default Anecdote