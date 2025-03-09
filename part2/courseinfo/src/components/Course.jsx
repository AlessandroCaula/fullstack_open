// Header Component
const Header = (props) => {
  const { course } = props;
  return (
    <h2>{course}</h2>
  )
}

// Content Component
const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      {/* Mapping through all the parts of the course */}
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

// Part Component
const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

// Total Component
const Total = (props) => {
  const { parts } = props;

  // Dynamically compute the sum of all the exercises count. Using the .reduce function. 
  const initialValue = 0
  const total = parts.reduce((sum, part) => {
    // console.log('What is happening s: ', sum)
    // console.log('What is happening p: ', part.exercises)
    return sum + part.exercises
  }, initialValue)
  console.log('total', total)

  return (
    <p style={{ fontWeight: 'bold' }}>Number of exercises {total}</p>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course