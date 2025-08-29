import { NewDiaryEntry, Visibility, Weather } from "./types";

// Type guards for the strings
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// Type guard for the weather
const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

// Parse the weather field
const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect weather: " + weather);
  }
  return weather;
};

// type guard for the visibility
const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

// Parse the visibility field
const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect visibility: " + visibility);
  }
  return visibility;
};

// Parse the comment field
const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error("Incorrect comment");
  }
  return comment;
};

// Type guards for the date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Parse the date field
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date:" + date);
  }
  return date;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    // Faking the return value
    const newEntry: NewDiaryEntry = {
      comment: parseComment(object.comment),
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewDiaryEntry;
