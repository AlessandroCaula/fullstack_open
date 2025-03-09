import { useState } from "react"

function App() {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  // Name of the new contact
  const [newName, setNewName] = useState('')
  // Number of the new contact
  const [newNumber, setNewNumber] = useState('')
  // Filter
  const [filter, setFilter] = useState('')

  const addContact = (event) => {
    // Preventing the default action of submitting HTML forms and re-rendering
    event.preventDefault()
    if (newName !== '' && newNumber !== '') {
      // Check if the name already exist. In this case alert the user. 
      // .some() method tests whether at least one element in the array passes the test implemented bu the provided function. It returns true if, in the array, it finds an element for which the provided function return true.
      if (persons.some(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
        return
      }
      // Creating the new person contact
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      // Adding the newName to the persons
      setPersons(persons.concat(newPerson))
      // Resetting the new Name
      setNewName('')
      // Resetting the new Number
      setNewNumber('')
    }
  }

  // Handling the Name changing in the input element
  const handleNameChange = (event) => {
    // Setting the new name to the value of the input element
    setNewName(event.target.value)
  }

  // Handling the Number changing in the input element
  const handleNumberChange = (event) => {
    // Setting the new number to the value of the input element
    setNewNumber(event.target.value)
  }

  // Handle the Filter changing in the input element
  const handleFilterChange = (event) => {
    // Setting the new filter 
    setFilter(event.target.value)
  }

  // Filter out the persons
  const filteredPerson = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  // console.log(filteredPerson)

  return (
    <div>
      <h1>Phonebook</h1>

      {/* Search Engine */}
      <div>
        <div>
          Filter shown with:
          <input
            placeholder="Search"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <h2>Add a new</h2>
      <div>
        <form onSubmit={addContact}>
          <div>
            name:
            <input
              required
              placeholder="New Name"
              value={newName}
              // When the value change call the event handler
              onChange={handleNameChange}
            />
          </div>
          <div>
            number:
            <input
              required
              placeholder="Phone Number"
              value={newNumber}
              // Handle each input letter in the input 
              onChange={handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <h2>Numbers</h2>
      <div>
        {/* Loop through all the names and render them */}
        {filteredPerson.map((person) => (
          <p key={person.id}>{person.name} {person.number}</p>
        ))}
      </div>
    </div>
  )
}

export default App