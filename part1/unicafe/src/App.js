import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const Button = (props) => {
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
  }
  const StatisticLine = ({ text, value }) => {
    return (
      <tr><td>{text}</td><td>{value}</td></tr>
    )
  }
  const Statistics = (props) => {
    const all = good + neutral + bad
    if (all === 0) {
      return <p>No feedback given</p>
    }
    return (
      <table>
        <tbody>
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

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => { setGood(good + 1) }} text="good" />
      <Button onClick={() => { setNeutral(neutral + 1) }} text="neutral" />
      <Button onClick={() => { setBad(bad + 1) }} text="bad" />
      <h1>Statistic</h1>
      {Statistics()}
    </div>
  )
}

export default App