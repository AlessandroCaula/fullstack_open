import { useState } from "react"

// Search component
const SearchCountry = () => {
  return (
    <div>
      Search component
    </div>
  )
}

function App() {
  // State of the country to search
  const [country, setCountry] = useState(null)

  return (
    <div>
      Hello

      <SearchCountry />
    </div>
  )
}

export default App
