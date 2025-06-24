import ReactDOM from 'react-dom/client'
// Import Redux Toolkit configureStore to create the store
import { configureStore } from '@reduxjs/toolkit'
// Import Provider to make the Redux store available to the app
import { Provider } from 'react-redux'
import App from './App'
// Import for loading the data from the database
import noteService from './services/notes'
// Import the reducer that manages the notes state
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

// // Initializing the notes state based on the data received from the server
// noteService.getAll().then(notes => 
//   store.dispatch(setNotes(notes))
// )

// Render the React app, wrapping it in the Provider so all components can access the store
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
