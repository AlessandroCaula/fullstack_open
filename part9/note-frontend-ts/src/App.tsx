import axios from "axios";
import React, { useEffect, useState } from "react";

// Let's define a type for the notes
interface Note {
  id: string;
  content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([{ id: "1", content: "testing" }]);

  // Fetching the notes from the backend
  useEffect(() => {
    axios.get<Note[]>("http://localhost:3001/notes").then((response) => {
      console.log(response.data);
      // Converting the id from number to string
      const noteData: Note[] = response.data.map((n) => ({
        ...n,
        id: String(n.id),
      }));

      // Setting the notes
      setNotes(noteData);
    });
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const noteToAdd = {
      content: newNote,
      id: String(notes.length + 1),
    };
    setNotes(notes.concat(noteToAdd));
    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
