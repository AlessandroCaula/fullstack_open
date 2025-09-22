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

// Diagnosis Type
export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

// ----------------------------------
//
// Base Entry type
interface BaseEntry {
  id: string,
  description: string, 
  date: string,
  specialist: string;
  diagnosisCode?: Array<DiagnosisEntry['code']>;
}

// Enum for Health Checking Rate
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// Expanding the BaseEntry interface for the HealthCheckEntry type
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

// // Expanding the BaseEntry interface for the OccupationalHealthcareEntry type
// interface OccupationalHealthcareEntry extends BaseEntry {
//   type: "OccupationalHealthcare";

// }

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;