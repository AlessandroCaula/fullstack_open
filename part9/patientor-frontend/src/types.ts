export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// Base Entry type
interface BaseEntry {
  id: string,
  description: string, 
  date: string,
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
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


// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = UnionOmit<Entry, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;