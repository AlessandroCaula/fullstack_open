import { Gender, NewPatientEntry } from "./types";

// String Type guard
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// Name parser
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect name");
  }
  return name;
};

// Date Type guards
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// DateOfBirth parser
const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect date of birth");
  }
  return date;
};

// Ssn parser
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect ssn");
  }
  return ssn;
};

// Occupation parser
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect occupation");
  }
  return occupation;
};

// Gender Type guard
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

// Gender parser
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;
