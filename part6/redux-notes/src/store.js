// Import Redux Toolkit configureStore to create the store
import { configureStore } from '@reduxjs/toolkit'

// Import the reducer that manages the notes state
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

export default store