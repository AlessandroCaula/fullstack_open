import { useEffect, useState } from "react"
import SearchFilter from "./components/SearchFilter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from 'axios'

function App() {
  // Collection of persons contacts fetched from the db server
  const [persons, setPersons] = useState([])
  // Name of the new contact
  const [newName, setNewName] = useState('')
  // Number of the new contact
  const [newNumber, setNewNumber] = useState('')
  // Filter
  const [filter, setFilter] = useState('')

  // useEffect hook used to fetched the person data from the db.json server database (http://localhost:3001/persons) - npm run server - to run it.
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('persons data fetched')
        // Set the persons with the fetched data
        setPersons(response.data)
      })
  }, [])

  const addContact = (event) => {
    // Preventing the default action of submitting HTML forms and re-rendering
    event.preventDefault()
    if (newName !== '' && newNumber !== '') {
      // Check if the name already exist. In this case alert the user. 
      // .some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function return true.
      if (persons.some(person => person.name === newName)) {
        alert(`${newName} is already added to phonebook`)
        return
      }
      // Creating the new person contact
      const newPerson = {
        name: newName,
        number: newNumber,
        // id: persons.length + 1
      }

      // Saving the new contact to the backend server
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          // Adding the newName to the persons
          setPersons(persons.concat(response.data))
          // Resetting the new Name
          setNewName('')
          // Resetting the new Number
          setNewNumber('')
        })
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
      <h2>Phonebook</h2>

      {/* Search Engine */}
      <SearchFilter filter={filter} handleFilterChange={handleFilterChange} />

      {/* Add new */}
      <h3>Add a new</h3>
      <PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      {/* Show Contacts */}
      <h3>Numbers</h3>
      <Persons filteredPerson={filteredPerson} />
    </div>
  )
}

export default App