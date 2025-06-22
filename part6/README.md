So far, we have placed the application's state and state logic directly inside React components. When applications grow larger, state management should be moved outside React components. In this part, we will introduce the Redux library, which is currently the most popular solution for managing the state of React applications.

We'll learn about the lightweight version of Redux directly supported by React, namely the React context and useReducer hook, as well as the React Query library that simplifies the server state management.

# Table of Contents

# Part 6

## Part 6a - Flux-architecture and Redux

So far, we have followed the state management conventions recommended by React. We have placed the state and the functions for handling it in the [higher level](https://react.dev/learn/sharing-state-between-components) of the component structure of the application. Quite often most of the app state and state altering functions reside directly in the root component. The state and its handler methods have then been passed to other components with props. This works up to a certain point, but when applications grow larger, state management becomes challenging.

### Flux-architecture

Already years ago Facebook developed the [Flux](https://facebookarchive.github.io/flux/docs/in-depth-overview)-architecture to make state management of React apps easier. In Flux, the state is separated from the React components and into its own _stores_. State in the store is not changed directly, but with different _actions_.

When an action changes the state of the store, the views are rerendered:

![alt text](assets/image.png)

If some action on the application, for example pushing a button, causes the need to change the state, the change is made with an action. This causes re-rendering the view again:

![alt text](assets/image1.png)

Flux offers a standard way for how and where the application's state is kept and how it is modified.

### Redux

Facebook has an implementation for Flux, but we will be using the [Redux](https://redux.js.org/) library. It works with the same principle but is a bit simpler. Facebook also uses Redux now instead of their original Flux.

We will get to know Redux by implementing a counter application yet again:

![alt text](assets/image2.png)

Create a new Vite application and install redux with the command

```
npm install redux
```

As in Flux, in Redux the state is also stored in a [store](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#store).

The whole state of the application is stored in _one_ JavaScript object in the store. Because our application only needs the value of the counter, we will save it straight to the store. If the state was more complicated, different things in the state would be saved as separate fields of the object.

The state of the store is changed with [actions](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#actions). Actions are objects, which have at least a field determining the _type_ of the action. Our application needs for example the following action:

```js
{
  type: 'INCREMENT'
}
```

If there is data involved with the action, other fields can be declared as needed. However, our counting app is so simple that the actions are fine with just the type field.

The impact of the action to the state of the application is defined using a [reducer](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#reducers). In practice, a reducer is a function that is given the current state and an action as parameters. It _returns_ a new state.

Let's now define a reducer for our application:

```js
const counterReducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1
  } else if (action.type === 'DECREMENT') {
    return state - 1
  } else if (action.type === 'ZERO') {
    return 0
  }

  return state
}
```

The first parameter is the _state_ in the store. The reducer returns a _new state_ based on the `action` type. So, e.g. when the type of Action is _INCREMENT_, the state gets the old value plus one. If the type of Action is _ZERO_ the new value of state is zero.

Let's change the code a bit. We have used if-else statements to respond to an action and change the state. However, the [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement is the most common approach to writing a reducer.

Let's also define a [default value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) of 0 for the parameter _state_. Now the reducer works even if the store state has not been primed yet.

```js
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}
```

The reducer is never supposed to be called directly from the application's code. It is only given as a parameter to the `createStore` function which creates the store:

```js
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  // ...
}

const store = createStore(counterReducer)
```

The store now uses the reducer to handle actions, which are _dispatched_ or 'sent' to the store with its [dispatch](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#dispatch) method.

```js
store.dispatch({ type: 'INCREMENT' })
```

You can find out the state of the store using the method [getState](https://redux.js.org/api/store#getstate).

For example the following code:

```js
const store = createStore(counterReducer)
console.log(store.getState())
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
console.log(store.getState())
store.dispatch({ type: 'ZERO' })
store.dispatch({ type: 'DECREMENT' })
console.log(store.getState())
```

would print the following to the console

```
0
3
-1
```

because at first, the state of the store is 0. After three _INCREMENT_ actions the state is 3. In the end, after the _ZERO_ and _DECREMENT_ actions, the state is -1.

The third important method that the store has is [subscribe](https://redux.js.org/api/store#subscribelistener), which is used to create callback functions that the store calls whenever an action is dispatched to the store.

If, for example, we would add the following function to subscribe, _every change in the store_ would be printed to the console.

```js
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
```

so the code

```js
const store = createStore(counterReducer)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'ZERO' })
store.dispatch({ type: 'DECREMENT' })
```

would cause the following to be printed

```
1
2
3
0
-1
```

The code of our counter application is the following. All of the code has been written in the same file (`main.jsx`), so _store_ is directly available for the React code. We will get to know better ways to structure React/Redux code later.

```js
import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
```

There are a few notable things in the code. _App_ renders the value of the counter by asking it from the store with the method `store.getState()`. The action handlers of the buttons _dispatch_ the right actions to the store.

When the state in the store is changed, React is not able to automatically re-render the application. Thus we have registered a function `renderApp`, which renders the whole app, to listen for changes in the store with the `store.subscribe` method. Note that we have to immediately call the renderApp method. Without the call, the first rendering of the app would never happen.

# A note about the use of createStore

The most observant will notice that the name of the function createStore is overlined. If you move the mouse over the name, an explanation will appear

![alt text](assets/image3.png)

The full explanation is as follows

> _We recommend using the configureStore method of the @reduxjs/toolkit package, which replaces createStore._ 
>
> _Redux Toolkit is our recommended approach for writing Redux logic today, including store setup, reducers, data fetching, and more._
>
> _For more details, please read this Redux docs page: https://redux.js.org/introduction/why-rtk-is-redux-today_
>
> _configureStore from Redux Toolkit is an improved version of createStore that simplifies setup and helps avoid common bugs._
>
> _You should not be using the redux core package by itself today, except for learning purposes. The createStore method from the core redux package will not be removed, but we encourage all users to migrate to using Redux Toolkit for all Redux code._

So, instead of the function _createStore_, it is recommended to use the slightly more "advanced" function _configureStore_, and we will also use it when we have achieved the basic functionality of Redux.

Side note: _createStore_ is defined as "deprecated", which usually means that the feature will be removed in some newer version of the library. The explanation above and this [discussion](https://stackoverflow.com/questions/71944111/redux-createstore-is-deprecated-cannot-get-state-from-getstate-in-redux-ac) reveal that createStore will not be removed, and it has been given the status _deprecated_, perhaps with slightly incorrect reasons. So the function is not obsolete, but today there is a more preferable, new way to do almost the same thing.

### Redux-notes

We aim to modify our note application to use Redux for state management. However, let's first cover a few key concepts through a simplified note application.

The first version of our application is the following

```js
const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.payload)
    return state
  }

  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}
export default noteReducer;
```

So far the application does not have the functionality for adding new notes, although it is possible to do so by dispatching _NEW_NOTE_ actions.

Now the actions have a type and a field _payload_, which contains the note to be added:

```js
{
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
}
```

The choice of the field name is not random. The general convention is that actions have exactly two fields, _type_ telling the type and _payload_ containing the data included with the Action.

### Pure functions, immutable

The initial version of the reducer is very simple:

```js
const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.payload)
    return state
  }

  return state
}
```

The state is now an Array. _NEW_NOTE_-type actions cause a new note to be added to the state with the [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) method.

The application seems to be working, but the reducer we have declared is bad. It breaks the [basic assumption](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#reducers) that reducers must be [pure functions](https://en.wikipedia.org/wiki/Pure_function).

Pure functions are such, that they _do not cause any side effects_ and they must always return the same response when called with the same parameters.

We added a new note to the state with the method `state.push(action.payload)` which _changes_ the state of the state-object. This is not allowed. The problem is easily solved by using the [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method, which creates a _new array_, which contains all the elements of the old array and the new element:

```js
const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.payload)
  }

  return state
}
```

A reducer state must be composed of [immutable](https://en.wikipedia.org/wiki/Immutable_object) objects. If there is a change in the state, the old object is not changed, but it is _replaced with a new, changed, object_. This is exactly what we did with the new reducer: the old array is replaced with the new one.

Let's expand our reducer so that it can handle the change of a note's importance:

```js
{
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2
  }
}
```

Since we do not have any code which uses this functionality yet, we are expanding the reducer in the 'test-driven' way. Let's start by creating a test for handling the action _NEW_NOTE_.

We have to first configure the [Jest](https://jestjs.io/) testing library for the project. Let us install the following dependencies:

```
npm install --save-dev jest @babel/preset-env @babel/preset-react eslint-plugin-jest
```

Next we'll create the file _.babelrc_, with the following content:

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

Let us expand package.json with a script for running the tests:

```json
{
  // ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",

    "test": "jest"
  },
  // ...
}
```

And finally, _.eslintrc.cjs_ needs to be altered as follows:

```js
module.exports = {
  root: true,
  env: { 
    browser: true,
    es2020: true,
    "jest/globals": true
  },
  // ...
}
```

To make testing easier, we'll first move the reducer's code to its own module, to the file _src/reducers/noteReducer.js_. We'll also add the library [deep-freeze](https://www.npmjs.com/package/deep-freeze), which can be used to ensure that the reducer has been correctly defined as an immutable function. Let's install the library as a development dependency:

```
npm install --save-dev deep-freeze
```

The test, which we define in file _src/reducers/noteReducer.test.js_, has the following content:

```js
import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      payload: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.payload)
  })
})
```

Run the test with _npm test_. The _deepFreeze(state)_ command ensures that the reducer does not change the state of the store given to it as a parameter. If the reducer uses the `push` command to manipulate the state, the test will not pass

![alt text](assets/image4.png)

Now we'll create a test for the _TOGGLE_IMPORTANCE_ action:

```js
test('returns new state with action TOGGLE_IMPORTANCE', () => {
  const state = [
    {
      content: 'the app state is in redux store',
      important: true,
      id: 1
    },
    {
      content: 'state changes are made with actions',
      important: false,
      id: 2
    }]

  const action = {
    type: 'TOGGLE_IMPORTANCE',
    payload: {
      id: 2
    }
  }

  deepFreeze(state)
  const newState = noteReducer(state, action)

  expect(newState).toHaveLength(2)

  expect(newState).toContainEqual(state[0])

  expect(newState).toContainEqual({
    content: 'state changes are made with actions',
    important: true,
    id: 2
  })
})
```

So the following action

```js
{
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2
  }
}
```

has to change the importance of the note with the id 2.

The reducer is expanded as follows

```js
const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return state.concat(action.payload)
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
     }
    default:
      return state
  }
}
```

We create a copy of the note whose importance has changed with the syntax [familiar from part 2](../part2/README.md#changing-the-importance-of-notes), and replace the state with a new state containing all the notes which have not changed and the copy of the changed note _changedNote_.

Let's recap what goes on in the code. First, we search for a specific note object, the importance of which we want to change:

```js
const noteToChange = state.find(n => n.id === id)
```

then we create a new object, which is a _copy_ of the original note, only the value of the _important_ field has been changed to the opposite of what it was:

```js
const changedNote = { 
  ...noteToChange, 
  important: !noteToChange.important 
}
```

A new state is then returned. We create it by taking all of the notes from the old state except for the desired note, which we replace with its slightly altered copy:

```js
state.map(note =>
  note.id !== id ? note : changedNote 
)
```

### Array spread syntax

Because we now have quite good tests for the reducer, we can refactor the code safely.

Adding a new note creates the state returned from the Array's `concat` function. Let's take a look at how we can achieve the same by using the JavaScript [array spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) syntax:

```js
const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':

      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE':
      // ...
    default:
    return state
  }
}
```

The spread -syntax works as follows. If we declare

```js
const numbers = [1, 2, 3]
```

`...numbers` breaks the array up into individual elements, which can be placed in another array.

```js
[...numbers, 4, 5]
```

and the result is an array _[1, 2, 3, 4, 5]_.

```js
[numbers, 4, 5]
```

the result would have been _[[1, 2, 3], 4, 5]_.

When we take elements from an array by [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), a similar-looking syntax is used to _gather_ the rest of the elements:

```js
const numbers = [1, 2, 3, 4, 5, 6]

const [first, second, ...rest] = numbers

console.log(first)     // prints 1
console.log(second)   // prints 2
console.log(rest)     // prints [3, 4, 5, 6]
```

<hr style="border: 2px solid rgb(127, 103, 168)">

### Exercise 6.1 - 6.2

Let's make a simplified version of the unicafe exercise from part 1. Let's handle the state management with Redux.

You can take the code from this repository https://github.com/fullstack-hy2020/unicafe-redux for the base of your project.

_Start by removing the git configuration of the cloned repository, and by installing dependencies_

```
cd unicafe-redux   // go to the directory of cloned repository
rm -rf .git
npm install
```

#### 6.1: Unicafe Revisited, step 1

Before implementing the functionality of the UI, let's implement the functionality required by the store.

We have to save the number of each kind of feedback to the store, so the form of the state in the store is:

```js
{
  good: 5,
  ok: 4,
  bad: 2
}
```

The project has the following base for a reducer:

```js
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return state
    case 'OK':
      return state
    case 'BAD':
      return state
    case 'ZERO':
      return state
    default: return state
  }

}

export default counterReducer
```

and a base for its tests

```js
import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
})
```

__Implement the reducer and its tests__

In the tests, make sure that the reducer is an _immutable function_ with the _deep-freeze_ library. Ensure that the provided first test passes, because Redux expe cts that the reducer returns the original state when it is called with a first parameter - which represents the previous _state_ - with the value _undefined_.

Start by expanding the reducer so that both tests pass. Then add the rest of the tests, and finally the functionality that they are testing.

A good model for the reducer is the [redux-notes](https://fullstackopen.com/en/part6/flux_architecture_and_redux#pure-functions-immutable) example above.

<hr style="border: 2px solid rgb(127, 103, 168)">

### Uncontrolled form

Let's add the functionality for adding new notes and changing their importance:

```js
const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch({
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    })
  }


  const toggleImportance = (id) => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      payload: { id }
    })
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note =>
          <li
            key={note.id} 

            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}
```

The implementation of both functionalities is straightforward. It is noteworthy that we _have not_ bound the state of the form fields to the state of the _App_ component like we have previously done. React calls this kind of form [uncontrolled](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable).

> Uncontrolled forms have certain limitations (for example, dynamic error messages or disabling the submit button based on input are not possible). However they are suitable for our current needs.

You can read more about uncontrolled forms [here](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/).

The method for adding new notes is simple, it just dispatches the action for adding notes:

```js
addNote = (event) => {
  event.preventDefault()
  const content = event.target.note.value
  event.target.note.value = ''
  store.dispatch({
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  })
}
```

We can get the content of the new note straight from the form field. Because the field has a name, we can access the content via the event object _event.target.note.value_.

```js
<form onSubmit={addNote}>
  <input name="note" />
  <button type="submit">add</button>
</form>
```

A note's importance can be changed by clicking its name. The event handler is very simple:

```js
toggleImportance = (id) => {
  store.dispatch({
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  })
}
```

### Action creators

We begin to notice that, even in applications as simple as ours, using Redux can simplify the frontend code. However, we can do a lot better.

React components don't need to know the Redux action types and forms. Let's separate creating actions into separate functions:

```js
const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}
```

Functions that create actions are called [action creators](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#action-creators).

The _App_ component does not have to know anything about the inner representation of the actions anymore, it just gets the right action by calling the creator function:

```js
const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch(createNote(content))
  }
  
  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id))
  }

  // ...
}
```

### Forwarding Redux Store to various components

Aside from the reducer, our application is in one file. This is of course not sensible, and we should separate _App_ into its module.

Now the question is, how can the App access the store after the move? And more broadly, when a component is composed of many smaller components, there must be a way for all of the components to access the store. There are multiple ways to share the Redux store with the components. First, we will look into the newest, and possibly the easiest way, which is using the [hooks](https://react-redux.js.org/api/hooks) API of the [react-redux](https://react-redux.js.org/) library.

First, we install react-redux

```
npm install react-redux
```

Next, we move the `App` component into its own file `App.jsx`. Let's see how this affects the rest of the application files.

`main.jsx`/`index.jsx` becomes:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

Note, that the application is now defined as a child of a [Provider](https://react-redux.js.org/api/provider) component provided by the react-redux library. The application's store is given to the Provider as its attribute _store_.

Defining the action creators has been moved to the file _reducers/noteReducer.js_ where the reducer is defined. That file looks like this:

```js
const noteReducer = (state = [], action) => {
  // ...
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

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

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

export default noteReducer
```

Previously, if the application had many components which needed the store, the _App_ component had to pass store as props to all of those components (known as prop drilling). Now with the _store_ Provider wrapping the _App_ component, the _store_ is directly accessible to all components within the _App_ component without explicitly being passed as props.

The module now has multiple [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) commands.

The reducer function is still returned with the _export default_ command, so the reducer can be imported the usual way:

```js
import noteReducer from './reducers/noteReducer'
```

A module can have only _one default export_, but multiple "normal" exports

```js
export const createNote = (content) => {
  // ...
}

export const toggleImportanceOf = (id) => { 
  // ...
}
```

Normally (not as defaults) exported functions can be imported with the curly brace syntax:

```js
import { createNote } from '../../reducers/noteReducer'
```

Code for the _App_ component

```js
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li
            key={note.id} 
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
```

There are a few things to note in the code. Previously the code dispatched actions by calling the dispatch method of the Redux store:

```js
store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  payload: { id }
})
```

Now it does it with the _dispatch_ function from the [useDispatch](https://react-redux.js.org/api/hooks#usedispatch) hook.

```js
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  // ...

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  // ...
}
```

The _useDispatch_ hook provides any React component access to the dispatch function of the Redux store defined in _main.jsx_. This allows all components to make changes to the state of the Redux store.

The component can access the notes stored in the store with the [useSelector](https://react-redux.js.org/api/hooks#useselector)-hook of the react-redux library.

```js
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  // ...
  const notes = useSelector(state => state)
  // ...
}
```

_useSelector_ receives a function as a parameter. The function either searches for or selects data from the Redux store. Here we need all of the notes, so our selector function returns the whole state:

```js
state => state
```

which is a shorthand for:

```js
(state) => {
  return state
}
```

Usually, selector functions are a bit more interesting and return only selected parts of the contents of the Redux store. We could for example return only notes marked as important:

```js
const importantNotes = useSelector(state => state.filter(note => note.important))  
```

The current version of the application can be found on [GitHub](https://github.com/fullstack-hy2020/redux-notes/tree/part6-0), branch part6-0.

### More components

Let's separate creating a new note into a component.

```js
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote
```

Unlike in the React code we did without Redux, the event handler for changing the state of the app (which now lives in Redux) has been moved away from the App to a child component. The logic for changing the state in Redux is still neatly separated from the whole React part of the application.

We'll also separate the list of notes and displaying a single note into their own components (which will both be placed in the Notes.jsx file ):

```js
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes
```

The logic for changing the importance of a note is now in the component managing the list of notes.

There is not much code left in _App_:

```js
const App = () => {

  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}
```

_Note_, responsible for rendering a single note, is very simple and is not aware that the event handler it gets as props dispatches an action. These kinds of components are called [presentational](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) in React terminology.

_Notes_, on the other hand, is a [container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) component, as it contains some application logic: it defines what the event handlers of the _Note_ components do and coordinates the configuration of _presentational_ components, that is, the _Notes_.

The code of the Redux application can be found on [GitHub](https://github.com/fullstack-hy2020/redux-notes/tree/part6-1), on the branch _part6-1_.

<hr style="border: 2px solid rgb(127, 103, 168)">

### Exercise 6.3-6.8

Let's make a new version of the anecdote voting application from part 1. Take the project from this repository https://github.com/fullstack-hy2020/redux-anecdotes as the base of your solution.

If you clone the project into an existing git repository, _remove the git configuration of the cloned application_:

```
cd redux-anecdotes  // go to the cloned repository
rm -rf .git
```

The application can be started as usual, but you have to install the dependencies first:

```
npm install
npm run dev
```

After completing these exercises, your application should look like this:

![alt text](assets/image5.png)

#### 6.3: Anecdotes, step 1

Implement the functionality for voting anecdotes. The number of votes must be saved to a Redux store.

#### 6.4: Anecdotes, step 2

Implement the functionality to add new anecdotes.

You can keep the form uncontrolled like we did [earlier](#uncontrolled-form).