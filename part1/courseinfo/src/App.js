// 1.1 Three components
const Header =
  (props) => {
    return (<div><h1>{props.course}</h1> </div>)
  }

const Part =
  (props) => {
    return (
      <p>
        {/* 1.3 Every part consists of name and exercises */}
        {props.part.name} {props.part.exercises}
      </p>
    )
  }

// 1.2 Content component use part component
const Content = (props) => {
  return (
    <div>
      {/* 1.4 Array type of parts */}
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
  // 1.5 whole course 
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

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App