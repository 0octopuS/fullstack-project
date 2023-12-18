const Header =
  (props) => {
    return (<div><h1>{props.course}</h1> </div>)
  }

const Part =
  (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  function getSum(total, part) {
    return total + Math.round(part.exercises);
  }
  return (
    <p>Number of exercises {props.parts.reduce(getSum, 0)}</p>
  )

}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
  // return (
  //   <div>
  //     <h1>{course}</h1>
  //     <p>
  //       {part1} {exercises1}
  //     </p>
  //     <p>{part2} {
  //       exercises2}</p>
  //     <p>
  //       {part3} {exercises3}
  //     </p>
  //     <p>Number of exercises{
  //       exercises1 + exercises2 + exercises3}</p>
  //   </div>)
}

export default App