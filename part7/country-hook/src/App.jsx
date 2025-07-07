import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Custom Form hook
// 
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    // console.log(value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Custom useCountry hook
// 
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  console.log('useCountry hook')

  useEffect(() => {})

  return country
}

// Showing Country details
// 
const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

// App component
// 
const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()

    console.log('set name')

    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App