// Creating a PatientEntry type
export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// Utility type to exclude field 'ssn' from the patients
export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;
