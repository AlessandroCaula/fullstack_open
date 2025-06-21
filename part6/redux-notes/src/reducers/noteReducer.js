// The reducer manages the state of notes.
// - state = current array of notes
// - action = object describing what happened
const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      // Add the new note to the state array
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE':
      // Find the note to change
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      // Create a new note object with 'important' toggled
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      // Return a new state array with the changed note
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
    default:
      // If the action is not recognized, return the current state unchanged
      return state
    }
  } 

// Helper to generate a random id for new notes
const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

// Action creator for adding a new note
export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

// Action creator for toggling importance
export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}  

export default noteReducer