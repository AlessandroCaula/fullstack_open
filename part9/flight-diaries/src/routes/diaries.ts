/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry } from "../types";
import { Response } from "express";

const router = express.Router();

// Retrieve all the diary entries
router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

// Retrieve a specific diary entry through the id
router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const { date, weather, visibility, comment } = req.body;
  const addedEntry = diaryService.addDiary({
    date, 
    weather,
    visibility,
    comment
  });
  res.json(addedEntry);
});

export default router;
