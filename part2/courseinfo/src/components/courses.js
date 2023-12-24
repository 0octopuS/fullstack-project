const Part =
    (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }

const Total = ({ parts }) => {
  function getSum(total, part) {
    return total + Math.round(part.exercises);
  }
  // 2.3 User reduce to get sum
    return (<p><b>Number of exercises{parts.reduce(getSum, 0)}</b> </p>)
    }

const Header =
    (props) => {
      return (<div><h1>{props.course}</h1> </div>)
    }

const Content = ({parts}) => {
  const result = parts.map((part, i) =>
    <Part part={part} key={i} />
  )
  return (
    <div>
      {result}
      <Total parts={parts} />
    </div>
  )
}


// 2.1 Add a Course component
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

// 2.4 allow for an arbitrary number of courses
const Courses = ({ courses }) => {
  const result = courses.map((course, i) => {
    return <Course key={i} course={course} />
  })
  return result
}

export default Courses