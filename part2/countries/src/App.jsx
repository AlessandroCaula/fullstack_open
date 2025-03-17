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
        value={countryFilter}
      />
    </div>
  )
}

// Countries List component
const CountryList = ({ filteredCountries }) => {

  // If the filteredCountries is null, return.
  if (!filteredCountries)
    return

  // console.log(filteredCountries)

  // If the filtered Countries is higher than 10. Show that there are too many countries to visualize
  if (filteredCountries.length > 10) {
    return (
      <div>
        <div>Too many matches, specify another filter</div>
      </div>
    )
  } else {
    if (filteredCountries.length == 1) {
      // If there is only one matched country display it. 
      const displayCountry = filteredCountries[0]
      const languages = ["a", "b", "c"]
      console.log(displayCountry)
      return (
        <div>
          <h1>{displayCountry.name.common}</h1>
          <div>
            <div>Capital: {displayCountry.capital}</div>
            <div>Area: {displayCountry.area}</div>
          </div>
          <div>
            <h2>Languages</h2>
            {/* <ul>
              {displayCountry.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul> */}
          </div>
        </div>
      )
    } else {
      // If there are more than one, and less (or equal) than 10, display only the country names. 
      return (
        <div>
          {/* Map through all the countries and display their name */}
          {filteredCountries.map((country, index) => (
            <div key={index}>{country.name.common}</div>
          ))}
        </div>
      )
    }
  }
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

  // Filtering out the countries based on the research. Only if the countries have been fetched.
  const filteredCountries = countriesCollection && countryFilter != '' ?
    countriesCollection.filter(country =>
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    ) : null

  // let filteredCountries = null
  // if (countriesCollection && countryFilter != '') {
  //   filteredCountries = countriesCollection.filter(country => 
  //     country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  //   )
  //   console.log(filteredCountries)
  // }

  return (
    <div>

      <SearchCountry handleSearchChange={handleSearchChange} countryFilter={countryFilter} />

      <CountryList filteredCountries={filteredCountries} />

    </div>
  )
}

export default App
