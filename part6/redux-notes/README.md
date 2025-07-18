# Redux Concepts

### Store

- The __store__ is a single JavaScript object that holds all the state of your app.

- You create the store in `index.js` and give it a __reducer__ to manage how the state changes.

### Reducer 

- A __reducer__ is a function that takes the current state and an action, and returns a new state. 

- It's a pure function: it doesn't modify the old state, but returns a new one based on the action. 

### Action

- An __action__ is a plain object describing what happened (e.g. `{ type: 'NEW NOTE', payload: ... }`).

- Actions are sent to the store using `dispatch`.

### Dispatch 

- __Dispatch__ is a function used to send the actions to the store. 

- When calling `dispatch(action)`, Redux runs the reducer with the current state and your action, and updates the state. 

### useSelector 

- This React-Redux hook lets you __read__ data form the Redux store in your component.

### useDispatch

- This React-Redux hook gives you the `dispatch` function so you can send actions to the store from your component.

`App.js`

```js
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  // Get the dispatch function so we can send actions to the Redux store
  const dispatch = useDispatch()
  // Get the current state (the array of notes) from the Redux store
  const notes = useSelector(state => state)

  // Called when the form is submitted to add a new note
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value // Get the input value
    event.target.note.value = '' // Clear the input
    // Dispatch an action to add the new note
    dispatch(createNote(content))
  }

  // Called when a note is clicked to toggle its importance
  const toggleImportance = (id) => {
    // Dispatch an action to toggle importance of the note with this id
    dispatch(toggleImportanceOf(id))
  }

  return(
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note=>
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
```

`noteReducer.js`

```js
// The reducer manages the state of notes.
// state = current array of notes
// action = object describing what happened
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
```

## How it all works together

- When you submit the form, `addNote` dispatches a `NEW_NOTE` action.

- The reducer adds the new note to the state.

- When you click a note, `toggleImportance` dispatches a `TOGGLE_IMPORTANCE` action.

- The reducer toggles the `important` property of the clicked note. 

- The UI updates automatically because `useSelector` makes your component re-render when the state changes. 

<hr style="border: 2px solid rgb(248, 166, 0)">


# Redux - Concepts 1

## What is Redux?

Redux is a __state management library__.
It helps you manage and organize the data (state) your app uses, especially when your app grows and has lots of components that need to share or update data.

## Key Concepts 

### 1. __Store__

- The __store__ is a single JavaScript object that holds all the state for your app.

- Think of it as a big box where all your app's data lives.

### 2. __State__

- The __state__ is the data in your store.

- For example, it could look like:

```js
{
  anecdotes: [...],
  filter: '',
  notification: 'Welcome!'
}
```

### 3. __Action__

- An __action__ is a plain JavaScript object that describes __what happened__ in your app.

- Example:

```js
{ type: 'VOTE_ANECDOTE', payload: { id: 123 } }
```

### 4. __Reducer__

- A __reducer__ is a function that:
  - Gets the current state and an action.
  - Returns a __new state__ based on the action. 

- Reducers must __not__ change the old state directly (they myst be "immutable")

- Example:

```js
const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}
```

### 5. __Dispatch__

- __Dispatch__ is how you send an action to the store. 

- When you call `dispatch(action)`, Redux runs your reducers and updates the state. 

## How does this work in the app?

1. __Reducers__ 
  - You have a reducer for each part of your state: anecdotes, filter, notification.
  - Each reducer manages its own slice of the state.

2. __Store__
  - You combine all reducers into a single store using `configureStore` from Redux Toolkit.
  - Now your app's state is organized and accessible from anywhere.

3. __React Components__
  - Components use `useSelector` to __read__ data from the store.
  - Components use `useDispatch` to __send actions__ (like voting or setting a notification)

4. __Example: Notification__
  - The `notificationReducer` manages the notification message. 
  - The `Notification` component uses `useSelector(state => state.notification)` to get the message from the store and display it.