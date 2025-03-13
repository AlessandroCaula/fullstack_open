import { useEffect, useState } from "react"
import SearchFilter from "./components/SearchFilter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from 'axios'
import personService from './services/persons'

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
    personService
      .getAll()
      .then(initialPersons => {
        console.log('persons data fetched')
        // Set the persons with the fetched data
        setPersons(initialPersons)
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
      personService
        .create(newPerson)
        .then(returnedPerson => {
          // Adding the newName to the persons
          setPersons(persons.concat(returnedPerson))
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

  // Handle the deletion of a contact
  const handleContactDeletion = (person) => {
    // Prompt the user with a confirmation form.
    const confirmation = confirm(`Delete ${person.name}`)
    // If not confirmed, then return. 
    if (!confirmation)
      return
    
    // Delete the person contact.
    personService
      .remove(person.id)
      .then(deletedPerson => {
        // The returned person is the deleted person
        // Remove the person from the state
        setPersons(persons.filter((person) => person.id !== deletedPerson.id))
      })
      .catch(error => {
        console.log(error)
        alert(`Failed to delete ${person.name}`)
      })
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
      <SearchFilter 
        filter={filter} 
        handleFilterChange={handleFilterChange} 
      />

      {/* Add new */}
      <h3>Add a new</h3>
      <PersonForm 
        addContact={addContact} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />

      {/* Show Contacts */}
      <h3>Numbers</h3>
      <Persons 
        filteredPerson={filteredPerson} 
        handleContactDeletion={handleContactDeletion} 
      />

    </div>
  )
}

export default App