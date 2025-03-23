const PersonForm = (props) => {
  const { addContact, newName, handleNameChange, newNumber, handleNumberChange } = props
  return (
    <div>
      <form onSubmit={addContact}>
        <div>
          name:
          <input
            required
            placeholder="New Name"
            value={newName}
            // When the value change call the event handler
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            required
            placeholder="Phone Number"
            value={newNumber}
            // Handle each input letter in the input 
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm