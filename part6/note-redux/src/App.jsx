// App.jsx

// Import React and Redux-related functions
import React from 'react'
import { createStore } from 'redux'                    // To create a Redux store
import { Provider, useSelector, useDispatch } from 'react-redux' // To connect React to Redux

// --- REDUCER FUNCTION ---

// The reducer manages state updates based on action types
// In this case, the state is an array of notes
const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    // When a new note is added, return a new array with the added note
    return [...state, action.payload]  // Important: Redux state must be immutable!
  }
  // Default: return current state unchanged
  return state
}

// --- CREATE REDUX STORE ---

// Create the Redux store using the reducer
const store = createStore(noteReducer)

// --- INITIAL DISPATCHES (STATIC DATA) ---

// Add an initial note to the store
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

// Add a second initial note
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

// --- COMPONENT THAT USES REDUX STATE ---

const NoteList = () => {
  const notes = useSelector(state => state)   // Select the current state (array of notes)
  const dispatch = useDispatch()              // Get the dispatch function to send actions

  // Adds a new note based on user input
  const addNote = () => {
    const content = prompt('Note content:')
    dispatch({
      type: 'NEW_NOTE',
      payload: {
        content,
        important: Math.random() > 0.5,           // Randomly mark as important or not
        id: Math.floor(Math.random() * 10000)     // Generate a random ID
      }
    })
  }

  return (
    <div>
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

// --- MAIN APP COMPONENT ---

// Wrap the app in Redux <Provider> to give all components access to the store
const App = () => (
  <Provider store={store}>
    <NoteList />
  </Provider>
)

// Export the App component as default
export default App
