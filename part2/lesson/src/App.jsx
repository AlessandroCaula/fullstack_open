import Note from "./components/Note"

const App = (props) => {

  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* Map through the notes elements and render them as li element in the unordered list */}
        <ul>
          {notes.map((note) =>
            <Note key={note.id} note={note}/>
          )}
        </ul>
      </ul>
    </div>
  )
}

export default App
