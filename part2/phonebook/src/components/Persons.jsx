// Person component
const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({ filteredPerson }) => {
  return (
    <div>
      {/* Loop through all the names and render them */}
      {filteredPerson.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  )
}

export default Persons