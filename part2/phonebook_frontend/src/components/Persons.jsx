// Person component
const Person = ({ person, handleContactDeletion }) => {
  return (
    <div>
      <span>{person.name} {person.number}</span>
      <button onClick={() => handleContactDeletion(person)}>delete</button>
    </div>
  )
}

const Persons = ({ filteredPerson, handleContactDeletion }) => {
  return (
    <div>
      {/* Loop through all the names and render them */}
      {filteredPerson.map((person) => (
        <Person key={person.id} person={person} handleContactDeletion={handleContactDeletion} />
      ))}
    </div>
  )
}

export default Persons