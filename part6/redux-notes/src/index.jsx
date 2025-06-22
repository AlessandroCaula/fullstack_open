import ReactDOM from 'react-dom/client'
// Import Redux's createStore to create the store
import { createStore, combineReducers } from 'redux'
// Import Provider to make the Redux store available to the app
import { Provider } from 'react-redux'
import App from './App'

// Import the reducer that manages the notes state
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

// Create the Redux store using the noteReducer
const store = createStore(reducer)

console.log(store.getState())

// // Render the React app, wrapping it in the Provider so all components can access the store
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

// Render the React app, wrapping it in the Provider so all components can access the store
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div />
  </Provider>
)

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))