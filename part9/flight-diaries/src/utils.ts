import { NewDiaryEntry, Weather } from "./types";

// Type guards for the strings
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// Type guard for the weather
const isWeather = (str: string): str is Weather => {
  return ["sunny", "rainy", "cloudy", "stormy"].includes(str);
};

// Parse the weather field
const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather: " + weather);
  }
  return weather;
};

// Parse the comment field
const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment");
  }
  return comment;
};

// Type guards for the date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Parse the date field
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
