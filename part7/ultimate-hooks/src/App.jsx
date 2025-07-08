import { useState, useEffect } from 'react'
import axios from 'axios'

// Custom hook for managing the state and behavior of an input field
const useField = (type) => {
  const [value, setValue] = useState('') // State for the input value

  // Handler for input changes
  const onChange = (event) => {
    setValue(event.target.value)
  }

  // Return an object that can be spread into an <input />
  return {
    type,
    value,
    onChange
  }
}

// Custom hook for managing a resource collection (e.g., notes or persons)
// Handles fetching all resources and creating new ones
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]) // State for the resource list

  // Fetch all the resources (notes, persons) when baseUrl changes or on mount
  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data) // Update state with fetched data
    }
    fetchResources()
  }, [baseUrl])

  // Function to create a new resource and update the state
  const create = async (resource) => {
    // Add the new resource to the db 
    const response = await axios.post(baseUrl, resource)
    // Add the resource to the state
    setResources(resources.concat(response.data))
  }

  // Service object exposing the create function
  const service = {
    create
  }

  // Return the resources array and the service object
  return [
    resources, service
  ]
}

// Main App component
const App = () => {
  // Input field hooks for note content, person name, and person number
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  // Resource hooks for notes and persons
  // Each returns an array of resources and a service object
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  // Handler for submitting a new note
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  // Handler for submitting a new person
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      {/* Form for adding a new note */}
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {/* List of notes */}
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      {/* Form for adding a new person */}
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {/* List of persons */}
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App