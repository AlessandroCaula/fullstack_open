import express, { Request, Response, NextFunction } from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";
import { NewEntrySchema } from "../utils";
import z from "zod";

const router = express.Router();

// Retrieve all the "Non Sensitive" diary entries
router.get("/", (_req, res: Response<DiaryEntry[]>) => {
  res.send(diaryService.getEntries());
});

// Retrieve all the "Non Sensitive" diary entries
router.get("/nonsensitive", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
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

// Middleware function for parsing request body
const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post("/", newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  // const newDiaryEntry = NewEntrySchema.parse(req.body);
  const addedEntry = diaryService.addDiary(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;
