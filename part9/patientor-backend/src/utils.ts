import z from "zod";
import { Gender, NewPatientEntry } from "./types";

// // Ssn parser
// const parseSsn = (ssn: unknown): string => {
//   if (!ssn || !isString(ssn)) {
//     throw new Error("Incorrect ssn");
//   }
//   return ssn;
// };

// // Ssn parser
// const parseSsn = (ssn: unknown): string => {
//   return z.string().parse(ssn);
// };

// // Occupation parser
// const parseOccupation = (occupation: unknown): string => {
//   if (!occupation || !isString(occupation)) {
//     throw new Error("Incorrect occupation");
//   }
//   return occupation;
// };

// // Occupation parser
// const parseOccupation = (occupation: unknown): string => {
//   return z.string().parse(occupation);
// };

// // Gender Type guard
// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender)
//     .map((v) => v.toString())
//     .includes(param);
// };

// // Gender parser
// const parseGender = (gender: unknown): Gender => {
//   if (!gender || !isString(gender) || !isGender(gender)) {
//     throw new Error("Incorrect gender: " + gender);
//   }
//   return gender;
// };

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string().optional(),
  gender: z.enum(Gender),
  occupation: z.string(),
}); 

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

export default toNewPatientEntry;
