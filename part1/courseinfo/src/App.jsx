import { useState } from "react";

//////////////////////////////////////////////
// First Example 
//////////////////////////////////////////////
// Header Component
const Header = (props) => {
  const { course } = props;
  return (
    <h1>{course}</h1>
  )
}

// Content Component
const Content = (props) => {
  const { parts } = props;
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
    </div>
  )
}

// Part Component
const Part = ({ part, exercise }) => {
  return (
    <>
      <p>
        {part} {exercise}
      </p>
    </>
  )
}

// Total Component
const Total = (props) => {
  const { parts } = props;
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

//////////////////////////////////////////////
// Second example 
//////////////////////////////////////////////
const Hello = (props) => {
  const { name, age } = props;

  // Let's expand our Hello component with an helper function
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>
        So you were probably born in {bornYear()}
      </p>
    </div>
  )
}

//////////////////////////////////////////////
// Third example 
//////////////////////////////////////////////
// Display component
const Display = ({ counter }) => <div>{counter}</div>

// Button component
const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

//////////////////////////////////////////////
// Fifth Example - Conditional rendering
//////////////////////////////////////////////
// History component
const History = (props) => {
  // If all clicks is equal to 0 then render this text.
  if (props.allClicks.length === 0) {
    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )
  }
  // Otherwise.
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


//////////////
// Main App //
//////////////
const App = () => {

  // First Exercise
  //
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // Second Exercise
  //
  const name = "Peter"
  const age = 10

  // Third Exercise
  //
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)
  // Function to execute on click action
  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter - 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  // Fourth Exercise
  // 
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const handleLeftClick = () => {
    // Create a new click object
    const newClicks = {
      // Objects spread
      ...clicks,
      left: clicks.left + 1,
    }
    // Set new clicks
    setClicks(newClicks)
  }
  const handleRightClick = () => {
    // Create a new click object
    const newClicks = {
      // Objects spread
      ...clicks,
      right: clicks.right + 1
    }
    // Set new clicks
    setClicks(newClicks)
  }

  // Fifth Exercise - Handling arrays (https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps)
  // 
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  // Handling arrays
  const [allClicks, setAllClicks] = useState([])
  // Storing the total number of clicks
  const [total, setTotal] = useState(0)
  // Handling Left click
  const handleLeftClick1 = () => {
    setAllClicks(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }
  // Handling right click
  const handleRightClick1 = () => {
    setAllClicks(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(updatedRight + left)
  }

  // Sixth example - A function that returns a function
  //
  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }
  const [value, setValue] = useState(10)
  // This is another syntax to a function that calls a function. 
  const setToValue = (newValue) => () => {
    console.log('value now', newValue) // Print the new value to console
    setValue(newValue)
  }


  return (
    <>
      {/* First Exercise */}
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>

      {/* Second Exercise */}
      <div>
        <h1>Greetings</h1>
        <Hello name="maya" age={26 + 10} />
        <Hello name={name} age={age} />
      </div>

      {/* Third Exercise */}
      {/* If a user clicks the plus button, the button's event handler changes the value of counter to 1, and the App component is re-rendered. This causes its subcomponents Display and Button to also be re-rendered. Display receives the new value of the counter, 1, as props. The Button components receive event handlers which can be used to change the state of the counter. */}
      <div>
        <Display counter={counter} />
        <Button
          onClick={increaseByOne}
          text='plus'
        />
        <Button
          onClick={decreaseByOne}
          text='minus'
        />
        <Button
          onClick={setToZero}
          text='zero'
        />
      </div>

      {/* Fourth Exercise */}
      <div>
        {clicks.left}
        <button onClick={handleLeftClick}>
          left
        </button>
        <button onClick={handleRightClick}>
          right
        </button>
        {clicks.right}
      </div>

      {/* Fifth Exercise */}
      <div>
        {left}
        <Button onClick={handleLeftClick1} text='left' />
        <Button onClick={handleRightClick1} text='right' />
        {right}
        {/* Joining  */}
        <History allClicks={allClicks} />
        <p>Total: {total}</p>
      </div>

      {/* Sixth Exercise */}
      <div>
        <button onClick={hello('world')}>button</button>
        <button onClick={hello('react')}>button</button>
        <button onClick={hello('function')}>button</button>
      </div>

      <div>
        {value}
        <button onClick={setToValue(1000)}>thousand</button>
        <button onClick={setToValue(0)}>reset</button>
        <button onClick={setToValue(value + 1)}>increment</button>
      </div>
    </>
  )
}

export default App