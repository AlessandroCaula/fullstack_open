import { useState } from "react"

// Counter custom hook
const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value, 
    increase,
    decrease,
    zero
  }
}

// Form custom hook
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type, 
    value,
    onChange
  }
}

const App = () => {
  // Counter - custom useCounter hook
  const counter = useCounter()
  // Count left and right click - custom useCounter hook
  const left = useCounter()
  const right = useCounter()
  // Form
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [height, setHeight] = useState('')
  // Form - custom useField hook
  const nameCustom = useField('text')
  const bornCustom = useField('date')
  const heightCustom = useField('number') 

  return (
    <div>
      {/* Counter - custom useCounter hook */}
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>
          plus
        </button>
        <button onClick={counter.decrease}>
          minus
        </button>
        <button onClick={counter.zero}>
          zero
        </button>
      </div>

      <br />

      {/* Count left and right clicks - custom useCounter hook */}
      <div>
        {left.value}
        <button onClick={left.increase}>
          left 
        </button>
        <button onClick={right.increase}>
          right
        </button>
        {right.value}
      </div>

      <br />

      {/* Form */}
      <div>
        <form>
          name:
          <input 
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          birthdate:
          <input 
            type="date"
            value={born}
            onChange={(event) => setBorn(event.target.value)}
          />
          <br />
          {/* Using the custom hook */}
          height:
          <input 
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </form>
        <br />
        <div>
          {name} {born} {height}
        </div>
      </div>

      <br />

      {/* Form - custom useField hook */}
      <div>
        <form>
          name:
          <input 
            type={nameCustom.type}
            value={nameCustom.value}
            onChange={nameCustom.onChange}
          />
          <br />
          born:
          <input 
            type={bornCustom.type}
            value={bornCustom.value}
            onChange={bornCustom.onChange}
          />
          <br />
          height:
          <input 
            type={heightCustom.type}
            value={heightCustom.value}
            onChange={heightCustom.onChange}
          />
        </form>
        <br />
        <div>
          {nameCustom.value} {bornCustom.value} {heightCustom.value}
        </div>
      </div>
    </div>
  )
}

export default App
