// Route that will take care of all patients endpoints
import express from "express";
import patientService from "../services/patientService";
import { Response } from "express";
import { NonSensitivePatientEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default router;
