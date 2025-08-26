import patientsData from "../../data/patientsData";
import patientData from "../../data/patientsData";
import { NonSensitivePatientEntry, PatientEntry } from "../types";

const getPatients = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getNonSensitiveEntries,
};
