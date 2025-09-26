// import patientsData from "../../data/patientsData";
// import patientData from "../../data/patientsData";
import patientData from "../../data/patientsFullData";
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Entry, NewEntriesEntry } from "../types";
import { v1 as uuid } from "uuid";

// Service for getting all the patients
const getPatients = (): PatientEntry[] => {
  return patientData;
};

// Service for retrieving the patient given the id
const findById = (id: string): PatientEntry | undefined => {
  const patient = patientData.find(pat => pat.id === id);
  // console.log(patient);
  return patient;
};

// Service for getting all the patients without the ssn entry
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// Service for adding a new patient
const addPatient = (patient: NewPatientEntry): PatientEntry => {
  // Generate the new patient ID
  const patientId = uuid();
  const newPatient = {
    id: patientId,
    ...patient
  };
  // console.log(newPatient);
  patientData.push(newPatient);
  return newPatient;
};

// Service for adding new entries for the patient
const addPatientEntries = (id: string, entries: NewEntriesEntry): Entry | undefined => {
  // First find the patient to which we want to add the entries
  const patient = patientData.find(p => p.id === id);
  // Return if patient does not exist
  if (!patient) {
    return undefined;
  }

  // Create a new entry with a fresh id
  const newEntry: Entry = {
    id: uuid(),
    ... entries
  };

  // If the patient has no entries array yet, initialize it
  if (!patient.entries) {
    patient.entries = [];
  }

  // Push the new entries to the entries collection of the patient
  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  findById,
  getNonSensitiveEntries,
  addPatient,
  addPatientEntries,
};
