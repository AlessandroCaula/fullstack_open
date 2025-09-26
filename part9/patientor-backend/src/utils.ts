import z from "zod";
import { DiagnosisEntry, NewEntriesEntry, Gender, HealthCheckRating, NewPatientEntry } from "./types";

// Validating the patient dat
const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().optional(),
  gender: z.enum(Gender),
  occupation: z.string(),
  // entries: z.array(z.string()).optional(),
}); 

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

// Validating the diagnoses data
const newDiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

const toNewDiagnosisEntry = (object: unknown): DiagnosisEntry => {
  return newDiagnosisSchema.parse(object);
};

// Parsing the diagnosis codes
const parseDiagnosisCodes = (object: unknown): Array<DiagnosisEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnosisEntry['code']>;
  }
  return object.diagnosisCodes as Array<DiagnosisEntry['code']>;
};

// --- Base schema
//
const baseEntrySchema = z.object({
  // id: z.string().optional(), // optional when creating
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

// --- Subtype schemas
// 
// HealthCheckEntry
const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

// OccupationalHealthcareEntry
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional(),
});

// HospitalEntry
const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  })
});

// --- Union Schema
// Look at the type field. Depending on its value, validate against the matching schema
const entrySchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
]);

const toNewEntries = (object: unknown): NewEntriesEntry => {
  return entrySchema.parse(object);
};

export { 
  parseDiagnosisCodes,
  toNewPatientEntry, 
  toNewDiagnosisEntry,
  toNewEntries, 
};
