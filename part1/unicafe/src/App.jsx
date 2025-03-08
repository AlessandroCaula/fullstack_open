import { useState } from "react"

// Button component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

// Statistic line component
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

// Statistic components
const Statistic = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  const average = ((good - bad) / total).toFixed(2)
  const positives = ((good / total) * 100).toFixed(2)

  // Only return the statistics if any feedback is given.
  if (total == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  // Otherwise return the statistics
  return (
    <table>
      <tbody>
        <StatisticLine text='good:' value={good} />
        <StatisticLine text='neutral:' value={neutral} />
        <StatisticLine text='bad:' value={bad} />
        <StatisticLine text='total:' value={total} />
        <StatisticLine text='average:' value={average} />
        <StatisticLine text='positives:' value={positives} />
      </tbody>
    </table >
  )
}

function App() {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    // console.log('good', updatedGood)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    // console.log('neutral', updatedNeutral)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad((prev) => prev + 1)
    // console.log('bad', updatedBad)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />

      <h1>Statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
