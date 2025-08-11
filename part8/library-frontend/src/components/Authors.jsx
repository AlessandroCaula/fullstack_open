import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useMutation, useQuery } from "@apollo/client"

const Authors = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  // Retrieve the authors
  const resultAuthors = useQuery(ALL_AUTHORS)
  
  // Mutation for editing the author 
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (resultAuthors.loading) {
    return <div>loading...</div>
  }

  const authors = resultAuthors.data.allAuthors

  const editBornYear = async (event) => {
    event.preventDefault()
    console.log(name)
    await editAuthor({ variables: { name, born: Number(born) } })

    // Reset the states
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={editBornYear}>
        <div>
          name
          <select 
            value={name} 
            onChange={({ target }) => setName(target.value)}
          >
            <option value='' disabled>Select an author</option>
            {authors.map((a, i) => (
              <option key={i} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born 
          <input 
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default Authors
