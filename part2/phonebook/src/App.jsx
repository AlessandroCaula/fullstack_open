import { useState } from "react"

function App() {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    // Preventing the default action of submitting HTML forms and re-rendering
    event.preventDefault()
    if (newName !== '') {
      // Creating a copy of the persons
      // const copyPersons = { ...persons }
      const newPerson = {
        name: newName
      }
      // Adding the newName to the persons
      // copyPersons.add(newPerson)
      setPersons(persons.concat(newPerson))
      // Resetting the new Name
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    // Setting the new name to the value of the input element
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            placeholder="New Name"
            value={newName}
            // When the value change call the event handler
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {/* Loop through all the names and render them */}
        {persons.map((person, i) => (
          <p key={i}>{person.name}</p>
        ))}
      </div>
    </div>
  )
}

export default App
