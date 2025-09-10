// Create the router taking care of all notes endpoints
import express, { Response } from "express";
import noteService from "../services/noteService";
import { NoteEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NoteEntry[]>) => {
  console.log("Fetching all notes");
  res.send(noteService.getEntries());
});

export default router;
