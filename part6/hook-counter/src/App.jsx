import Display from "./components/Display"  
import Button from "./components/Button"

// import { useReducer, useContext } from 'react'
// import CounterContext from './CounterContext'

// const counterReducer = (state, action) => {
//   switch (action.type) {
//     case "INC":
//         return state + 1
//     case "DEC":
//         return state - 1
//     case "ZERO":
//         return 0
//     default:
//         return state
//   }
// }

// // Display component
// const Display = () => {
//   const [counter] = useContext(CounterContext)
//   return <div>{counter}</div>
// }

// // Button component
// const Button = ({ type, label }) => {
//   const [counter, dispatch] = useContext(CounterContext)
//   return (
//     <button onClick={() => dispatch({ type })}>
//       {label}
//     </button>
//   )
// }

const App = () => {
  // const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    // <CounterContext.Provider value={[counter, counterDispatch]}>
    <div>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </div>
    // </CounterContext.Provider>
  )
}

export default App