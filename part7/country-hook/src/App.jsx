import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Custom hook for form input management
// Returns an object with type, value, and onChange handler for easy input binding
// 
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Custom hook to fetch country data from the REST Countries API
// Returns a county object with { data, found } or { found: false } if not found
// 
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  // The actual effect will only run when name changes 
  useEffect(() => {
    // Don't fetch the data if name is empty
    if (!name) return
    
    // Fetch country data by name
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        // If found, set country data and found: true
        setCountry({ data: response.data, found: true })
      })
      .catch(error => {
        // If not found (404), set found: false
        setCountry({ found: false })
      })
  }, [name])

  return country
}

// Component to display country details or not found message
// 
const Country = ({ country }) => {
  // If no country data yet, render nothing
  if (!country) {
    return null
  }

  // If country was not found, show message
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  // If country was found, display its details
  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.svg} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

// Main App component
// 
const App = () => {
  // Manage input field using custom hook
  const nameInput = useField('text')
  // State for the country name to search
  const [name, setName] = useState('')
  // Fetch country data using custom hook
  const country = useCountry(name)

  // Handle form submission: set the name to trigger fetch
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value) // Triggering fetch
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {/* Display country info or not found message */}
      <Country country={country} />
    </div>
  )
}

export default App