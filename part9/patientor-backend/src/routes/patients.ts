// Route that will take care of all patients endpoints
import express from "express";
import patientService from "../services/patientService";
import { Response, Request } from "express";
import { NonSensitivePatientEntry, PatientEntry } from "../types";
import { toNewEntries, toNewPatientEntry } from "../utils";
import z from "zod";

const router = express.Router();

// Retrieve all non sensitive data from the patients - no "ssn" and "entries" fields
router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

// Retrieve a specific patient data
router.get("/:id", (req: Request, res: Response<PatientEntry>) => {
  // Get the patient id 
  const id: string = req.params.id;
  // Retrieve the patient with the requested id
  const patient = patientService.findById(id);
  
  // Check if the patient exist or is undefined
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(400);
  }
});

// Adding a new patient to the backend
router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

// Adding entries for a specific patient
router.post("/:id/entries", (req, res) => {
  try {
    // Retrieve the entries from the request body and validate them with the use of zod
    const entries = toNewEntries(req.body);
    // Retrieve the patient for which we want to add the new entries
    const id: string = req.params.id;
    // Add the entries to the patient.
    const addedEntries = patientService.addPatientEntries(id, entries);
    if (!addedEntries) {
      return res.status(404).send({ error: "Patient not found" });
    }
    res.json(addedEntries);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
