// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

// Creating a PatientEntry type
export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

// Utility type to exclude field 'ssn' from the patients
export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

// Type for the new patient entry
export type NewPatientEntry = Omit<PatientEntry, "id">;

// Gender enumerator
export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}
