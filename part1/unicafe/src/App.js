import { useState } from 'react'

// 1.10 Button and StatisticLine Components
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
const StatisticLine = ({ text, value }) => {
  return (
    // 1.11 Table styles
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}
// 1.8 Statistics Components
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) { // 1.9 no statistics case 
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        {/* 1.7:six statistics */}
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={all / 3} />
        <StatisticLine text="positive" value={(good / all) * 100 + "%"} />
      </tbody>
    </table>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      {/* 1.6: three buttons */}
      <Button onClick={() => { setGood(good + 1) }} text="good" />
      <Button onClick={() => { setNeutral(neutral + 1) }} text="neutral" />
      <Button onClick={() => { setBad(bad + 1) }} text="bad" />
      <h1>Statistic</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App