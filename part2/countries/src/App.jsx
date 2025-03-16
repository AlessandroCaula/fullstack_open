import { useEffect, useState } from "react"
import axios from 'axios'

// Search component
const SearchCountry = ({ handleSearchChange, countryFilter }) => {
  return (
    <div>
      <span>find countries</span>
      <input
        placeholder="Search country"
        onChange={handleSearchChange}
      // value={countryFilter}
      />
    </div>
  )
}

// Countries List component
const CountryList = ({ filteredCountries }) => {

  if (!filteredCountries)
    return

  return (
    <div>
      Country List
    </div>
  )
}

function App() {
  // useState hook used to update the country to search.
  const [countryFilter, setCountryFilter] = useState('')
  const [countriesCollection, setCountriesCollection] = useState(null)

  // Fetching the countries data from the api
  useEffect(() => {
    console.log('fetching countries data...')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountriesCollection(response.data)
        // console.log(countriesCollection)
      })
      .catch(error => {
        alert('Error Fetching the data')
      })
  }, [])

  // Method handling the change of the search engine.
  const handleSearchChange = (event) => {
    setCountryFilter(event.target.value)
  }

  // Filtering out the countries based on the research
  let filteredCountries = null
  if (countriesCollection && countryFilter != '') {
    filteredCountries = countriesCollection.filter(country => 
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    )
    console.log(filteredCountries)
  }

  return (
    <div>

      <SearchCountry handleSearchChange={handleSearchChange} countryFilter={countryFilter} />

      <CountryList filteredCountries={filteredCountries} />

    </div>
  )
}

export default App
