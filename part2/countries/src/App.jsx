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

// Component for showing country details
const CountryDetail = ({ displayCountry }) => {
  return (
    <div>
      <h1>{displayCountry.name.common}</h1>
      <div>
        <div>Capital: {displayCountry.capital}</div>
        <div>Area: {displayCountry.area}</div>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {Object.values(displayCountry.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={displayCountry.flags.svg} alt="flag" style={{ width: '200px' }} />
      </div>
    </div>
  )
}

// Component for country list 

// Hero Component
const Hero = ({ filteredCountries, countryToDisplay, setCountryToDisplay }) => {

  // If the filteredCountries is null, return.
  if (!filteredCountries)
    return
  
  // Method called when the button to show the country is clicked.
  const handleShowCountry = (country) => {
    // console.log(country)
    setCountryToDisplay(country)
  }

  // If the filtered Countries is higher than 10. Show that there are too many countries to visualize
  if (filteredCountries.length > 10) {
    return (
      <div>
        <div>Too many matches, specify another filter</div>
      </div>
    )
  } else {
    if (countryToDisplay || filteredCountries.length === 1) {
      // If there is only one matched country display it. 
      const displayCountry = countryToDisplay ? countryToDisplay : filteredCountries[0]
      return (
        <CountryDetail displayCountry={displayCountry} />
      )
    } else { // else if (filteredCountries.length > 1 && filteredCountries <= 10)
      // If there are more than one, and less (or equal) than 10, display only the country names. 
      return (
        <div>
          {/* Map through all the countries and display their name */}
          {filteredCountries.map((country, index) => (
            <div key={index}>
              <span>{country.name.common}</span>
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </div>
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
  const [countryToDisplay, setCountryToDisplay] = useState(null)

  // Weather API key
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

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
    setCountryToDisplay(null)
  }

  // Filtering out the countries based on the research. Only if the countries have been fetched.
  const filteredCountries = countriesCollection && countryFilter != '' ?
    countriesCollection.filter(country =>
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    ) : null

  return (
    <div>

      <SearchCountry 
        handleSearchChange={handleSearchChange} 
        countryFilter={countryFilter} 
      />

      <Hero
        filteredCountries={filteredCountries}
        countryToDisplay={countryToDisplay} 
        setCountryToDisplay={setCountryToDisplay} 
      />

    </div>
  )
}

export default App
