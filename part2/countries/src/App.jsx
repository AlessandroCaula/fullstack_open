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

// Component for showing weather details
const WeatherDetail = ({ countryWeather }) => {
  if (!countryWeather)
    return null

  console.log(countryWeather)
  return (
    <div>
      <h1>Weather in {countryWeather.location.name}</h1>
      <div>
        <p>Condition <span style={{fontWeight: 'bold'}}>{countryWeather.current.condition.text}</span></p>
        <img style={{width:'100px'}} src={countryWeather.current.condition.icon} alt="icon" />
      </div>
      <p>Temperature <span style={{fontWeight: 'bold'}}>{countryWeather.current.temp_c}</span> Celsius</p>
      <p>Wind <span style={{fontWeight:'bold'}}>{countryWeather.current.wind_kph}</span> km/h</p>
    </div>
  )
}

// Hero Component
const Hero = ({ filteredCountries, countryToDisplay, setCountryToDisplay, countryWeather }) => {

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
    if (countryToDisplay) {
      // If there is the countryToDisplay
      return (
        <div>
          <CountryDetail displayCountry={countryToDisplay} />
          <WeatherDetail countryWeather={countryWeather} />
        </div>
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
  const [countryWeather, setCountryWeather] = useState(null)

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
        alert('Error Fetching the data:', error)
      })
  }, [])

  // Weather API key - https://www.weatherapi.com/my/
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  // Fetching the weather data
  useEffect(() => {
    if (countryToDisplay) {
      console.log('Fetching weather data')
      const capitalToDisplay = countryToDisplay.capital[0]
      axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${capitalToDisplay}&aqi=no`)
        .then(response => {
          setCountryWeather(response.data)
          // console.log(response.data)
        })
        .catch(error => {
          alert(`Failed to fetch the weather data - ${error}`)
          setCountryWeather(null)
        })
    }
  }, [countryToDisplay])

  // Method handling the change of the search engine.
  const handleSearchChange = (event) => {
    setCountryFilter(event.target.value)
    // Reset the countryToDisplay to null when the users starts to type again.
    if (countryToDisplay) {
      setCountryToDisplay(null)
    }
  }

  // Filtering out the countries based on the research. Only if the countries have been fetched.
  const filteredCountries = countriesCollection && countryFilter != '' ?
    countriesCollection.filter(country =>
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    ) : null

  // If the filterCountries has only 1 country, and the country to display is null (avoiding infinite rendering), set the CountryToDisplay.
  if (filteredCountries?.length === 1 && !countryToDisplay) {
    setCountryToDisplay(filteredCountries[0])
  }

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
        countryWeather={countryWeather}
      />

    </div>
  )
}

export default App
