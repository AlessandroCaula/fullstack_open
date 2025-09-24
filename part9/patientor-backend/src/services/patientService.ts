// import patientsData from "../../data/patientsData";
// import patientData from "../../data/patientsData";
import patientData from "../../data/patientsFullData";
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from "../types";
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

export default {
  getPatients,
  findById,
  getNonSensitiveEntries,
  addPatient,
};
