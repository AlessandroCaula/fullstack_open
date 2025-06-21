# Redux Concepts

## Store

- The __store__ is a single JavaScript object that holds all the state of your app.

- You create the store in `index.js` and give it a __reducer__ to manage how the state changes.

## Reducer 

- A __reducer__ is a function that takes the current state and an action, and returns a new state. 

- It's a pure function: it doesn't modify the old state, but returns a new one based on the action. 

## Action

- An __action__ is a plain object describing what happened (e.g. `{ type: 'NEW NOTE', payload: ... }`).

- Actions are sent to the store using `dispatch`.

## Dispatch 

- __Dispatch__ is a function used to send the actions to the store. 

- When calling `dispatch(action)`, Redux runs the reducer with the current state and your action, and updates the state. 

## useSelector 

- This React-Redux hook lets you __read__ data form the Redux store in your component.

# useDispatch

- This React-Redux hook gives you the `dispatch` function so you can send actions to the store from your component.