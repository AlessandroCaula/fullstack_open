import React from 'react'
import ReactDOM from 'react-dom/client'

// Import Redux's createStore to create the store
import { createStore } from 'redux'
// Import Provider to make the Redux store available to the app
import { Provider } from 'react-redux'

import App from './App'
// Import the reducer that manages the notes state
import noteReducer from './reducers/noteReducer'

// Create the Redux store using the noteReducer
const store = createStore(noteReducer)

// Render the React app, wrapping it in the Provider so all components can access the store
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)