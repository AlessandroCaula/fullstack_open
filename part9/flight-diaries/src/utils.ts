import { NewDiaryEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment");
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date:" + date);
  }
  return date;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  console.log(object); // Now object is no longer unused

  // Faking the return value
  const newEntry: NewDiaryEntry = {
    weather: "cloudy",
    visibility: "great",
    date: "2025-28-08",
    comment: "fake comment",
  };

  return newEntry;
};

export default toNewDiaryEntry;
