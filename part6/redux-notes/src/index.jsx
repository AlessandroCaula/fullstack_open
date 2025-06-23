import ReactDOM from 'react-dom/client'
// Import Redux Toolkit configureStore to create the store
import { configureStore } from '@reduxjs/toolkit'
// Import Provider to make the Redux store available to the app
import { Provider } from 'react-redux'
import App from './App'

// Import the reducer that manages the notes state
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

// Render the React app, wrapping it in the Provider so all components can access the store
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
