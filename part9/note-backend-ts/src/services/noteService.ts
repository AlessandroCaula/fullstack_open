// Service that will take care of all the manipulation of the data
import noteData from "../../data/noteEntries";
import { NewNote, NoteEntry } from "../types";
import { v4 as uuidv4 } from "uuid";

const notes: NoteEntry[] = noteData;

// Fetching all the data
const getEntries = (): NoteEntry[] => {
  return notes;
};

// Add a new note
const addEntry = (newNoteToAdd: NewNote): NoteEntry => {
  // Generate a new id
  const noteToAdd: NoteEntry = {
    id: uuidv4(),
    content: newNoteToAdd.content,
  };

  // Adding the new note to the backend "db" note collection.
  noteData.push(noteToAdd);
  return noteToAdd;
};

export default { getEntries, addEntry };
