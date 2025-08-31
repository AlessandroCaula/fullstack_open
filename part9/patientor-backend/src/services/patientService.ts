import patientsData from "../../data/patientsData";
import patientData from "../../data/patientsData";
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

// Service for getting all the patients
const getPatients = (): PatientEntry[] => {
  return patientData;
};

// Service for getting all the patients without the ssn entry
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
  console.log(newPatient);
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
};
