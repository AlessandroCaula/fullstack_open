// Create the router taking care of all notes endpoints
import express, { Response, Request } from "express";
import noteService from "../services/noteService";
import { NewNote, NoteEntry } from "../types";

const router = express.Router();

// Route to retrieve all the notes
router.get("/", (_req, res: Response<NoteEntry[]>) => {
  console.log("Fetching all notes");
  res.send(noteService.getEntries());
});

// Route to add a new note to the collection
router.post("/", (req: Request<unknown, unknown, NewNote>, res: Response<NoteEntry>) => {
  console.log(`Adding a new note: ${req.body.content}`);

  // Adding the new note entry 
  const addedEntry = noteService.addEntry(req.body);
  res.json(addedEntry);
});

export default router;
