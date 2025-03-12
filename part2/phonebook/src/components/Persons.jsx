// Person component
const Person = ({ person }) => {
  return (
    <div>
      <span>{person.name} {person.number}</span>
      <button>delete</button>
    </div>
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