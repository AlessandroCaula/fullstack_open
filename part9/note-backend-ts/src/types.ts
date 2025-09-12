// Interface for the entire Note entry
export interface NoteEntry {
  id: string;
  content: string;
}

// type for the new note. Without the id field
export type NewNote = Omit<NoteEntry, "id">;
