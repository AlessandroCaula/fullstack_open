// export interface Entry {
// }

// Base Entry type
interface BaseEntry {
  id: string,
  description: string, 
  date: string,
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry['code']>;
}

// Enum for Health Checking Rate
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// Interface for sick leave
interface SickLeave {
  startDate: string;
  endDate: string;
}

// Interface for Discharge
interface Discharge {
  date: string;
  criteria: string;
}

// Expanding the BaseEntry interface for the HealthCheckEntry type
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

// Expanding the BaseEntry interface for the OccupationalHealthcareEntry type
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

// Expanding the BaseEntry interface for the HospitalEntry type
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// ---- Creating a PatientEntry type
export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Utility type to exclude field 'ssn' from the patients
// export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;
export type NonSensitivePatientEntry = UnionOmit<PatientEntry, "ssn" | "entries">;

// Type for the new patient entry
// export type NewPatientEntry = Omit<PatientEntry, "id">;
export type NewPatientEntry = UnionOmit<PatientEntry, "id">;

// Type for the new entries entry
export type NewEntriesEntry = UnionOmit<Entry, "id">;

// Gender enumerator
export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

// ---- Diagnosis Type
export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}