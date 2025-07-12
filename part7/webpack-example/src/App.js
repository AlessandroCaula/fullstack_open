import React, { useState } from 'react' // we need this now also in component files
import './index.css'

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={() => setCounter(counter + 1)}>
        press
      </button>
    </div>
  )
}

export default App