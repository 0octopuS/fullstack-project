import { useState } from 'react'
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const getAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length))
  }
  const voteAnecdote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };
  return (
    <div>
      <h1> Anecdote of the day </h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>

      {/* 1.13 Button for voting*/}
      <Button onClick={voteAnecdote} text='vote' />
      {/* 1.12 Button to next ramdom anecdote */}
      <Button onClick={getAnecdote} text='next anecdote' />

      {/* 1.14 Most votes */}
      <h1> Anecdote with most votes </h1>
      <p> {anecdotes[points.indexOf(Math.max(...points))]} </p>
      <p>has {Math.max(...points)} votes</p>
    </div>
  )
}

export default App