// Service that will take care of all the manipulation of the data
import noteData from "../../data/noteEntries";
import { NoteEntry } from "../types";

const notes: NoteEntry[] = noteData;

// Fetching all the data
const getEntries = (): NoteEntry[] => {
  return notes;
};

export default { getEntries };
